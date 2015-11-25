/**
 * @fileoverview Build examples
 * @author Frederik Krautwald
 */

const fs = require(`fs`)
const path = require(`path`)
const browserify = require(`browserify`)

const baseDir = `examples${path.sep}`
const exampleDirs = process.argv[2].split(`,`)

function transpile(exampleDir) {
  const dir = baseDir + exampleDir + path.sep
  const file = `${dir}main.js`
  const outfile = `${dir}bundle.js`
  browserify(file)
    .transform(`babelify`)
    .bundle()
    .pipe(fs.createWriteStream(outfile))
}

exampleDirs.forEach(transpile)
