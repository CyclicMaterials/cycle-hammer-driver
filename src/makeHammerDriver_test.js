/**
 * @fileoverview Tests for makeHammerDriver
 * @author Frederik Krautwald
 */

/* eslint max-nested-callbacks: 0, max-len: 0, no-unused-expressions: 0 */
/* global describe, it */

import chai from 'chai'
import makeHammerDriver from './makeHammerDriver'

const expect = chai.expect

describe(`makeHammerDriver`, () => {
  it(`should be a function`, () => {
    expect(makeHammerDriver).to.be.a(`function`)
  })
})
