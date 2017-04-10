import test from 'ava'
import path from 'path'
import config from '../.config/index'
console.log(config.output)
const Components = require(path.resolve(__dirname, '../', config.output))

test('log', t => {
  let c = new Components()
  t.is(c.add(1, 2), 3)
})

test('pow', t => {
  let c = new Components()
  t.is(c.pow(2, 10), 1024)
})
