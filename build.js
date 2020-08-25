import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';
import globals from 'rollup-plugin-node-globals';
import buble from '@rollup/plugin-buble';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';
import { rollup } from 'rollup';

async function build(plugins) {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: plugins,
    treeshake: true,
  });
  bundle.write({
    file: 'index.js',
    format: 'iife',
    sourcemap: 'inline',
  });
}

const rollupPlugins = [
  alias({
    entries: [
      { find: '@', replacement: __dirname + '/src/' },
      { find: '@blocks', replacement: __dirname + '/src/blocks/' },
    ]
  }),

  vuePlugin({
    css: false,
    target: 'browser',
    exposeFilename: true,
  }),

  postcss({ extract: true, output: 'index.css' }),

  buble(),

  // babel({
  //   presets: [
  //     '@babel/env',
  //   ],
  //   exclude: 'node_modules/**',
  // }),

  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),

  globals(),

  resolve({
    extensions: ['.mjs', '.js', '.vue', '.json'],
    dedupe: [ 'vue' ],
    browser: true,
    // preferBuiltins: false,
    // jsnext: true,
  }),

  commonjs(),

  esbuild({
    minify: true,
    target: 'es2015',
  }),

  uglify(),
  // terser(),
];

build(rollupPlugins);