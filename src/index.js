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

let hello = document.createElement('div')
hello.classList.add('i-hello')
hello.appendChild(document.createTextNode('hello world'))
document.body.appendChild(hello)
