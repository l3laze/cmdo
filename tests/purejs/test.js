'use strict'

const cmdo = require ('../../src/index.js')
const debug = require ('ebug')('cmdo-test')

const options = cmdo.parse({
	name: [ 'n', 'What\'s my name?', 'string', 'Hi' ]
})

debug(JSON.stringify(options, null, 2))