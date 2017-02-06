import './style/style.less'
import {add} from './util'
import nodeModule from 'safe-trim'

console.log(nodeModule)
export default class Components {
  add (a, b) {
    return add(a, b)
  }

  pow (a, b) {
    return Math.pow(a, b)
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.warn('debug')
}

let hello = document.createElement('div')
hello.classList.add('i-hello')
hello.appendChild(document.createTextNode('hello world'))
document.body.appendChild(hello)
