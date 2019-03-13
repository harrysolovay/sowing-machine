import test from 'ava'
import {join} from 'path'
import {readdirSync, readFileSync, writeFileSync} from 'fs'
import plugin from '../plugin'
import {transformFileSync} from '@babel/core'

const fixturesDir = join(__dirname, 'fixtures')
const fixtureFolders = readdirSync(fixturesDir)
const files = ['source', 'expected', 'actual']
const encoding = 'utf-8'
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

    const expected = readFileSync(expectedDir, encoding)
    const actual = transformFileSync(sourceDir, babelConfig).code

    writeFileSync(actualDir, actual, encoding)
    t.is(...[expected, actual].map(trim))
  })
}
