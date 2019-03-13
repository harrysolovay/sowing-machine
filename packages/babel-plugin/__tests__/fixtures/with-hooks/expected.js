import sow from 'sowing-machine';
const {
  c: _c,
  s: _s,
  x: _x
} = sow;
import { useState } from 'react';
export default _c(9, () => {
  const [count, setCount] = useState(0);

  const decrement = () => _s(setCount, [[count - 1]]);

  const increment = () => _s(setCount, [[count + 1]]);

  return _s("div", [[{
    className: 'counter'
  }], [count, _s("button", [[{
    onClick: 'decrement'
  }]], [["subtract"]]), _s("button", [[{
    onClick: 'increment'
  }]], [["increment"]])]]);
});