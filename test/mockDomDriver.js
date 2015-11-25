/**
 * @fileoverview DOM driver mock
 * @author Frederik Krautwald
 */

function makeEvents() {
  return () => {
    return {}
  }
}

function makeSelect() {
  return () => {
    return {
      select: makeSelect(),
      events: makeEvents(),
    }
  }
}

function mockDomDriver() {
  return {
    select: makeSelect(),
  }
}

export default mockDomDriver
