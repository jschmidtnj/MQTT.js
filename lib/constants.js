'use strict'

exports.isNode = typeof 'process' !== 'undefined' && process && process.versions && process.versions.node
// eslint-disable-next-line
exports.bundlingInWebPack = typeof __webpack_require__ === 'function'
