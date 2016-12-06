'user strict'

module.exports = {
  entry: './src/index.js',
  output: './dist/index.js',
  // output_min: './dist/index.min.js',
  browser: './test/browser.js',
  output_css: './dist/index.css',
  output_css_min: './dist/index.min.css',
  autoprefixer: {
    browsers: ['Android >= 4', 'iOS >=7', 'IE >= 9', 'Firefox >= 50', 'Chrome >= 21']
  }
}
