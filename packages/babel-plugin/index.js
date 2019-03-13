// enable ESModules in required files
require = require('esm')(module)
// re-export default
exports.default = require('./plugin').default
// mark this as an ESModule
Object.defineProperty(exports, '__esModule', {value: true})
