/**
 * @fileoverview Demo dataflow component
 * @author Frederik Krautwald
 */

import {div, h3, h4} from '@cycle/dom'
import {Observable} from 'rx'

function Demo(sources) {
  const intent = ({dom}) => {
    const options = (manager, Hammer) => {
      // Let the pan gesture support all directions.
      // This will block the vertical scrolling on a touch-device
      // while on the element.
      manager.get(`pan`).set({direction: Hammer.DIRECTION_ALL})
    }
    return {
      events$: Observable
        .merge(
          dom.select(`#MyElement`).events(`panleft`, options),
          dom.select(`#MyElement`).events(`panright`),
          dom.select(`#MyElement`).events(`panup`),
          dom.select(`#MyElement`).events(`pandown`),
          dom.select(`#MyElement`).events(`tap`),
          dom.select(`#MyElement`).events(`press`)
        ),
    }
  }

  const model = (actions) => {
    return actions.events$.map(
      event => ({event})
    ).startWith({event: {type: ``}})
  }

  const view = (state$) => state$.map(
    state => {
      const {type} = state.event
      return div([
        h3(`Vertical Pan cycle-hammer-driver example`),
        h4(`Events: panleft panright panup pandown tap press`),
        div(`#MyElement`, `${type} gesture detected`),
      ])
    }
  )

  const actions = intent(sources)
  const state$ = model(actions)

  return {
    dom: view(state$),
  }
}

export default Demo
