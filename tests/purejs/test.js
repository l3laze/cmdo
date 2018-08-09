'use strict'

const cmdo = require('../../src/index.js')
const debug = require('ebug')('cmdo-test')

const options = cmdo.parse({
  name: [ 'n', 'What\'s my name?', 'string', 'Hi' ],
  version: [ 'v', 'What\'s my version?', 'string', '1.0.0' ],
  aShort: [ 'a', 'Short one', 'boolean', false ],
  longerOne: [ 'l', 'Longer one', 'boolean', false ],
  longestOneEver: [ 'e', 'Longest one', 'boolean', false ],
  longWithArg: [ 'w', 'Long with arg', 'string', 'World' ]
})

debug(JSON.stringify(options, null, '\t'))
