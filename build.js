import { rollup, watch } from 'rollup';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import vue from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';

const [ mode ] = process.argv.slice(2);
const production = (mode != 'watch');

async function build(plugins) {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: plugins,
    treeshake: production,
  });
  bundle.write({
    file: 'index.min.js',
    format: 'iife',
    sourcemap: !production,
  });
};

const rollupPlugins = [
  alias({
    entries: [
      { find: '@', replacement: __dirname + '/src' },
      { find: '@c', replacement: __dirname + '/src/components' },
      { find: '@b', replacement: __dirname + '/src/blocks' },
      { find: '@a', replacement: __dirname + '/src/api' },
    ]
  }),

  // postcss({
  //   plugins: [
  //     cssnano(),
  //   ],
  //   extract: true,
  //   output: production ? 'index.min.css' : 'index.css',
  // }),

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

  // terser({
  //   output: {
  //     comments: false,
  //   },
  // }),
];

const watchOptions = {
  input: 'src/index.js',
  output: [{
    file: 'index.js',
    format: 'iife',
    sourcemap: 'inline',
  }],
  watch: {
    exclude: 'node_modules/**',
    clearScreen: true,
  },
  plugins: [...rollupPlugins, postcss({
    extract: true,
    output: 'index.css',
  })],
};

if (production) {
  build([
    ...rollupPlugins,
    postcss({
      plugins: [
        cssnano(),
      ],
      extract: true,
      output: 'index.min.css',
    }),
    terser({
      output: {
        comments: false,
      },
    }),
  ]);
} else {
  const watcher = watch(watchOptions);

  watcher.on('event', event => {
    console.log(event);
  });

  watcher.close();
}