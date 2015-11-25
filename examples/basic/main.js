/**
 * @fileoverview Demo main
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {run} from '@cycle/core'
import {makeDOMDriver as makeDomDriver} from '@cycle/dom'
import makeHammerDriver from './../../src/makeHammerDriver'
import Demo from './index'

const main = Demo

const domDriverFunc = makeDomDriver(`.demo-container`)

run(main, {
  dom: makeHammerDriver(domDriverFunc),
})
