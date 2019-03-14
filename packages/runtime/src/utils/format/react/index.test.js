import test from 'ava'
import react from '.'

test('handles empty', t => {
  t.plan(12)
  t.deepEqual([null], react())
  t.deepEqual([null], react(null))
  t.deepEqual([null], react([]))
  t.deepEqual([null], react([null]))
  t.deepEqual([null], react([null, null]))
  t.deepEqual([null], react([[]]))
  t.deepEqual([null], react([[null]]))
  t.deepEqual([null, null], react([[null], [null]]))
  t.deepEqual([null], react([[null], []]))
  t.deepEqual([null], react([[], [null]]))
  t.deepEqual([null], react([null, [null]]))
  t.deepEqual([null], react([[null], null]))
})

test('props', t => {
  const source = [[[{some: 'prop'}]]]
  const expected = [{some: 'prop'}]
  const actual = react(...source)
  t.deepEqual(expected, actual)
})

test('children', t => {
  const source = [[['some', 'children', 'here']]]
  const expected = [null, 'some', 'children', 'here']
  const actual = react(...source)
  t.deepEqual(expected, actual)
})

test('quasi', t => {
  const doin = 'doin'
  const source = [
    null,
    [
      ['hello ', 'how are you ', '?!'],
      [
        (() => {
          return 'world, '
        })(),
        doin,
      ],
    ],
  ]
  const expected = [null, 'hello world, how are you doin?!']
  const actual = react(...source)
  t.deepEqual(expected, actual)
})

test('props and children', t => {
  const source = [[[{some: 'prop'}], ['some', 'children', 'here']]]
  const expected = [{some: 'prop'}, 'some', 'children', 'here']
  const actual = react(...source)
  t.deepEqual(expected, actual)
})

test('props and quasi', t => {
  const doin = 'doin'
  const source = [
    [[{some: 'prop'}]],
    [
      ['hello ', 'how are you ', '?!'],
      [
        (() => {
          return 'world, '
        })(),
        doin,
      ],
    ],
  ]
  const expected = [{some: 'prop'}, 'hello world, how are you doin?!']
  const actual = react(...source)
  t.deepEqual(expected, actual)
})
