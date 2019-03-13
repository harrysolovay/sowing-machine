import sow from 'sowing-machine';
const {
  c: _c,
  s: _s,
  x: _x
} = sow;

const StyledDiv = _c(10, ({
  children
}) => _s("div", [[children]]), `
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: blue;
  }
`);

_s(_s(StyledDiv, _x, [["whaddup"]]));