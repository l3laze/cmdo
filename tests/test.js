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
    it('should parse proper command-line options, and use defaults where no value is given', function parsesCommandlineOptions () {
      const options = cmdo.parse({
        hello: [ 'a', 'Hello', 'string', 'World' ],
        bye: [ 'b', 'Bye', 'string', 'Joker' ],
        crazy: [ 'c', 'Crazy', 'string', 'you' ],
        dude: [ 'd', 'Dude', 'string', 'me' ]
      })

      expect(JSON.stringify(options)).to.equal(JSON.stringify({
        'hello': 'world',
        'bye': 'world',
        'crazy': 'you',
        'dude': 'me'
      }))
    })
  })

  describe('#parse - failure', function parseFailsDescriptor () {
    it('should fail to parse invalid command-line options', function failsForInvalidOptions () {
      expect(function expectParseToFail () {
        cmdo.parse({
          'hello': [ 'e', 'Hi', 'string', 'world' ]
        })
      }).to.throw()
    })
  })

  describe('#man', function makeManDecriptor () {
    it('should make a man page', function makesManPage () {
      const pj = require('./../package.json')
      const man = cmdo.man({
        hello: [ 'a', 'Hello', 'string', 'World' ],
        bye: [ 'b', 'Bye', 'string', 'Joker' ],
        crazy: [ 'c', 'Crazy', 'string', 'me' ]
      }, pj.name, pj.author, pj.description)

      expect(man.indexOf('SYNOPSIS')).to.not.equal(-1)
      expect(man.indexOf('DESCRIPTION')).to.not.equal(-1)
      expect(man.indexOf('OPTIONS')).to.not.equal(-1)
    })
  })

  describe('#help', function makeHelpDecriptor () {
    it('should make a help page', function makesHelpPage () {
      const pj = require('./../package.json')
      const help = cmdo.help({
        hello: [ 'a', 'Hello', 'string', 'World' ],
        bye: [ 'b', 'Bye', 'string', 'Joker' ],
        crazy: [ 'c', 'Crazy', 'string', 'me' ]
      }, pj.name)

      expect(help.indexOf('Usage')).to.not.equal(-1)
      expect(help.indexOf('[options]')).to.not.equal(-1)
      expect(help.indexOf('Flags')).to.not.equal(-1)
    })
  })
})
