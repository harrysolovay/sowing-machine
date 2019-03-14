// returns many false positives...
// use as final/fallback condition
import {isValidElementType} from 'react-is'

const REACT_ELEMENT_TYPE =
  typeof Symbol === 'function' && Symbol.for
    ? Symbol.for('react.element')
    : 0xeac7

export const isReactElement = inQuestion =>
  isValidElementType(inQuestion) /* VAGUE! */ ||
  (inQuestion && inQuestion.$$typeof === REACT_ELEMENT_TYPE)
