import test from 'ava'
import * as apply from './apply'

test('applies empty stage', t => {
  const fn = () => 'yo'
  const result = apply.fn(fn, [[]])
  t.is(result, 'yo')
})

test('applies single stage', t => {
  const fn = name => `yo ${name}`
  const result = apply.fn(fn, [['Daniel']])
  t.is(result, 'yo Daniel')
})

test('applies multiple stages', t => {
  const fn = a => b => (c, d) => a + b + c + d
  const result = apply.fn(fn, [[1], [2], [3, 4]])
  t.is(result, 10)
})

test('applies quasi', t => {
  const fn = (quasis, four, five, six) =>
    `quasis: ${quasis.join(', ')}, evaluated: ${four}, ${five}, ${six}`
  const result = apply.fn(fn, null, [
    ['one', 'two', 'three'],
    ['four', 'five', 'six'],
  ])
  t.is(result, 'quasis: one, two, three, evaluated: four, five, six')
})

test('applies empty stage and quasi', t => {
  const fn = () => (quasis, four, five, six) =>
    `quasis: ${quasis.join(', ')}, evaluated: ${four}, ${five}, ${six}`
  const result = apply.fn(
    fn,
    [[]],
    [['one', 'two', 'three'], ['four', 'five', 'six']],
  )
  t.is(result, 'quasis: one, two, three, evaluated: four, five, six')
})

test('applies single stage and quasi', t => {
  const fn = prefix => (quasis, four, five, six) =>
    `${prefix}quasis: ${quasis.join(', ')}, evaluated: ${four}, ${five}, ${six}`
  const result = apply.fn(
    fn,
    [['some numbers: ']],
    [['one', 'two', 'three'], ['four', 'five', 'six']],
  )
  t.is(
    result,
    'some numbers: quasis: one, two, three, evaluated: four, five, six',
  )
})

test('applies multiple stages and quasi', t => {
  const fn = prefix => postfix => (quasis, four, five, six) =>
    `${prefix}quasis: ${quasis.join(
      ', ',
    )}, evaluated: ${four}, ${five}, ${six}${postfix}`
  const result = apply.fn(
    fn,
    [['some numbers: '], ['––worked!']],
    [['one', 'two', 'three'], ['four', 'five', 'six']],
  )
  t.is(
    result,
    'some numbers: quasis: one, two, three, evaluated: four, five, six––worked!',
  )
})
