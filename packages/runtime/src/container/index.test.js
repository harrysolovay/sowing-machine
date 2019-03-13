import test from 'ava'
import {key, createContainer, isContainer} from '.'

test('container has key', t => {
  const container = createContainer(0, () => {})
  t.true(!!container[key])
})

test('isContainer', t => {
  t.plan(4)
  t.true(isContainer(createContainer(0, () => {})))
  t.false(isContainer(1))
  t.false(isContainer(true))
  t.false(isContainer('three'))
})
