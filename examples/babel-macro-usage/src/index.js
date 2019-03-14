/* eslint-disable */

import './styles.css'

import sow from 'sowing-machine.macro'
import {useState} from 'react'
import logo from './logo.svg'
import {render} from 'react-dom'

const App = sow(() => {
  const [count, setCount] = useState(0)
  const decrement = () => setCount(count - 1)
  const increment = () => setCount(count + 1)

  return div({className: 'App'})(
    header({className: 'App-header'})(
      img({src: logo, className: 'App-logo', alt: 'logo'}),
      p('Edit ', code`src/App.js`, ' and save to reload'),
      a({
        className: 'App-link',
        href: 'https://reactjs.org',
        target: '_blank',
        rel: 'noopener noreferrer',
      })`Learn React`,
    ),

    count,
    button({onClick: decrement})`decrement`,
    button({onClick: increment})`increment`,
  )
})

const app = sow(App())
render(app, document.getElementById('root'))
