import babel from 'rollup-plugin-babel'
import {main, module, peerDependencies, dependencies} from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: main,
      format: 'cjs',
    },
    {
      file: module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(dependencies || {}),
  ],
  plugins: [
    resolve({
      module: true,
      main: true,
    }),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            loose: true,
            targets: {
              browsers: ['last 1 version'],
            },
          },
        ],
        '@babel/preset-react',
      ],
    }),
  ],
}
