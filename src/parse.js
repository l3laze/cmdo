'use strict'

const { basename } = require('path')
const { buildOptions } = require('./buildOptions.js')
const { standardizeOpArgs } = require('./standardizeOpArgs.js')
// const debug = require('ebug')('cmdo-parse')

function parse (options) {
  let foundSelf = false
  let count = 0

  process.argv.forEach((arg) => {
    if (!foundSelf && !arg.indexOf(basename(__filename))) {
      count++
      console.info(`Skipping ${arg}`)
    } else {
      foundSelf = true
    }
  })
  const args = process.argv.slice(count)
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

  // [ shortKeys, longKeys, allKeys ] = validateFormat(options)
  // console.info(process.argv.length, process.argv, args, tokens)

  while (args.length > 0) {
    tokens.concat(standardizeOpArgs(args.shift()))
  }

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
