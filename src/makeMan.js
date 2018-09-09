'use strict'

const { format } = require('util')

function makeMan (options, name, author, description) {
  let shortEnd = description.indexOf('.')
  let manText = format(
    '\t\t\t\t\t"Man Page"\n\nNAME\n\t%s - %s\n\nSYNOPSIS\n\t%sDESCRIPTION\n\t%s\n\nOPTIONS\n\t',
    name,
    description !== 'undefined' ? description.substring(0, shortEnd !== -1 ? shortEnd + 1 : description.length) : '',
    format('%s [options]\n\n', name),
    description
  )

  Object.keys(options).forEach((o) => {
    manText += format(
      '%s | %s\t' + (o.length < 12 ? '\t' : '') +
      `${options[ o ][ 2 ]}\t` +
      ' - %s\n\t',
      options[ o ][ 0 ], // short option
      o, // long option
      options[ o ][ 1 ] // description
    )
  })

  manText += format('\n\nAUTHOR\n\t%s\n\n', typeof author !== 'undefined' ? author : 'N/A')

  return manText
}

module.exports = {
  makeMan
}
