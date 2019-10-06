const { src, dest, parallel, series } = require('gulp');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');

// gulp固有の設定
const config = {
  output: 'dist/',
  json: {
    source: 'src/**/*.json'
  }
};

// typescript のトランスパイルオプション ※tsconfig.json を再利用する
const typescript = () => {
  return src(tsconfig.include)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(dest(config.output));
};

// json ファイルのアウトプットディレクトリへのコピーを司る司令
const json = () => {
  return src(config.json.source)
    .pipe(dest(config.output));
};

// 実行時オプション
exports.typescript = typescript;
exports.default = series(parallel(typescript, json));
