/**
 * @fileoverview Hammer driver factory
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hammerDriver = require('./hammerDriver');

var _hammerDriver2 = _interopRequireDefault(_hammerDriver);

function makeHammerDriver(domDriverFunc) {
  if (typeof domDriverFunc !== 'function') {
    throw new Error('First argument given to makeHammerDriver() ' + 'must be a DOM driver function.');
  }
  return _hammerDriver2['default'].bind({}, domDriverFunc);
}

exports['default'] = makeHammerDriver;
module.exports = exports['default'];