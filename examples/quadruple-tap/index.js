/**
 * @fileoverview Demo dataflow component
 * @author Frederik Krautwald
 */

import {div, h3, h4} from '@cycle/dom'
import {Observable} from 'rx'

function Demo(sources) {
  const intent = ({dom}) => {
    const options = (manager, Hammer) => {
      // Default tap recognizer.
      manager.add(new Hammer.Tap())

      // Tap recognizer with four minimal taps.
      manager.add(new Hammer.Tap({event: `quadrupletap`, taps: 4}))

      // We want to recognize this simultaneous, so a quadruple tap will be
      // detected even while a tap is being recognized.
      // The tap event will be emitted on every tap.
      manager.get(`quadrupletap`).recognizeWith(`tap`)
    }
    return {
      event$: Observable.merge(
        dom.select(`#MyElement`).events(`tap`, options),
        dom.select(`#MyElement`).events(`quadrupletap`)
      ),
    }
  }

  const model = (actions) => {
    return actions.event$.map(
      event => ({event})
    ).startWith({event: {type: ``}})
  }

  const view = (state$) => {
    let types = ``
    return state$.map(
      state => {
        const {event} = state
        types += `${event.type} `
        return div([
          h3(`Quadruple Tap cycle-hammer-driver example`),
          h4(`Events: tap, quadrupletap`),
          div(`#MyElement`, `${types}`),
        ])
      }
    )
  }

  const actions = intent(sources)
  const state$ = model(actions)

  return {
    dom: view(state$),
  }
}

export default Demo
