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

  describe('#parse - success', function parseDescriptor () {
    it('should parse proper command-line options', function parsesCommandlineOptions () {
      const options = cmdo.parse({
        hello: [ 'a', 'Hello', 'string', 'World' ],
        bye: [ 'b', 'Bye', 'string', 'Joker' ],
        crazy: [ 'c', 'Crazy', 'string', 'me' ]
      })
      expect(JSON.stringify(options)).to.equal(JSON.stringify({
        'hello': 'world',
        'bye': 'world',
        'crazy': 'me'
      }))
      expect(options).to.have.property('hello').and.equal('world')
    })
  })

  describe('#parse - failure', function parseFailsDescriptor () {
    it('should fail to parse invalid command-line options', function failsForInvalidOptions () {
      expect(function expectParseToFail () {
        try {
          cmdo.parse({
            'hello': [ 'e', 'Hi', 'string', 'world' ]
          })
        } catch (err) {
          console.error(err)
          throw err
        }
      }).to.throw()

      // expect(options).to.have.property('undefined').and.equal('world')
    })
  })
})
