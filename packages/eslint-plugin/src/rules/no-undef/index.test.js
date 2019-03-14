import test from 'ava'
import avaRuleTester from 'eslint-ava-rule-tester'
import noUndef from '.'

const ruleTester = avaRuleTester(test, {
  parserOptions: {
    ecmaVersion: 9,
    impliedStrict: true,
    sourceType: 'module',
  },
})

const createError = id => ({
  ruleId: 'no-undef',
  message: `'${id}' is not defined.`,
})

ruleTester.run('no-undef', noUndef, {
  valid: [
    `
      import sow from 'sowing-machine'
      const yes1 = sow(div())
    `,
  ],
  invalid: [
    {
      code: `
        import sow from 'sowing-machine'
        const no1 = sow(SomethingUndefined)
      `,
      errors: [createError('SomethingUndefined')],
    },
    {
      code: `
        import sow from 'sowing-machine'
        const no1 = sow(nope({some: 'prop'}))
      `,
      errors: [createError('nope')],
    },
    {
      code: `const no1 = sow(SomethingUndefined)`,
      errors: [createError('sow'), createError('SomethingUndefined')],
    },
    {
      code: `const no2 = div()`,
      errors: [createError('div')],
    },
  ],
})
