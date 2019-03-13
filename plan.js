// prettier-ignore
const App = sow(() =>
  [div, [[{className: 'App'}], [
    ['header', [[{className: 'App-header'}], [
      ['img', [[{
        src: logo,
        className: 'App-logo',
        alt: 'logo',
      }]]],
      ['p', [[
        'Edit ',
        ['code', _x, [['src/App.js']]],
        ' and save to reload',
      ]]],
      ['a', [[{
        className: 'App-link',
        href: 'https://reactjs.org',
        target: '_blank',
        rel: 'noopener noreferrer',
      }]], [['Learn React']]],
    ]]],
    [SomeComponent, [[]]],
  ]]]
)
