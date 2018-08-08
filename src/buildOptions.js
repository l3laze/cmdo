'use strict'

function buildOptions (options, tokens) {
  const parsed = {}
  let op
  let val

  // console.info(tokens)

  while (tokens.length > 0) {
    op = tokens.shift()

    if (!tokens[ 0 ].startsWith('--') && tokens[ 0 ].charAt(0) !== '-') {
      val = tokens.shift()
    }

    parsed[ op ] = val
  }

  return parsed
}

module.exports = {
  buildOptions
}
