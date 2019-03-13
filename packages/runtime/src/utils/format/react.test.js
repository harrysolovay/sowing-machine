import test from 'ava'
import {react as formatReact} from '.'

test('handles empty', t => {
  t.plan(12)
  t.deepEqual([null], formatReact())
  t.deepEqual([null], formatReact(null))
  t.deepEqual([null], formatReact([]))
  t.deepEqual([null], formatReact([null]))
  t.deepEqual([null], formatReact([null, null]))
  t.deepEqual([null], formatReact([[]]))
  t.deepEqual([null], formatReact([[null]]))
  t.deepEqual([null, null], formatReact([[null], [null]]))
  t.deepEqual([null], formatReact([[null], []]))
  t.deepEqual([null], formatReact([[], [null]]))
  t.deepEqual([null], formatReact([null, [null]]))
  t.deepEqual([null], formatReact([[null], null]))
})

test('props', t => {
  const source = [[[{some: 'prop'}]]]
  const expected = [{some: 'prop'}]
  const actual = formatReact(...source)
  t.deepEqual(expected, actual)
})

test('children', t => {
  const source = [[['some', 'children', 'here']]]
  const expected = [null, 'some', 'children', 'here']
  const actual = formatReact(...source)
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
  const actual = formatReact(...source)
  t.deepEqual(expected, actual)
})

test('props and children', t => {
  const source = [[[{some: 'prop'}], ['some', 'children', 'here']]]
  const expected = [{some: 'prop'}, 'some', 'children', 'here']
  const actual = formatReact(...source)
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
  const actual = formatReact(...source)
  t.deepEqual(expected, actual)
})
