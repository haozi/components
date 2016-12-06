import test from 'ava'
import Components from '../dist/index.js'

test('log', t => {
  let c = new Components()
  t.is(c.add(1, 2), 3)
})

test('pow', t => {
  let c = new Components()
  t.is(c.pow(2, 10), 1024)
})
