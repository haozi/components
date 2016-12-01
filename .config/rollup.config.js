'use strict'
const path = require('path')
const fs = require('fs')
const config = require('./index')
const projectRoot = path.resolve(__dirname, '../')
const rollup = require( 'rollup' )
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

;[
  {type: 'cjs', output: config.output},
  config.output_min && {type: 'umd', output: config.output_min, minify: true}
].filter(Boolean).forEach(options => {
  rollup.rollup({
    entry: config.entry,
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
      buble(),
      options.minify && uglify({
        compress: {
          warnings: false,
          hoist_vars: true,
          hoist_funs: true,
          drop_debugger: true,
          unused: true,
          drop_console: true,
          sequences: true,
          conditionals: true,
          booleans: true,
          if_return: true,
          join_vars: true,
          screw_ie8: true,
          comparisons: true,
          evaluate: true,
          loops: true,
          cascade: true,
          negate_iife: true
        },
        comments: false,
        output: {
          ascii_only: true
        }
      })
    ].filter(Boolean)
  }).then((bundle) => {
    const result = bundle.generate({
      banner: banner,
      useStrict: false,
      format: options.type,
      moduleName: pkg.name
    })
    write(path.resolve(projectRoot, options.output), result.code)
  })
})


function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function write(dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}
