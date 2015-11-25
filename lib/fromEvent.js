/**
 * @fileoverview Observable from Hammer Event
 * @author Frederik Krautwald
 * @copyright 2015 Frederik Krautwald. All rights reserved.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var hammers = {};

function createListener(_ref) {
  var element = _ref.element;
  var eventType = _ref.eventType;
  var handler = _ref.handler;
  var k = _ref.k;
  var _ref$callback = _ref.callback;
  var callback = _ref$callback === undefined ? function () {} : _ref$callback;

  if (typeof hammers[k] !== 'object') {
    hammers[k] = new _hammerjs2['default'].Manager(element);
  }
  var hammer = hammers[k];
  callback(hammer, _hammerjs2['default']);
  hammer.on(eventType, handler);
}

function createEventListener(_ref2) {
  var element = _ref2.element;
  var eventType = _ref2.eventType;
  var handler = _ref2.handler;
  var k = _ref2.k;
  var callback = _ref2.callback;

  if (Array.isArray(element)) {
    for (var i = 0, len = element.length; i < len; i++) {
      createEventListener({
        element: element[i],
        eventType: eventType,
        handler: handler,
        k: k,
        callback: callback
      });
    }
  } else if (element) {
    createListener({ element: element, eventType: eventType, handler: handler, k: k, callback: callback });
  }
}

var elementEvents = {};

function fromEvent(_ref3) {
  var element = _ref3.element;
  var eventType = _ref3.eventType;
  var k = _ref3.k;
  var callback = _ref3.callback;

  if (typeof elementEvents[k] !== 'object') {
    elementEvents[k] = {};
  }
  var elementEvent = elementEvents[k];
  var event$ = undefined;
  if (elementEvent[eventType]) {
    event$ = elementEvent[eventType];
  } else {
    elementEvent[eventType] = new _rx.Subject();
    event$ = elementEvent[eventType];
    createEventListener({
      element: element,
      eventType: eventType,
      handler: function handler(value) {
        //console.log(`handler`, value.type)
        event$.onNext(value);
      },
      k: k,
      callback: callback
    });
  }
  return event$;
}

exports['default'] = fromEvent;
module.exports = exports['default'];