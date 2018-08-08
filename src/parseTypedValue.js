'use strict'

function parseTypedValue (val, type) {
  let result

  if (/number|integer/.test(type)) {
    result = parseInt(val)

    if (isNaN(result)) {
      throw new Error(`Invalid number value ${result}.`)
    } else {
      return result
    }
  } else {
    return val
  }
}

module.exports = {
  parseTypedValue
}
