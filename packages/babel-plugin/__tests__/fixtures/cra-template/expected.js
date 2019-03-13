import sow from 'sowing-machine';
const {
  c: _c,
  s: _s,
  x: _x
} = sow;
import logo from './logo';

const App = _c(0, () => _s("div", [[{
  className: 'App'
}], [_s("header", [[{
  className: 'App-header'
}], [_s("img", [[{
  src: logo,
  className: 'App-logo',
  alt: 'logo'
}]]), _s("p", [['Edit ', _s("code", _x, [["src/App.js"]]), ' and save to reload']]), _s("a", [[{
  className: 'App-link',
  href: 'https://reactjs.org',
  target: '_blank',
  rel: 'noopener noreferrer'
}]], [["Learn React"]])]])]]));

export default App;