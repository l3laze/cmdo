'use strict'

'use strict'

const cmdo = require('../src/index.js')({
  name: 'cmdo-error-test',
  version: '1.0.0',
  description: 'A simple test script.'
})

let success = false

try {
  const options = cmdo.parse({
    another: [ 'a', 'useless', 'string', 'value' ]
  })

  console.info(options)
} catch (err) {
  console.info('#4: passed')
  success = true
} finally {
  if (success === false) {
    console.info('#4: failed')
  }
}
