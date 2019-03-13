import sow from 'sowing-machine';
const {
  c: _c,
  s: _s,
  x: _x
} = sow;

const add3 = a => b => c => a + b + c;

const A = _c(1, () => {});

const B = _c(2, () => _s("div", [[]]));

const C = _c(3, () => _s("div", [[_s("div", [[]])]]));

const D = _c(4, () => _s("div", _x, [["sup"]]));

const E = _c(5, () => _s("div", [[{
  some: 'prop'
}]], [["sup"]]));

const F = _c(6, () => _s("div", [[{
  some: 'prop'
}], [_s("div", [[]])]]));

const G = _c(7, () => _s(add3, [[1], [2], [3]]));

const unmarked = () => createElement('div', null);

const another = 'empty string';

const H = _c(8, unmarked);

const I = _s(unmarked, another);

const J = _s(_s(() => {
  _s(console.log, [['yo']]);

  return null;
}, [[]]));