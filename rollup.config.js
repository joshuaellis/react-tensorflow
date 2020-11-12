import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: false
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    external(),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__test__/**',
      clean: true,
      typescript: require('typescript'),
      sourcemap: false
    }),
    commonjs({
      include: ['node_modules/**'],
      sourcemap: false
    }),
    terser()
  ]
}
