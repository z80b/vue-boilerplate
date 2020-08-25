import { rollup } from 'rollup';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import vue from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';

async function build(plugins) {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: plugins,
    treeshake: true,
  });
  bundle.write({
    file: 'index.js',
    format: 'iife',
    sourcemap: false,
  });
}

const production = !process.env.ROLLUP_WATCH;

const rollupPlugins = [
  alias({
    entries: [
      { find: '@', replacement: __dirname + '/src/' },
      { find: '@blocks', replacement: __dirname + '/src/blocks/' },
    ]
  }),

  postcss({
    plugins: [
      cssnano(),
    ],
    extract: true,
    output: 'index.css',
  }),

  vue({ css: false }),

  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),

  resolve({ extensions: ['.js', '.vue'], browser: true, preferBuiltins: true }),

  commonjs(),

  esbuild({
    minify: production,
    target: 'es2015',
  }),

  terser({
    output: {
      comments: false,
    },
  }),
];

build(rollupPlugins);