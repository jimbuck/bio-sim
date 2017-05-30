'use strict';

const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');
const args = require('yargs').argv;

const packager = require('electron-packager');

const paths = require('./paths');

class Tasks {

  static clean() {
    return del([paths.dist('*'), paths.root('coverage')]);
  }

  static get buildSrc() {
    // Just run the tsc via command line...   
    return shell.task(`webpack`);
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

// Drop the dist folder...
gulp.task('clean', Tasks.clean);

// Build with cleaning...
gulp.task('build', ['clean'], Tasks.buildSrc);

gulp.task('run', ['build'], Tasks.run);

// Run the basic `npm test` command after a quick build...
gulp.task('test', ['build'], Tasks.test);

// Used for faster development (watch with TAP output) (but also because we now are moving more files around)
gulp.task('watch', ['clean'], Tasks.watch);

// Prints a simple command breakdown message.
gulp.task('help', Tasks.help);

// Default task...
gulp.task('default', ['build']);