'use strict'
process.env.NODE_ENV = 'production'

const path = require('path')
const fs = require('fs')
const config = require('./index')
const projectRoot = path.resolve(__dirname, '../')

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const less = require('rollup-plugin-less')
const buble = require('rollup-plugin-buble')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')

const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const pkg = require('../package.json')

const banner =
`/*!
 * ${pkg.name} v${pkg.version}
 * @copyright ${new Date().getFullYear()} ${pkg.contributors.join(' ')}
 * Released under the ${pkg.license} License.
 */`

;[
  {type: 'cjs', output: config.output},
  config.output_min && {type: 'umd', output: config.output_min, minify: true}
].filter(Boolean).forEach(options => {
  rollup.rollup({
    entry: config.entry,
    plugins: [
      config.nodeResolve && nodeResolve({
        jsnext: true,
        main: true
      }),
      config.nodeResolve && commonjs({
        include: 'node_modules/**',
        extensions: [ '.js', '.coffee' ],
        ignoreGlobal: false,
        sourceMap: false
        // namedExports: { './module.js': ['foo', 'bar'] } // Default: undefined
      }),

      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      vue({
        compileTemplate: false,
        css: config.output_css,
        htmlMinifier: {
          minifyCSS: true,
          minifyJS: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,

          html5: true,
          processConditionalComments: true,
          processScripts: [
            'text/html'
          ],
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: true,
          useShortDoctype: true
        }
      }),
      less({
        insert: false,
        output: config.output_css
      }),
      postcss([autoprefixer({browsers: ['last 2 versions']})]),
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
  }).then(() => {
    let css = ''
    try {
      css = fs.readFileSync(config.output_css, 'utf8')
    } catch (e) {
      return
    }
    postcss([
      config.autoprefixer && autoprefixer(config.autoprefixer),
      config.px2rem && px2rem(config.px2rem)
    ].filter(Boolean))
      .process(css)
      .then(function (result) {
        write(path.resolve(projectRoot, config.output_css), result.css)
      })
  }).catch(e => {
    console.error(e)
  })
})

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}
