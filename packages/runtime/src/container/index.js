const fallback = typeof Symbol !== 'function' || !Symbol.for
const description = 'sowing-machine.container'
export const key = fallback ? description : Symbol.for(description)

export const createContainer = (id, Component /* , style */) => {
  // style manipulation here
  Component[key] = {id}
  return Component
}

export const isContainer = inQuestion => !!inQuestion[key]
