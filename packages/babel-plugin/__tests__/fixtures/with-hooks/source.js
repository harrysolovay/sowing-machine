import sow from 'sowing-machine'
import {useState} from 'react'

export default sow(() => {
  const [count, setCount] = useState(0)

  const decrement = () => setCount(count - 1)
  const increment = () => setCount(count + 1)

  return div({className: 'counter'})(
    count,
    button({onClick: 'decrement'})`subtract`,
    button({onClick: 'increment'})`increment`,
  )
})
