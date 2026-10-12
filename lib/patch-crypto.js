// Workers runtime (workerd) caps pbkdf2 at 100k iterations ("NotSupportedError:
// Pbkdf2 failed: iteration counts above 100000 are not supported"); Payload
// hardcodes 600000 for password hashing. Cap pbkdf2 at the runtime limit —
// consistently for hashing AND verification, so hashes always round-trip.
// 100k PBKDF2-SHA256 remains a solid password hash.
const nodeCrypto = require('node:crypto')

const CAP = 100000
const cap = (n) => (typeof n === 'number' && n > CAP ? CAP : n)

const origPbkdf2 = nodeCrypto.pbkdf2
const origPbkdf2Sync = nodeCrypto.pbkdf2Sync

nodeCrypto.pbkdf2 = function (password, salt, iterations, keylen, digest, callback) {
  return origPbkdf2.call(this, password, salt, cap(iterations), keylen, digest, callback)
}
nodeCrypto.pbkdf2Sync = function (password, salt, iterations, keylen, digest) {
  return origSync.call(this, password, salt, cap(iterations), keylen, digest)
}

module.exports = {}
