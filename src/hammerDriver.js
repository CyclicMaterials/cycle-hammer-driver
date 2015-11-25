/**
 * @fileoverview Hammer driver
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable} from 'rx'
import fromEvent from './fromEvent'
import eventTypes from './standardEventTypes'

function fromHammerEvent(eventType, api, callback) {
  return api.observable.flatMapLatest(
    element => {
      if (!element) {
        return Observable.empty()
      }
      const k = api.namespace.join(``)
      return fromEvent({element, eventType, k, callback})
    }
  ).share()
}

function makeEventsSelector(api, originalEvents) {
  return function events(eventType, ...rest) {
    return eventTypes[eventType] ?
      originalEvents(eventType, ...rest) :
      fromHammerEvent(eventType, api, ...rest)
  }
}

function override(obj, methodName, callback) {
  obj[methodName] = callback(obj[methodName])
}

function selectCallback(originalSelect) {
  return function select(...args) {
    const api = originalSelect.apply(this, args)
    override(api, `select`, selectCallback)
    const originalEvents = api.events
    api.events = makeEventsSelector(api, originalEvents)
    return api
  }
}

function hammerDriver(domDriverFunc, vTree$) {
  if (typeof domDriverFunc !== `function`) {
    throw new Error(
      `First argument given to hammerDriver() must be a DOM driver function.`
    )
  }
  if (!vTree$ || typeof vTree$.subscribe !== `function`) {
    throw new Error(
      `The Hammer Driver expects a stream of virtual DOM elements as input.`
    )
  }

  const domDriver = domDriverFunc(vTree$)
  override(domDriver, `select`, selectCallback)

  return domDriver
}

export default hammerDriver
