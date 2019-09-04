const { series } = require('gulp')
const { src, dest } = require('gulp')
const babel = require('gulp-babel')

function build(cb) {
  src('src/**/*.js')
    .pipe(babel())
    .pipe(dest('dist'))

  cb();
}

exports.build = build;
exports.default = series(build);