import sow from 'IMPORT_NAME'
import logo from './logo'

const App = sow(() =>
  div({className: 'App'})(
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
  ),
)

export default App
