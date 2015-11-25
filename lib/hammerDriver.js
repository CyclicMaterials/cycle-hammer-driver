/**
 * @fileoverview Hammer driver
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _fromEvent = require('./fromEvent');

var _fromEvent2 = _interopRequireDefault(_fromEvent);

var _standardEventTypes = require('./standardEventTypes');

var _standardEventTypes2 = _interopRequireDefault(_standardEventTypes);

function fromHammerEvent(eventType, api, callback) {
  return api.observable.flatMapLatest(function (element) {
    if (!element) {
      return _rx.Observable.empty();
    }
    var k = api.namespace.join('');
    return (0, _fromEvent2['default'])({ element: element, eventType: eventType, k: k, callback: callback });
  }).share();
}

function makeEventsSelector(api, originalEvents) {
  return function events(eventType) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return _standardEventTypes2['default'][eventType] ? originalEvents.apply(undefined, [eventType].concat(rest)) : fromHammerEvent.apply(undefined, [eventType, api].concat(rest));
  };
}

function override(obj, methodName, callback) {
  obj[methodName] = callback(obj[methodName]);
}

function selectCallback(originalSelect) {
  return function select() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var api = originalSelect.apply(this, args);
    override(api, 'select', selectCallback);
    var originalEvents = api.events;
    api.events = makeEventsSelector(api, originalEvents);
    return api;
  };
}

function hammerDriver(domDriverFunc, vTree$) {
  if (typeof domDriverFunc !== 'function') {
    throw new Error('First argument given to hammerDriver() must be a DOM driver function.');
  }
  if (!vTree$ || typeof vTree$.subscribe !== 'function') {
    throw new Error('The Hammer Driver expects a stream of virtual DOM elements as input.');
  }

  var domDriver = domDriverFunc(vTree$);
  override(domDriver, 'select', selectCallback);

  return domDriver;
}

exports['default'] = hammerDriver;
module.exports = exports['default'];