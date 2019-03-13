import template from '@babel/template'
import {fromCallExpression, fromTaggedTemplateExpression, tick} from './utils'
import {types as t} from '@babel/core'
import {isHookName} from 'is-react-hook'
import isHTMLTagName from 'is-html-tag-name'
import {declare} from '@babel/helper-plugin-utils'

const PLUGIN_NAME = 'Sowing Machine'
const MODULE_NAME = 'sowing-machine'

const createCallStitch = template`S(SUBJECT, STAGES)`
const createTagTemplateStitch = template`S(SUBJECT, STAGES, QUASI)`
const createImports = template`
  const {c: CNAME, s: SNAME, x: XNAME} = IMPORT_NAME
`

const typeToHelpersMap = {
  CallExpression: [fromCallExpression, createCallStitch],
  TaggedTemplateExpression: [
    fromTaggedTemplateExpression,
    createTagTemplateStitch,
  ],
}

export const transform = (referencePaths, state) => {
  const {C, S, X} = state

  for (const referencePath of referencePaths) {
    const {parentPath} = referencePath

    parentPath.traverse(
      {
        'CallExpression|TaggedTemplateExpression'(path) {
          const {node} = path

          if (t.isCallExpression(node)) {
            const {name} = node.callee
            if (name === S.name || isHookName(name)) return
          }

          const [assemble, create] = typeToHelpersMap[node.type]
          const [callee, STAGES, QUASI] = assemble(node, X)

          const {bindings} = referencePath.scope
          const {name} = callee
          const isHTMLElement = !bindings[name] && isHTMLTagName(name)
          const SUBJECT = isHTMLElement ? t.stringLiteral(name) : callee

          const templateArgs = {S, SUBJECT, STAGES, ...(QUASI ? {QUASI} : {})}
          const replacement = create(templateArgs)
          path.replaceWith(replacement)
        },
      },
      state,
    )

    const {arguments: args} = parentPath.node
    const [first, ...rest] = args

    const isContainer =
      t.isArrowFunctionExpression(first) ||
      t.isFunctionExpression(first) ||
      (t.isIdentifier(first) && rest.length === 0)
    const {quasi} = parentPath.parentPath.node
    const replacement = isContainer
      ? [C, [t.numericLiteral(tick()), ...args, ...(quasi ? [quasi] : [])]]
      : [S, args]
    ;(quasi ? parentPath.parentPath : parentPath).replaceWith(
      t.callExpression(...replacement),
    )
  }
}

export default declare(api => {
  api.assertVersion(7)

  return {
    name: PLUGIN_NAME,
    visitor: {
      ImportDeclaration(path, state) {
        const {node, scope} = path

        if (node.source && node.source.value === MODULE_NAME) {
          const {name: importName} = node.specifiers[0].local

          const [C, S, X] = ['c', 's', 'x'].map(i =>
            scope.generateUidIdentifier(i),
          )

          const defaultImport = path.container.shift()
          path.container.unshift(
            defaultImport,
            createImports({
              CNAME: C,
              SNAME: S,
              XNAME: X,
              IMPORT_NAME: importName,
            }),
          )

          const {referencePaths} = scope.bindings[importName]
          transform(referencePaths, {...state, C, S, X})
        }
      },
    },
  }
})
