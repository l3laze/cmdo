'use strict'

const { parse } = require('./parse.js')
const { makeMan } = require('./makeMan.js')
const { makeHelp } = require('./makeHelp.js')

module.exports = {
  parse,
  man: makeMan,
  help: makeHelp
}
