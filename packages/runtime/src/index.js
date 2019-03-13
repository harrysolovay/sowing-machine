import * as apply from './utils/apply'
import {isContainer, createContainer} from './container'
import {isValidElementType} from 'react-is'

const REACT_ELEMENT_TYPE =
  typeof Symbol === 'function' && Symbol.for
    ? Symbol.for('react.element')
    : 0xeac7

const s = (...args) => {
  const [subject] = args
  const type = typeof subject

  if (type === 'string' || isContainer(subject)) return apply.component(...args)
  if (type === 'function') return apply.fn(...args)
  if (subject.$$typeof === REACT_ELEMENT_TYPE || isValidElementType(subject))
    return apply.element(...args)

  return subject // should never reach this line
}

export default {c: createContainer, s, x: null}
