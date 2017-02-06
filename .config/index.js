'user strict'

module.exports = {
  entry: './src/index.js',
  output: './dist/index.js',
  output_min: './dist/index.min.js',
  browser: './test/browser.js',
  output_css: './dist/index.css',
  output_css_min: './dist/index.min.css',
  nodeResolve: true, // 是否把 node_modules 中的 js 也 inline, 默认 true
  autoprefixer: {
    browsers: ['Android >= 4', 'iOS >= 7', 'IE >= 9', 'Firefox >= 50', 'Chrome >= 21']
  }
  // px2rem: {remUnit: 100, baseDpr: 1} // 开启后需在页面中加入 `!function (t) {t.style.fontSize = t.getBoundingClientRect().width / 3.75 + 'px'}(document.documentElement)`
}
