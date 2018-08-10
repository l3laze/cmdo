'use strict'

const debug = require('ebug')('cmdo-buildOptions')

function buildOptions (options, tokens) {
  const parsed = {}
  let op
  let val

  debug('Building from tokens [ %s ]', tokens.join(', '))

  while (tokens.length > 0) {
    op = tokens.shift()

    debug('Building %s', op)

    if (!tokens[ 0 ].startsWith('--') && tokens[ 0 ].charAt(0) !== '-') {
      val = tokens.shift()

      debug('Got val %s', val)
    } else {
      val = options[ op.slice(2) ][ 3 ]
    }

    parsed[ op.slice(2) ] = val
  }

  return parsed
}

module.exports = {
  buildOptions
}
