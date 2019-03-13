import {types as t} from '@babel/core'

const getCalleeAndStages = ({callee, arguments: args}) =>
  t.isCallExpression(callee)
    ? [...getCalleeAndStages(callee), args]
    : [callee, args]

export const fromCallExpression = expression => {
  const [callee, ...stages] = getCalleeAndStages(expression)
  return [
    callee,
    t.arrayExpression(stages.map(stage => t.arrayExpression(stage))),
  ]
}

export const fromTaggedTemplateExpression = (expression, X) => {
  const {tag, quasi} = expression
  const {quasis, expressions} = quasi

  const [callee, STAGES] = t.isCallExpression(tag)
    ? fromCallExpression(tag)
    : [tag, false]

  const QUASI = t.arrayExpression([
    t.arrayExpression(quasis.map(({value}) => t.stringLiteral(value.raw))),
    ...(expressions.length ? [t.arrayExpression(expressions)] : []),
  ])

  return [callee, STAGES || X, QUASI]
}
