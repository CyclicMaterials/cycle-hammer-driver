/**
 * @fileoverview Demo dataflow component
 * @author Frederik Krautwald
 */

import {div, h3, h4} from '@cycle/dom'
import {Observable} from 'rx'

function Demo(sources) {
  const intent = ({dom}) => {
    const options = (manager, Hammer) => {
      // Tap recognizer with minimal two taps.
      manager.add(new Hammer.Tap({event: `doubletap`, taps: 2}))
      // Single tap recognizer.
      manager.add(new Hammer.Tap({event: `singletap`}))

      // We want to recognize this simultaneous, so a double tap will be
      // detected even while a single tap is being recognized.
      // The tap event will be emitted on every tap.
      manager.get(`doubletap`).recognizeWith(`singletap`)
      // We only want to trigger a tap when we haven’t detected a double tap.
      manager.get(`singletap`).requireFailure(`doubletap`)
    }
    return {
      event$: Observable.merge(
        dom.select(`#MyElement`).events(`singletap`, options),
        dom.select(`#MyElement`).events(`doubletap`)
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
          h3(`RecognizeWith and requireFailure cycle-hammer-driver taps example`),
          h4(`Events: singletap, doubletap`),
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
