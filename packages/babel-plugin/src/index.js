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
export const createImportDestructure = template`
  const {c: CNAME, s: SNAME, x: XNAME} = IMPORT_NAME
`

const typeToHelpersMap = {
  CallExpression: [fromCallExpression, createCallStitch],
  TaggedTemplateExpression: [
    fromTaggedTemplateExpression,
    createTagTemplateStitch,
  ],
}

const createVisitorFactory = (s, x) => referencePath => ({
  'CallExpression|TaggedTemplateExpression'(path) {
    const {node} = path

    if (t.isCallExpression(node)) {
      const {name} = node.callee
      if (name === s.name || isHookName(name)) return
    }

    const [assemble, create] = typeToHelpersMap[node.type]
    const [callee, STAGES, QUASI] = assemble(node, x)

    const {bindings} = referencePath.scope
    const {name} = callee
    const isHTMLElement = !bindings[name] && isHTMLTagName(name)
    const SUBJECT = isHTMLElement ? t.stringLiteral(name) : callee

    const templateArgs = {S: s, SUBJECT, STAGES, ...(QUASI ? {QUASI} : {})}
    const replacement = create(templateArgs)
    path.replaceWith(replacement)
  },
})

export const transformReferences = (referencePaths, state) => {
  const {c, s, x} = state
  const createVisitor = createVisitorFactory(s, x)

  for (const referencePath of referencePaths) {
    const {parentPath} = referencePath

    const visitor = createVisitor(referencePath)
    parentPath.traverse(visitor, state)

    const {arguments: args} = parentPath.node
    const [first, ...rest] = args

    const isContainer =
      t.isArrowFunctionExpression(first) ||
      t.isFunctionExpression(first) ||
      (t.isIdentifier(first) && rest.length === 0)
    const {quasi} = parentPath.parentPath.node
    const replacement = isContainer
      ? [c, [t.numericLiteral(tick()), ...args, ...(quasi ? [quasi] : [])]]
      : [s, args]
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

          const [c, s, x] = ['c', 's', 'x'].map(i =>
            scope.generateUidIdentifier(i),
          )

          const defaultImport = path.container.shift()
          path.container.unshift(
            defaultImport,
            createImportDestructure({
              CNAME: c,
              SNAME: s,
              XNAME: x,
              IMPORT_NAME: importName,
            }),
          )

          const {referencePaths} = scope.bindings[importName]
          transformReferences(referencePaths, {...state, c, s, x})
        }
      },
    },
  }
})
