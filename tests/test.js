/* eslint-env mocha */
'use strict'

const cmdo = require('../src/index.js')

const chai = require('chai')
const expect = chai.expect

describe('Module cmdo', function moduleDescriptor () {
  this.slow(0)

  describe('#init', function initDescriptor () {
    it('should be initialized by require\'ing it', function initsOnReq () {
      expect(cmdo).to.have.property('parse')
    })
  })

  describe('#parse', function parseDescriptor () {
    it('should parse the command-line options', function parsesCommandlineOptions () {
      
      const options = cmdo.parse({
        hello: [ 'e', 'Hi', 'string', 'world' ]
      })
      expect(JSON.stringify(options)).to.equal(JSON.stringify({
        'hello': 'world'
      }))
      expect(options).to.have.property('hello').and.equal('world')
    })
  })
})
