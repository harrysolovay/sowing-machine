import isHTMLTagName from 'is-html-tag-name'
import traverse from '@babel/traverse'

const MODULE_NAME = 'sowing-machine'

const meta = {
  type: 'problem',

  docs: {
    description:
      'disallow the use of undeclared variables unless mentioned in `/*global */` comments',
    category: 'Variables',
    recommended: true,
    url: 'https://eslint.org/docs/rules/no-undef',
  },

  schema: [
    {
      type: 'object',
      properties: {
        typeof: {
          type: 'boolean',
          default: false,
        },
      },
      additionalProperties: false,
    },
  ],
  messages: {
    undef: "'{{name}}' is not defined.",
  },
}

const hasTypeOfOperator = ({parent}) =>
  parent.type === 'UnaryExpression' && parent.operator === 'typeof'

const create = context => {
  let importName = 'sow'
  const whitelisted = new Set()

  const options = context.options[0]
  const considerTypeOf = (options && options.typeof === true) || false

  return {
    ImportDeclaration(node) {
      if (node.source.value === MODULE_NAME) {
        const [first] = node.specifiers
        importName = first.local.name
      }
    },

    VariableDeclaration(node) {
      const [declaration] = node.declarations
      const {init} = declaration

      if (
        init &&
        init.callee &&
        init.callee.name === 'require' &&
        init.arguments &&
        init.arguments[0] &&
        init.arguments[0].value === MODULE_NAME
      )
        importName = declaration.id.name
    },

    CallExpression(node) {
      node.callee.name === importName && whitelisted.add(node)
    },

    'Program:exit'() {
      const globalScope = context.getScope()

      globalScope.through.forEach(ref => {
        const {identifier} = ref
        if (!considerTypeOf && hasTypeOfOperator(identifier)) return
        let isWhitelisted = false

        const visitor = {
          enter(path) {
            const {node} = path

            if (
              node.type === 'Identifier' &&
              node.start === identifier.start &&
              isHTMLTagName(identifier.name)
            )
              isWhitelisted = true
          },
        }

        for (const whiteListedNode of whitelisted)
          if (whiteListedNode) traverse(whiteListedNode, visitor, {})

        if (isWhitelisted) return

        context.report({
          node: identifier,
          messageId: 'undef',
          data: identifier,
        })
      })
    },
  }
}

export default {meta, create}
