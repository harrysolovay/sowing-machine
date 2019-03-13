import sow from 'sowing-machine'

const StyledDiv = sow(({children}) => div(children))`
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: blue;
  }
`

sow(StyledDiv`whaddup`)
