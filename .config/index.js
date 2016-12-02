'user strict'

module.exports = {
  entry: './src/index.js',
  output: './dist/index.js',
  // output_min: './dist/index.min.js',
  browser: './test/browser.js',
  output_css: './dist/index.css',
  output_css_min: './dist/index.min.css',
  autoprefixer: {
    browsers: ['last 2 versions']
  }
}
