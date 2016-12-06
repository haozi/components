import {add} from './util'
import './style/style.less'

export default class {
  add(a, b) {
    return add(a, b)
  }

  pow(a, b) {
    return Math.pow(a, b)
  }
}

document.body.appendChild(document.createTextNode('hello world'))
