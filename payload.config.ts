import './lib/patch-crypto.js'
import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { buildConfig } from 'payload'
import { r2Storage } from '@payloadcms/storage-r2'
import { getCloudflareContext } from '@opennextjs/cloudflare'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Gallery } from './collections/Gallery.ts'
import { Hero } from './collections/Hero.ts'

// Next's edge-runtime primitives reference MessagePort, which the Workers
// runtime doesn't always expose as a global (Node dev does — hence dev-only
// symptoms). A minimal stub keeps module evaluation from exploding; it only
// applies when the real global is absent.
if (typeof (globalThis as Record<string, unknown>).MessagePort === 'undefined') {
  ;(globalThis as Record<string, unknown>).MessagePort = class MessagePort {}
}

const isProduction = process.env.NODE_ENV === 'production' || process.env.PAYLOAD_REMOTE === '1'

// Workers-safe logger (template-exact): Payload's default pino logger needs
// worker_threads/MessagePort, which the Workers runtime lacks (ReferenceError:
// MessagePort is not defined). Route logs through console as JSON instead.
const createLog =
  (level: string, fn: typeof console.log) =>
  (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...(objOrMsg as object), msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
  // biome-ignore lint: PayloadLogger type not exported
} as any

// True when running under the payload CLI (migrate, generate:importmap, ...)
const isCLI = process.argv.some((v) => {
  try {
    return fs.realpathSync(v).endsWith(path.join('payload', 'bin.js'))
  } catch {
    return false
  }
})

// Bindings: inside the Worker via getCloudflareContext; outside (payload CLI,
// local dev) via wrangler's platform proxy — same pattern as the official
// with-cloudflare-d1 template.
async function getCloudflareContextFromWrangler() {
  const { getPlatformProxy } = await import(/* webpackIgnore: true */ '__wrangler'.replaceAll('_', ''))
  return getPlatformProxy({ environment: process.env.CLOUDFLARE_ENV, remoteBindings: true })
}

// NOTE: an async IIFE, NOT top-level await — the payload CLI compiles this
// file to CommonJS, where top-level await is illegal. The config export is
// expected to be Promise<SanitizedConfig>, so this shape is native to Payload.
export default (async () => {
  // PROVEN ROUTING (2026-10-13, restored after a try/catch variant silently
  // mis-routed to the mock): the payload CLI and scripts always use the
  // wrangler platform proxy (remoteBindings = isProduction); inside the
  // Worker, getCloudflareContext provides the real bindings.
  // Tell for which DB you're on: a remote run prints "Establishing remote
  // connection..." — if that line is absent, you're on the local mock.
  // ONE SHARED DATABASE (restored convention, 2026-10-13): the binding is
  // `remote: true` and the CLI proxy always requests remote bindings — dev,
  // scripts, migrate, and production all speak to the real D1/R2. The tell:
  // a remote run prints "Establishing remote connection...".
  const cloudflare =
    isCLI || !isProduction
      ? await getCloudflareContextFromWrangler()
      : await getCloudflareContext({ async: true })

  return buildConfig({
    admin: {
      user: Users.slug,
      importMap: {
        baseDir: path.resolve(/* turbopackIgnore: true */ process.cwd()),
      },
    },
    collections: [Users, Media, Gallery, Hero],
    // Workers does not populate process.env unless the compat flag is on —
    // read the secret from the bindings env too (works in-worker + CLI).
    secret:
      process.env.PAYLOAD_SECRET ||
      ((cloudflare.env as Record<string, unknown>).PAYLOAD_SECRET as string) ||
      '',
    typescript: {
      outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
    },
    logger: isProduction ? cloudflareLogger : undefined,
    db: sqliteD1Adapter({
    binding: cloudflare.env.ggagency_db,
    // Migrations are the single source of truth: dev mode must NOT auto-push
    // schema changes to the shared (remote:true) D1.
    push: false,
  }),
    // Registered via plugins (NOT the unreleased `storage` key the template
    // uses — payload issue #17195; 3.90.2 has no `storage` key).
    plugins: [
      r2Storage({
        bucket: cloudflare.env.ggagency_images,
        collections: { media: { prefix: 'cms' } },
      }),
    ],
  })
})()
