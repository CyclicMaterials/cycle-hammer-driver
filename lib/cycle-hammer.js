/**
 * @fileoverview Hammer driver for Cycle.js
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _makeHammerDriver = require('./makeHammerDriver');

var _makeHammerDriver2 = _interopRequireDefault(_makeHammerDriver);

var CycleHammer = {
  /**
   * A factory for the Hammer driver function. Takes a DOM driver function that
   * adheres to the interface established by the Cycle.js DOM driver.
   * The output (source) of this driver mimics the DOM driver as a collection
   * of Observables queried with: `DOM.select(selector).events(eventType)`.
   * In addition, when listening for hammer.js `eventTypes`, the `events()`
   * function allows you to specify an optional callback:
   * `DOM.select(selector).events(eventType, callback)`.
   * The `callback` takes two arguments:
   *
   * - **manager** `{Object}` The `Hammer.Manager` instance for the element.
   * - **Hammer** `{Object}` The Hammer API.
   *
   * @param {Function} domDriverFunc the DOM driver function.
   * @return {Function} the Hammer driver function. The function expects an
   * Observable of VTree as input, and outputs the source object for this
   * driver, containing functions `select()` and `dispose()` that can be used
   * for debugging and testing.
   * @function makeDOMDriver
   */
  makeHammerDriver: _makeHammerDriver2['default']
};

exports['default'] = CycleHammer;
module.exports = exports['default'];