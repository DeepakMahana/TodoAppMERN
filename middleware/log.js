require('colors')
const pjson = require('../package.json')

module.exports = function(message, critical = false, debug = false) {
  if (process.env.NODE_ENV === 'unittest') {
    return
  }
  const prefix = critical ? '[ERROR]' : debug ? '[DEBUG]' : '[INFO]'
  if (critical) return console.error(`[${pjson.name}@${pjson.version}]`, `${prefix}`, message)
  else if (process.env.LOGS_ERR === 'true') return
  else if (process.env.LOGS_INFO === 'true') {
    if (!debug)
      return console.log(`[${pjson.name}@${pjson.version}]`, `${prefix}`, message)
  } else if (process.env.LOGS_DEBUG === 'true' && debug)
    return console.debug(`[${pjson.name}@${pjson.version}]`, `${prefix}`, message)
}
