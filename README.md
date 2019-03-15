<h1 align='center'>Sowing Machine</h1>

<p align='center'>

<!-- LICENSE -->
<a href='https://opensource.org/licenses/MIT'>
  <img src='https://img.shields.io/packagist/l/doctrine/orm.svg' />
</a>

<!-- PRs -->
<a href='http://makeapullrequest.com'>
  <img src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square' />
</a>

<a href='https://travis-ci.org/harrysolovay/sowing-machine'>
	<img src='https://travis-ci.org/harrysolovay/sowing-machine.svg?branch=master' />
</a>

</p>

## Guide

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Minimal example](#minimal-example)
- [Packages](#packages)
- [Background](#background)
- [Installation & Setup](#installation--setup)
- [Describing UI](#describing-ui)
- [createElement vs. cloneElement](#createelement-vs-cloneelement)
- [Life Cycle](#life-cycle)
- [Roadmap](#roadmap)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
  return div({className: 'wrapper'})(
    h1('current count: ', count),
    div({className: 'controls'})(
      button({onClick: decrement})`decrement`,
      button({onClick: increment})`increment`,
    ),
  )
})

// use the component
const counterInstance = sow(Counter())
```

## Packages

- [babel-plugin-sowing-machine](https://github.com/harrysolovay/sowing-machine/tree/master/packages/babel-plugin): compiles sowing machine code into a valid format that can be understood at runtime
- [sowing-machine](https://github.com/harrysolovay/sowing-machine/tree/master/packages/runtime): the runtime library which interprets compiled `sow` calls
- [eslint-config-sowing-machine](https://github.com/harrysolovay/sowing-machine/tree/master/packages/eslint-config): disables `no-undef` and enables a the `sowing-machine/no-undef` rule, which marks html tag identifiers as defined within sow calls
- [sowing-machine.macro](https://github.com/harrysolovay/sowing-machine/tree/master/packages/babel-macro): makes use of the [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) API to provide a more seamless integration with tools such as [create-react-app](https://github.com/facebook/create-react-app), [NextJS](https://nextjs.org/) and [GatsbyJS](https://www.gatsbyjs.org/).

## Background

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

const App = sow(() =>
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
)
```

This is a smaller, more readable block of code, which lets you recognize grammar with greater speed than that of JSX.

## Installation & Setup

#### Install the following dev dependencies:

```sh
yarn add -D babel-plugin-sowing-machine eslint-config-sowing-machine
```

> Sowing Machine is also available in Babel Macro form (`sowing-machine.macro`)

#### Install the runtime library as a dependency

```sh
yarn add sowing-machine
```

#### Add the plugin to your Babel config

`.babelrc`

```diff
{
  "plugins": [
+   "sowing-machine"
  ]
}
```

#### Add to your ESLint config as well

`.eslintrc`

```diff
{
  "extends": [
+   "sowing-machine"
  ]
}
```

And voila! You're good to go!

## Describing UI

Wrapping calls with `sow` ensures that they're translated into valid runtime code.

```diff
import sow from 'sowing-machine'

- const HelloWorld = props =>
-   span(props)`Hello World!`

+ const HelloWorld = sow(props =>
+   span(props)`Hello World!`
+ )

- const instance = HelloWorld()
+ const instance = sow(HelloWorld())
```

To use a 3rd-party component with Sowing Machine, we need to tell the compiler that it is in fact a component (and not just a function):

```js
import sow from 'sowing-machine'
import {DatePicker} from '~/components'

// wrapping with `sow` marks the `DatePicker` as sowable
const SDatePicker = sow(DatePicker)

// use SDatePicker
const datePickerInstance = sow(SDatePicker())
```

### Ways to write an element

#### With props

```js
div({some: 'prop'})
```

#### With children

```js
div(div({className: 'first-child'}), div({className: 'second-child'}))
```

#### With text

```js
h1`This is cool!`
```

#### With props and children

```js
form({className: 'form'})(
  input({type: 'email', name: 'email'}),
  input({type: 'submit', value: 'Submit'}),
)
```

#### With props & text

```js
span({className: 'warning')`beware of dog`
```

## createElement vs. cloneElement

Let's say you have a component instance that you'd like to use as the basis for a new component. There's no way of expressing this with JSX. You'd need to do the following:

```jsx
import React from 'react'

const instance = <div>Hello</div>

const usingTheInstance = (
  <div>{React.cloneElement(instance, {}, 'Hello JSX')}</div>
)
```

With Sowing Machine, the difference between using components and component instances is trivial:

```js
import sow from 'sowing-machine'

const instance = sow(div`Hello`)

const usingTheInstance = sow(instance`Hello Sowing Machine`)
```

## Life Cycle

### Compilation

During compilation, Sowing Machine code is broken down into a format that can be understood at runtime. There's no way––without the compilation step––to simultaneously support the following ways of describing your UI:

```js
// these cannot co-exist
div(props)
div(children)
div(props)(children)
div`child text`
div(props)`child text`
```

Sowing Machine takes care of some additional complexity: differentiating between components, functions, and implicitly embedded logic.

When working **with JSX, you need to mark your logic as off-limits to the compiler**:

```jsx
import React from 'react'

const List = ({list}) => (
  <div>
    {list.map(e => (
      <div>{e}</div>
    ))}
  </div>
)
```

**With Sowing Machine, this is much cleaner:**.

```js
import sow from 'sowing-machine'

const List = sow(({list}) => div(list.map(e => div(e))))
```

The compiler extracts key information from each function or tag call within your `sow` calls, and places them in a lightweight, runtime-friendly wrapper.

This code:

```js
sow(div({some: 'prop'})(span`neat`, span`syntax`))
```

Gets transformed into something like this:

```js
_c(
  _s('div', [
    [{some: 'prop'}],
    [_s('span', _x, [['neat']]), _s('span', _x, [['syntax']])],
  ]),
)
```

### Runtime

When executing the code above, the runtime library will analyze the arguments of each `_s`.

The runtime goes through some of the following questions: is it a React component? If so does it have props, children, or both? Is it a tag function? Do the quasis need to be recombined or passed into the function according to [the TaggedTemplateLiteral specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

## Roadmap

|    Status     | Goal                                           | package               |
| :-----------: | :--------------------------------------------- | --------------------- |
| `in progress` | TypeScript definitions                         | runtime               |
| `in progress` | Container memoization & invalidation           | runtime               |
| `in progress` | Applying nested styles tagged onto `sow` calls | runtime               |
| `in progress` | Better errors                                  | babel-plugin, runtime |
|  `planning`   | More ESLint rules                              | eslint-plugin         |

If you have feature ideas or want to contribute, please go ahead and file an issue.
