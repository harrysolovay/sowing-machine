import test from 'ava'
import {join} from 'path'
import {readdirSync, readFileSync, writeFileSync} from 'fs'
import babelPluginSowingMachine from '../../babel-plugin/src'
import babelPluginMacros from 'babel-plugin-macros'
import {transformSync} from '@babel/core'

const fixturesDir = join(__dirname, 'fixtures')
const fixtureFolders = readdirSync(fixturesDir)
const files = ['source', 'expected', 'actual']
const encoding = 'utf-8'

const formatToPluginAndImportName = {
  plugin: [babelPluginSowingMachine, 'sowing-machine'],
  macro: [babelPluginMacros, 'sowing-machine.macro'],
}

const {FORMAT: format} = process.env
if (format !== 'macro' && format !== 'plugin')
  throw new Error(`No format ('macro' vs. 'plugin') passed to tests`)
const [plugin, importName] = formatToPluginAndImportName[format]
const babelConfig = {plugins: [plugin]}

const trim = str =>
  str
    .replace(/\r?\n|\r|,| +?/g, '')
    .replace(/"|'/g, "'")
    .split(';')
    .join('')

for (const fixtureFolder of fixtureFolders) {
  test(fixtureFolder, t => {
    const fixtureDir = join(fixturesDir, fixtureFolder)

    const [sourceDir, expectedDir, actualDir] = files.map(name =>
      join(fixtureDir, `${name}.js`),
    )

    const [source, expected] = [sourceDir, expectedDir].map(dir => {
      const raw = readFileSync(dir, encoding)
      return raw.replace('IMPORT_NAME', importName)
    })

    const actual = transformSync(source, babelConfig).code

    writeFileSync(actualDir, actual, encoding)
    t.is(...[expected, actual].map(trim))
  })
}
