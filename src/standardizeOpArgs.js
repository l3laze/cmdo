'use strict'

function standardizeOpArgs (token) {
  const isEnd = (token === '--')
  const hasOp = (!isEnd && /^(-|--)[a-z]/.test(token))
  const hasOpArg = (!isEnd && hasOp && /.+=.+/.test(token))

  const done = isEnd || // You should never eat args after --, kid.
  ((!hasOp && !hasOpArg) || // bare argument
    (hasOp && !hasOpArg && token.startsWith('--')) // --a
  )

  let chunks = []

  // console.info(token)

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
