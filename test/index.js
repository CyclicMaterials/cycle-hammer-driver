/**
 * @fileoverview Tests for hammerDriver
 * @author Frederik Krautwald
 */

/* eslint max-nested-callbacks: 0, max-len: 0, no-unused-expressions: 0 */
/* global describe, it */

import chai from 'chai'
import CycleHammer from './../src/cycle-hammer'
import hammerDriver from './../src/hammerDriver'
import mockDomDriver from './mockDomDriver'
import MockObservable from './MockObservable'

const expect = chai.expect
const {makeHammerDriver} = CycleHammer

describe(`makeHammerDriver`, () => {
  it(`should be a function`, () => {
    expect(makeHammerDriver).to.be.a(`function`)
  })

  it(`should throw if first argument is not a function`, () => {
    expect(makeHammerDriver.bind(null, `not a function`)).to.throw(
      /First argument given to makeHammerDriver\(\) must be a DOM driver function/
    )
  })

  it(`should accept a DOM driver as input`, () => {
    expect(makeHammerDriver.bind(null, mockDomDriver)).to.not.throw(Error)
  })

  it.skip(`should throw if DOM driver function doesn’t support interface`, () => {
    let domDriver = () => {}
    expect(makeHammerDriver.bind(null, domDriver)).to.throw(
      /DOM driver function must have select\(\) method/
    )
  })

  it(`should bind the DOM driver function to the hammer driver function`, () => {
    const boundHammerDriverName = hammerDriver.bind(null, mockDomDriver).name
    expect(makeHammerDriver(mockDomDriver).name).to.equal(boundHammerDriverName)
  })
})

describe(`hammerDriver`, () => {
  it(`should be a function`, () => {
    expect(hammerDriver).to.be.a(`function`)
  })

  it(`should throw if first argument is not a function`, () => {
    expect(hammerDriver.bind(null, `not a function`)).to.throw(
      / given to hammerDriver\(\) must be a DOM driver function/
    )
  })

  it(`should throw if second argument is not a subscribable stream of <VTree>`, () => {
    expect(hammerDriver.bind(null, mockDomDriver, {})).to.throw(
      /The Hammer Driver expects a stream of virtual DOM elements as input/
    )
  })

  it(`should return DOM driver’s API`, () => {
    const vTree$ = MockObservable
    const hammerApi = hammerDriver(mockDomDriver, vTree$)
    const domDriverApi = mockDomDriver(vTree$)
    expect(hammerApi).to.have.all.keys(domDriverApi)
  })
})
