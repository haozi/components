'use strict'
const path = require('path')
const config = require('./index')
const projectRoot = path.resolve(__dirname, '../')
const vue = require('rollup-plugin-vue')
const less = require('rollup-plugin-less')
const buble = require('rollup-plugin-buble')
const uglify = require('rollup-plugin-uglify')
const pkg = require('../package.json')

const banner =
  '/*!\n' +
  ' * ' + pkg.name + ' v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' ' + pkg.contributors.join(' ') + '\n' +
  ' * Released under the ' + pkg.license + ' License.\n' +
  ' */'

export default {
  entry: config.entry,
  targets: [
    {format: 'cjs', dest: path.resolve(projectRoot, config.output)},
  ],
  banner: banner,
  useStrict: false,
  plugins: [
    vue({
      compileTemplate: false,
      css: 'dist/index.css',
      htmlMinifier: {
        minifyCSS: true,
        minifyJS: true,
        "collapseBooleanAttributes": true,
        "collapseWhitespace": true,
        "decodeEntities": true,

        "html5": true,
        "processConditionalComments": true,
        "processScripts": [
          "text/html"
        ],
        "removeAttributeQuotes": true,
        "removeComments": true,
        "removeEmptyAttributes": true,
        "removeOptionalTags": true,
        "removeRedundantAttributes": true,
        "removeScriptTypeAttributes": true,
        "removeStyleLinkTypeAttributes": true,
        "removeTagWhitespace": true,
        "useShortDoctype": true,
      }
    }),
    less({
      insert: false,
      output: 'dist/index.css'
    }),
    buble()
  ]
}
