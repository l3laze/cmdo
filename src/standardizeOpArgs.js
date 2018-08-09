'use strict'

const debug = require ('ebug')('standardizeOpArgs')

function standardizeOpArgs (token) {
  const isEnd = (token === '--')
  const hasOp = (!isEnd && /^(-|--)[a-z]/.test(token))
  const hasOpArg = (!isEnd && hasOp && /.+=.+/.test(token))

  const done = isEnd || // You should never eat args after --, kid.
  ((!hasOp && !hasOpArg) || // bare argument
    (hasOp && !hasOpArg) // --a || -a
  )

  let chunks = []

  debug('isEnd %s\nhasOp %s\nhasOpArg %s\ndone %s', isEnd, hasOp, hasOpArg, done)

  if (done) {
    return [token]
  } else if (hasOp && hasOpArg) {
    chunks = token.split('=')

    if (!chunks[ 0 ].startsWith('--')) {
      chunks = chunks[ 0 ]
        .split('')
        .slice(1)
        .map(t => '-' + t)
        .push(chunks[ 1 ])
    }
    return chunks
  }

  throw new Error(`Unknown token ${token}`)
}

module.exports = {
  standardizeOpArgs
}
