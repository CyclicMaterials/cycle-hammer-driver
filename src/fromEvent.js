/**
 * @fileoverview Observable from Hammer Event
 * @author Frederik Krautwald
 * @copyright 2015 Frederik Krautwald. All rights reserved.
 */

import {Subject} from 'rx'
import Hammer from 'hammerjs'

const hammers = {}

function createListener(
  {element, eventType, handler, k, callback = () => {}}
) {
  if (typeof hammers[k] !== `object`) {
    hammers[k] = new Hammer.Manager(element)
  }
  const hammer = hammers[k]
  callback(hammer, Hammer)
  hammer.on(eventType, handler)
}

function createEventListener(
  {element, eventType, handler, k, callback}
) {
  if (Array.isArray(element)) {
    for (let i = 0, len = element.length; i < len; i++) {
      createEventListener({
        element: element[i],
        eventType,
        handler,
        k,
        callback,
      })
    }
  } else if (element) {
    createListener({element, eventType, handler, k, callback})
  }
}

const elementEvents = {}

function fromEvent({element, eventType, k, callback}) {
  if (typeof elementEvents[k] !== `object`) {
    elementEvents[k] = {}
  }
  const elementEvent = elementEvents[k]
  let event$
  if (elementEvent[eventType]) {
    event$ = elementEvent[eventType]
  } else {
    elementEvent[eventType] = new Subject()
    event$ = elementEvent[eventType]
    createEventListener({
      element,
      eventType,
      handler: (value) => {
        //console.log(`handler`, value.type)
        event$.onNext(value)
      },
      k,
      callback,
    })
  }
  return event$
}

export default fromEvent
