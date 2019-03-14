import {createMacro} from 'babel-plugin-macros'
import {
  transformReferences,
  createImportDestructure,
} from 'babel-plugin-sowing-machine'
import sowingMachine from 'sowing-machine'

const macro = createMacro(({references, state}) => {
  const {default: defaultReferences} = references
  const [first] = defaultReferences
  const {name: importName} = first.node

  const {scope} = state.file.path
  const [c, s, x] = ['c', 's', 'x'].map(i => scope.generateUidIdentifier(i))

  scope.path.node.body.splice(
    1,
    0,
    createImportDestructure({
      CNAME: c,
      SNAME: s,
      XNAME: x,
      IMPORT_NAME: importName,
    }),
  )

  transformReferences(defaultReferences, {...state, c, s, x})
  return {keepImports: true}
})

Object.assign(macro, sowingMachine)

export default macro
