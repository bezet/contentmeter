'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

import packageInfo from './package.json';

const PRODUCTION = argv.production ? true : false;
const packageName = (packageInfo.name).split('/')[1];



// PATHS

const paths = {};

paths.root = '.';

paths.base = {
  src  : `${paths.root}/src`,
  dest : `${paths.root}/dist`,
  demo : `${paths.root}/docs`,
};

paths.js = {
  srcMain : [`${paths.base.src}/${packageName}.js`],
  src     : [`${paths.base.src}/*{.js,/*.js}`],
  dest    :  `${paths.base.dest}`,
};

paths.styles = {
  src    : [`${paths.base.src}/*.scss`],
  dest   :  `${paths.base.dest}`,
};

paths.demo = {
  scssMain : [`${paths.base.demo}/styles/main.scss`],
  scss     : [`${paths.base.demo}/styles/*{.scss,/*.scss}`],
  jsMain   : [`${paths.base.demo}/scripts/main.js`],
  js       : [`${paths.base.demo}/scripts/*{.js,/*.js}`],
  dest     :  `${paths.base.demo}`,
};



// CONFIGS

const browserSyncInstance = browserSync.create();
const bsConfig = require('./config/bs.config.js');

const webpackConfig = PRODUCTION ? './config/webpack.prod.js' : './config/webpack.dev.js';

const sassOptions = {
  includePaths: ['node_modules', 'docs/node_modules'],
  outputStyle:  PRODUCTION ? 'compressed' : 'expanded',
};

const postcssPlugins = [
  autoprefixer({ browsers: '> 5%, ie 9' })
];



// TASKS

gulp.task('argv-test', () => {
  console.log(packageName);
  // console.log(argv);
});



// demo's styles & scripts

gulp.task('demo:styles', () => {
  return gulp.src(paths.demo.scssMain)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(rename({
      basename: 'bundle'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.demo.dest));
});

gulp.task('demo:js', () => {
  return gulp.src(paths.demo.jsMain)
    .pipe(webpack(require('./config/webpack.demo.js')))
    .pipe(gulp.dest(paths.demo.dest));
});

gulp.task('demo', ['demo:styles', 'demo:js']);



// library's scripts

gulp.task('build:js', () => {
  return gulp.src(paths.js.srcMain)
    .pipe(webpack(require(webpackConfig)))
    .pipe(gulp.dest(paths.js.dest));
});



// library's styles

gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(rename({
      basename: packageName
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});



// other tasks

// gulp build [--production]
gulp.task('build', () => {
  runSequence(['build:js', 'build:styles'], 'demo');
});

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.js.srcMain.concat(paths.js.src), () => {
    runSequence('build:js', 'demo:js');
  });

  gulp.watch(paths.styles.src, () => {
    runSequence('build:styles', 'demo:styles');
  });

  gulp.watch(paths.demo.scss, () => {
    runSequence('demo:styles');
  });

  gulp.watch(paths.demo.js, () => {
    runSequence('demo:js');
  });
});

gulp.task('serve', ['watch'], () => {
  browserSyncInstance.init(bsConfig);
});

gulp.task('default', ['serve']);
