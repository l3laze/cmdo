'use strict'

const debug = require('ebug')('standardizeOpArgs')

function standardizeOpArgs (token) {
  const isEnd = (token === '--')
  const hasOp = (!isEnd && /^(-|--)[a-z]/i.test(token))
  const hasOpArg = (!isEnd && hasOp && /=/i.test(token))

  const done = isEnd || // You should never eat args after --, kid.
  ((!hasOp && !hasOpArg) || // bare argument
    (hasOp && !hasOpArg) // --a || -a
  )

  let parsed = []
  let chunks = []

  debug('token %s\n\tisEnd %s\n\thasOp %s\n\thasOpArg %s\n\tdone %s', token, isEnd, hasOp, hasOpArg, done)

  if (done) {
    parsed = [ token ]
  } else if (hasOp && hasOpArg) {
    chunks = token.split('=')

    debug('chunks[ 0 ] = %s; --? %s; -? %s', chunks[ 0 ], chunks[ 0 ].startsWith('--'), /^-[a-z]/i.test(chunks[ 0 ]))

    if (/^-[a-z]/i.test(chunks[ 0 ])) {
      debug('Splitting grouped options %s', chunks[ 0 ])

      parsed = chunks[ 1 ]
      chunks = chunks[ 0 ]
        .split('')
        .slice(1)
        .map(t => '-' + t)

      chunks.push(parsed)
    }

    debug('Type: %s', parsed.constructor.name)

    parsed = chunks

    debug('Type: %s', parsed.constructor.name)

    debug('Op=Arg %s', parsed.join(', '))
  }

  if (parsed.constructor.name === 'Array' && parsed.length !== '0') {
    debug('Returning: [ %s ]; type %s', parsed.constructor.name === 'Array' ? parsed.join(', ') : parsed, parsed.constructor.name)

    return parsed
  }

  throw new Error(`Invalid or unknown token ${token} (chunks: ${JSON.stringify(parsed, null, 2)} type: ${chunks.constructor.name})`)
}

module.exports = {
  standardizeOpArgs
}
