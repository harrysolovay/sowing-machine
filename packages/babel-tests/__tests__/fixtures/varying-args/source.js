import sow from 'IMPORT_NAME'

const add3 = a => b => c => a + b + c

const A = sow(() => {})
const B = sow(() => div())
const C = sow(() => div(div()))
const D = sow(() => div`sup`)
const E = sow(() => div({some: 'prop'})`sup`)
const F = sow(() => div({some: 'prop'})(div()))
const G = sow(() => add3(1)(2)(3))

const unmarked = () => createElement('div', null)
const another = 'empty string'

const H = sow(unmarked)
const I = sow(unmarked, another)

const J = sow(
  (() => {
    console.log('yo')
    return null
  })(),
)
