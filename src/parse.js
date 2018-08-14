'use strict'

const { basename } = require('path')
const { buildOptions } = require('./buildOptions.js')
const { standardizeOpArgs } = require('./standardizeOpArgs.js')
const debug = require('ebug')('cmdo-parse')

function getCallerFile (position = 2) {
  if (position >= Error.stackTraceLimit) {
    throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`')
  }

  const oldPrepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (err, stack) => {
    debug('Getting line, not a real error' + err.message)
    return stack
  }
  const stack = new Error().stack
  Error.prepareStackTrace = oldPrepareStackTrace

  // stack[0] holds this file
  // stack[1] holds where this function was called
  // stack[2] holds the file we're interested in
  return stack[position] ? stack[position].getFileName() : ''
}

function parse (options) {
  let caller = basename(getCallerFile())
  const args = process.argv.slice(2)
  const shortKeyMap = {}
  const longKeyMap = {}
  const allKeys = []
  let tokens = []
  let parsed

  Object.keys(options).forEach((key) => {
    longKeyMap[ key ] = options[ key ][ 0 ]
    shortKeyMap[options[ key ][ 0 ]] = key
    allKeys.push(key)
    allKeys.push(options[ key ][ 0 ])
  })

  debug('shortKeyMap %s', JSON.stringify(shortKeyMap, null, '\t'))
  debug('longKeyMap %s', JSON.stringify(longKeyMap, null, '\t'))

  debug('argv', process.argv.join(', '))
  debug('Args %s', args.join(', '))

  if (basename(args[ 0 ]) === caller) {
    args.shift()
  }
  debug('Options %s', JSON.stringify(options, null, '\t'))
  debug('Args %s', args.join(', '))

  // [ shortKeys, longKeys, allKeys ] = validateFormat(options)
  // console.info(process.argv.length, process.argv, args, tokens)

  while (args.length > 0) {
    parsed = standardizeOpArgs(args.shift())

    debug('tokens: [ %s ]', parsed.join(', '))

    tokens.push(...parsed)
  }

  debug('Tokens %s', tokens.join(', '))
  debug('allKeys: [ %s ]', allKeys.join(', '))

  tokens = tokens.map((t) => {
    debug('Got token %s; type %s', t, t.constructor.name)

    if (t.startsWith('--')) {
      debug('Found long option %s', t.slice(2))

      t = '--' + shortKeyMap[longKeyMap[ t.slice(2) ]]
      debug('t %s', t)
    } else if (t.charAt(0) === '-') {
      debug('Found short option %s; long name %s', t, shortKeyMap[ t.slice(1) ])

      t = '--' + shortKeyMap[ t.slice(1) ]
      debug('t %s', t)
    }

    /*
    if ((t.startsWith('--') && !allKeys.includes('' + t.slice(2))) ||
        (t.charAt() === '-' && !allKeys.includes('' + t.slice(1)))
    ) {
      throw new Error(`Unknown option ${t}`)
    } else {
      debug('Found option %s', t.slice(2))
      if (t.startsWith('--') && typeof shortKeyMap[ t.slice(2) ] !== 'undefined') {
        tokens[ i ] = shortKeyMap[ t.slice(2) ]
      } else if (t.charAt(0) === '-' && typeof longKeyMap[ t.slice(1) ] !== 'undefined') {
        tokens[ i ] = longKeyMap[ t.slice(1) ]
      }
    }
    */

    return t
  })

  debug('tokens [ %s ]', tokens.join(', '))

  return buildOptions(options, tokens)
}

module.exports = {
  parse
}
