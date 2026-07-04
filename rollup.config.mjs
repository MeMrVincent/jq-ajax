import terser from '@rollup/plugin-terser';

const minify = (input, file) => ({
  context: 'this',
  input,
  output: {
    file,
    format: 'es',
    plugins: [terser()],
    sourcemap: false
  }
});

export default [
  minify('jQuery.1.11.1.ajax.release.js', 'jQuery.1.11.1.ajax.release.min.js'),
  minify('jQuery.1.11.1.ajax.rebuild.js', 'jQuery.1.11.1.ajax.rebuild.min.js')
];