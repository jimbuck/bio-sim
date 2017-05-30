'use strict';

const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');

const packager = require('electron-packager');

const paths = require('./paths');

class Tasks {

  static clean() {
    return del([paths.dist('*'), paths.root('coverage')]);
  }

  static get compileTypescript() {
    // Just run the tsc via command line...   
    return shell.task(`tsc`);
  }

  static copyBootstrapContent() {
    return gulp.src([
      paths.node_modules('bootstrap/dist/**/*')
    ])
      .pipe(gulp.dest(paths.dist('lib/bootstrap')));
  }

  static compileLess() {
    return gulp.src(paths.src('**/*.less'))
      .pipe(sourcemaps.init())  
      .pipe(less({
        paths: [paths.node_modules('bootstrap/less')]
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dist()));
  }

  static copyContent() {
    return gulp.src([paths.src('**/*.{png,gif,jpeg,jpg,html}')])
      .pipe(gulp.dest(paths.dist()));
  }

  static get test() {
    return shell.task(`nyc --color --reporter=text --reporter=lcov -a ava -v`);
  }

  static watch() {
    return gulp.watch([paths.src + '**/*'], ['test']);
  }

  static get run() {
    return shell.task(`electron .`);
  }

  static package() {
    return new Promise((resolve, reject) => {
      packager({

      }, function (err, appPaths) {
        if (err) {
          console.log(`Failed to build application!`);
          return reject(err);
        }

        console.log(`Application built successfully!`);
        console.log(appPaths);
        resolve(appPaths);
      });
    });
  }

  // TODO: Update this...  
  static help() {
    console.log(`
Everything you need to know:

     clean - Deletes all generated files.
   * build - Builds all source files. (default)
      test - Runs the test suite and updates coverage.
     watch - Runs tests upon source changes.
`);
  }
}

const copyLibs = gulp.parallel(Tasks.copyBootstrapContent);

// Drop the dist folder...
gulp.task('clean', Tasks.clean);

// Build with cleaning...
gulp.task('build', gulp.series(Tasks.clean, gulp.parallel(copyLibs, Tasks.compileTypescript, Tasks.copyContent, Tasks.compileLess)));

gulp.task('run', gulp.series('build', Tasks.run));

// Run the basic `npm test` command after a quick build...
gulp.task('test', gulp.series('build', Tasks.test));

// Used for faster development (watch with TAP output) (but also because we now are moving more files around)
gulp.task('watch', gulp.series(Tasks.clean, Tasks.watch));

// Prints a simple command breakdown message.
gulp.task('help', Tasks.help);

// Default task...
gulp.task('default', gulp.task('build'));