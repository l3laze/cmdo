'use strict'

const cmdo = require('../src/index.js')({
  name: 'cmdo-test',
  version: '1.0.0',
  description: 'A simple test script.'
})

const options = cmdo.parse({
  longString: [ 's', 'Description of string option', 'string', 'default' ],
  longNumber: [ 'n', 'Description of number option', 'number', 0 ],
  longBoolean: [ 'b', 'Description of boolean option', 'boolean', false ]
})

if (options.longString === 'Hello World!') {
  console.info('#1: passed')
} else {
  console.info('#1: failed')
}

if (options.longNumber === 8675309) {
  console.info('#2: passed')
} else {
  console.info('#2: failed')
}

if (options.longBoolean === true) {
  console.info('#3: passed')
} else {
  console.info('#3: failed')
}
