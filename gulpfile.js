var gulp = require('gulp')
var ts = require('gulp-typescript')
var clean = require('gulp-clean')
var path = require('path')
var server = require('gulp-develop-server')
var sourcemaps = require('gulp-sourcemaps')
var mocha = require('gulp-mocha')
var tslint = require('gulp-tslint')
var tslintConfig = require('./tslint.json')
var serverPath = 'server/'
var serverTS = [serverPath + '**/*.ts']
var serverCompiled = ['**/*.js', '**/*.js.map', '**/*.d.ts'].map(el => serverPath + el)
// var tsProject = ts.createProject('tsconfig.json')
var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true })

function compile () {
  return gulp
        .src(serverTS)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: path.join(__dirname, serverPath), destPath: '.'}))
        .pipe(gulp.dest(serverPath))
}

gulp.task('ts-inc', function () {
  return compile()
})

gulp.task('ts', ['clean'], function () {
  return compile()
})

gulp.task('clean', function () {
  return gulp
        .src(serverCompiled, {read: false})
        .pipe(clean())
})

gulp.task('server:start', ['ts-inc'], function () {
  server.listen({path: serverPath + 'bin/www', execArgv: ['--debug']}, function (error) {
    console.log(error)
  })
})

gulp.task('server:restart', ['ts-inc'], function () {
  server.restart()
})

gulp.task('default', ['ts'], function () {
  gulp.watch(serverTS, ['ts-inc'])
})

gulp.task('test', ['ts'], function () {
  return gulp
        .src('server/**/*.Spec.js', {read: false})
        // wait for dev server to start properly :(
        // .pipe(wait(600))
        .pipe(mocha())
        .once('error', function () {
          process.exit(1)
        })
        .once('end', function () {
          process.exit()
        })
})

gulp.task('tslint', ['clean'], function () {
  gulp.src(serverTS)
        .pipe(tslint(tslintConfig))
        .pipe(tslint.report({
          emitError: false
        }))
})
