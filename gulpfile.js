
const gulp = require('gulp');
const del = require('del');

const not = '!';
const all = '**/*';
const ts = '**/*.ts';
const genJs = '**/*.js*';

const paths = {
  nm: './node_modules',
  src: './src/',
  dist: './dist/',
  test: './test/',
  temp: './temp/'
};

function cleanDist() {
  return del([paths.dist + all, not + paths.dist]);
}

function cleanTemp() {
  return del([paths.temp + all, not + paths.temp]);
}

function copyLibs() {
  // TODO: Implement copy script to pull in libraries...
}

function buildSrc() {
  // TODO: Implement TS build...
}

function testSingle() {
  // TODO: Run AVA tests...
}

function testWatch() {
  // TODO: Run AVA tests...
}

// Clean tasks...
gulp.task('clean:dist', cleanDist);
gulp.task('clean:temp', cleanTemp);
gulp.task('clean', ['clean:dist', 'clean:temp']);

// Build tasks...
gulp.task('copy:libs', copyLibs);
gulp.task('build:src', buildSrc);
gulp.task('build', ['copy:libs', 'build:src']);

// Test tasks...
gulp.task('test:ci', ['build'], testSingle);
gulp.task('test', ['build'], testWatch);

// Default task...
gulp.task('default', ['build']);