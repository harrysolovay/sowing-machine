import test from 'ava'
import {asTagArgs, recombine} from '.'

test('as tag args without expressions', t => {
  const source = [['hello world!']]
  const expected = [['hello world!']]
  const actual = asTagArgs(source)
  t.deepEqual(expected, actual)
})

test('as tag args with expressions', t => {
  const doin = 'doin'
  const source = [
    ['hello ', 'how are you ', '?!'],
    [
      (() => {
        return 'world, '
      })(),
      doin,
    ],
  ]
  const expected = [
    ['hello ', 'how are you ', '?!'],
    (() => {
      return 'world, '
    })(),
    doin,
  ]
  const actual = asTagArgs(source)
  t.deepEqual(expected, actual)
})

test('recombined without expressions', t => {
  const source = [['hello world!']]
  const expected = 'hello world!'
  const actual = recombine(source)
  t.is(expected, actual)
})

test('recombined with expressions', t => {
  const doin = 'doin'
  const source = [
    ['hello ', 'how are you ', '?!'],
    [
      (() => {
        return 'world, '
      })(),
      doin,
    ],
  ]
  const expected = 'hello world, how are you doin?!'
  const actual = recombine(source)
  t.is(expected, actual)
})
