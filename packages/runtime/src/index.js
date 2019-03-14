import * as apply from './utils/apply'
import {isReactElement} from './utils/types'
import {isContainer, createContainer} from './container'

const s = (...args) => {
  const [subject] = args
  const type = typeof subject
  if (type === 'string' || isContainer(subject)) return apply.component(...args)
  if (type === 'function') return apply.fn(...args)
  if (isReactElement(subject)) return apply.element(...args)
  return subject // should never reach this line
}

export default {c: createContainer, s, x: null}
