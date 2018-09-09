'use strict'

const { format } = require('util')

function makeHelp (options, name) {
  let helpText = format('  Usage %s [options]\n\n\tFlags\n\tName\t\t  Type\t\t\tDescription\n', name)

  Object.keys(options).forEach((item) => {
    helpText += format(
      '%s | %s\t' +
      (item.length < 12 ? '\t' : '') +
      '[%s]' +
      (options[ item ][ 2 ].length < 5 ? '\t' : '') +
      '\t%s (default is %s)\n',
      options[ item ][ 0 ], // short
      item, // long
      options[ item ][ 2 ], // type
      options[ item ][ 1 ], // description
      options[ item ].length > 2 ? options[ item ][ 3 ] : '' // default value, if any
    )
  })

  return helpText
}

module.exports = {
  makeHelp
}
