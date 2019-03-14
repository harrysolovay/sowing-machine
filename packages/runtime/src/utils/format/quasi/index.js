export const asTagArgs = ([quasis, expressions = []]) => [
  quasis,
  ...expressions,
]

export const recombine = ([quasis, expressions = []]) =>
  expressions.length
    ? Object.entries(quasis).reduce(
        (accumulator, [i, quasi]) =>
          accumulator.concat(
            expressions[i] ? quasi.concat(String(expressions[i])) : quasi,
          ),
        '',
      )
    : quasis[0]
