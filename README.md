# Sowing Machine

> 🧵A silky-smooth React UI toolchain & JSX alternative

<hr />

<p>

<!-- LICENSE -->
<a href='https://github.com/rescripts/rescripts/blob/master/LICENSE'>
  <img src='https://img.shields.io/packagist/l/doctrine/orm.svg' />
</a>

<!-- PRs -->
<a href='http://makeapullrequest.com'>
  <img src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square' />
</a>

<a href='https://travis-ci.org/harrysolovay/babel-microtest'>
	<img src='https://travis-ci.org/harrysolovay/babel-microtest.svg?branch=master' />
</a>

</p>

## Minimal example

```js
import sow from 'sowing-machine'
import {useState} from 'react'

// wrap the component with 'sow'
const Counter = sow(() => {
  const [count, setCount] = useState(0)

  const decrement = () => setCount(count - 1)
  const increment = () => setCount(count + 1)

  // express your UI and its embedded logic
  return div({className: wrapper})(
    h1('current count: ', count),
    div({className: 'controls'})(
      button({onClick: decrement})`decrement`,
      button({onClick: increment})`increment`,
    ),
  )
})
```

## Quickstart

```sh
yarn add sowing-machine babel-plugin-sowing-machine eslint-config-sowing-machine
```

`.babelrc`

```diff
{
	"presets": ["react-app"],
	"plugins": [
+		"sowing-machine"
	]
}
```

`.eslintrc`

```diff
{
	"extends": [
		"react-app",
+		"sowing-machine"
	]
}
```

And voila! You're good to go!

## Intro

How do we feel about the coupling of UI logic & markup in React? Well, JSX does the trick... but it was born out of familiarity as a guiding principal (to ease the transition from HTML). This has been helpful to many user; after all, describing UI based off state is a new pattern, and JSX lowered the barrier to entry. But JSX also created some problems: beyond its redundancy, JSX suggests HTML-like behavior under the hood. Prop-passing resembles HTML attributes, instead of what it really is (passing an object to a function). Along with the misleading DX comes an extra parser stage for transpilation (in addition to the transform).

But what it really comes down to is this: **if you could have your pick of conventions, would you ever do the following?**

```js
// defining a function
function add({a, b}) {
  return a + b
}

// calling the function
;<add a={1} b={2} />
```

Probably not. Yet, this is what we do for every single piece of our UI in React.

We could get around using JSX by using `React.createElement` directly. [The bootstrapped create-react-app App component](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/src/App.js)––for example––would look like this:

```js
import {createElement as e} from 'react'

const App = e(
  'div',
  {className: 'App'},
  e(
    'header',
    {className: 'App-header'},
    e('img', {src: logo, className: 'App-logo', alt: 'logo'}),
    e(
      'p',
      null,
      'Edit ',
      e('code', null, 'src/App.js'),
      ' and save to reload.',
    ),
    e(
      'a',
      {
        className: 'App-link',
        href: 'https://reactjs.org',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      'Learn React',
    ),
  ),
)
```

Although this lets us avoid JSX, it isn't very readable. `React.createElement` (`e`) is called 6 times. Depending on your formatter (prettier, for example), this could wrap in really unattractive ways. The current highlighting makes it difficult to distinguish grammar. JSX is––without a doubt––easier to work with.

But not as easy as Sowing Machine––a balance between preexisting options. It improves upon the function-call DX and lets you write less code to express the same UI. It's simple-enough to learn and master in minutes.

Here's the create-react-app example using Sowing Machine:

```js
import sow from 'sowing-machine'

const App = sow(() =>(
  div({class: 'App'})(
    header({class: 'App-header'})(
      img({src: logo, class: 'App-logo', alt: 'logo'}),
      p('Edit ', code`src/App.js`, ' and save to reload'),
      a({
        class: 'App-link',
        href: 'https://reactjs.org',
        target: '_blank',
        rel: 'noopener noreferrer',
      })`Learn React`,
    ),
  ),
))
```

This is a smaller, more readable block of code, which lets you recognize grammar with greater speed than that of JSX.
