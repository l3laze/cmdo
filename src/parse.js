'use strict'

const { basename } = require('path')
const { buildOptions } = require('./buildOptions.js')
const { standardizeOpArgs } = require('./standardizeOpArgs.js')
const debug = require('ebug')('cmdo-parse')

function getCallerFile(position = 2) {
 
  if (position >= Error.stackTraceLimit) {
    throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
  }
 
  const oldPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (err, stack)  => stack;
  const stack = new Error().stack;
  Error.prepareStackTrace = oldPrepareStackTrace;
 
 
  // stack[0] holds this file
  // stack[1] holds where this function was called
  // stack[2] holds the file we're interested in
  return stack[position] ? stack[position].getFileName() : undefined;
}

function parse (options) {
  let foundSelf = false
  let count = 0
  let caller = basename(getCallerFile())
  const args = process.argv.slice(2)
  const tokens = []
  const shortKeyMap = {}
  const longKeyMap = {}
  const allKeys = []

  Object.keys(options).forEach((key) => {
    longKeyMap[ key ] = options[ key ][ 0 ]
    shortKeyMap[options[ key ][ 0 ]] = key
    allKeys.push(key)
    allKeys.push(options[ key ][ 0 ])
  })

  debug('Args %s', args.join(', '))

  if (basename(args[ 0 ]) === caller) {
    args.shift()
  }

  debug ('argv', process.argv.join(', '))
  debug('Options %s', JSON.stringify(options, null, 2))
  debug('Args %s', args.join(', '))

  // [ shortKeys, longKeys, allKeys ] = validateFormat(options)
  // console.info(process.argv.length, process.argv, args, tokens)

  while (args.length > 0) {
    tokens.concat(standardizeOpArgs(args.shift()))
  }
  
  debug('Tokens %s', tokens.join(', '))

  tokens.forEach((t, i) => {
    if ((t.charAt(0) === '-' || t.startsWith('--')) && !allKeys.includes(t)) {
      throw new Error(`Unknown option ${t}`)
    } else {
      if (t.startsWith('--') && typeof shortKeyMap[ t ] !== 'undefined') {
        tokens[ i ] = shortKeyMap[ t ]
      } else if (t.charAt(0) === '-' && typeof longKeyMap[ t ] !== 'undefined') {
        tokens[ i ] = longKeyMap[ t ]
      }
    }
  })

  return buildOptions(options, tokens)
}

module.exports = {
  parse
}
