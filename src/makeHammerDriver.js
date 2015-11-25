/**
 * @fileoverview Hammer driver factory
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import hammerDriver from './hammerDriver'

function makeHammerDriver(domDriverFunc) {
  if (typeof domDriverFunc !== `function`) {
    throw new Error(
      `First argument given to makeHammerDriver() ` +
      `must be a DOM driver function.`
    )
  }
  return hammerDriver.bind({}, domDriverFunc)
}

export default makeHammerDriver
