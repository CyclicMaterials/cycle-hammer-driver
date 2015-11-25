/**
 * @fileoverview Demo dataflow component
 * @author Frederik Krautwald
 */

import {div, h3, h4} from '@cycle/dom'
import {Observable} from 'rx'

function Demo(sources) {
  const intent = ({dom}) => {
    const options = (manager, Hammer) => {
      // create a pinch and rotate recognizer
      // these require two pointers
      const pinch = new Hammer.Pinch()
      const rotate = new Hammer.Rotate()

      // we want to detect both at the same time
      pinch.recognizeWith(rotate)

      // add to the Manager
      manager.add([pinch, rotate])
    }
    return {
      event$: Observable.merge(
        dom.select(`#MyElement`).events(`pinch`, options),
        dom.select(`#MyElement`).events(`rotate`)
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
          h3(`RecognizeWith cycle-hammer-driver example`),
          h4(`Events: pinch, rotate`),
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
