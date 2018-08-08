/* eslint-env mocha */
'use strict'

const cmdo = require('../src/index.js')

const chai = require('chai')
const expect = chai.expect

describe('Module cmdo', function moduleDescriptor () {
  this.slow(0)

  describe('#init', function parse () {
    it('should be initialized by require\'ing it', function initsOnReq () {
      expect(cmdo).to.have.property('parse')
    })
  })

  describe('#parse', function parseDescriptor () {
    it('should parse the command-line options', function parsesCommandlineOptions () {
      expect(cmdo.parse({
        hello: [ 'e', 'Hi', 'string', 'world' ]
      })).to.equal({
        hello: 'world'
      })
    })
  })
})
