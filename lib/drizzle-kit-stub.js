// Stub for drizzle-kit (a CLI/build tool, never called at runtime in the Worker).
// Turbopack aliases `drizzle-kit` imports here so the real package and its
// native guts (esbuild.exe, libsql binaries) never enter the bundle.
// The payload CLI (migrate:create) runs outside the bundle and is unaffected.
module.exports = new Proxy(function () {}, {
  get: () => () => {
    throw new Error("drizzle-kit is CLI-only: run this via the payload CLI, not the site runtime.")
  },
})
