const { src, dest, parallel, series } = require('gulp');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');

const config = {
  output: 'dist/',
  json: {
    source: 'src/**/*.json'
  }
};
const typescript = () => {
  return src(tsconfig.include)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(dest(config.output));
};

const json = () => {
  return src(config.json.source)
    .pipe(dest(config.output));
};

exports.typescript = typescript;
exports.default = series(parallel(typescript, json));
