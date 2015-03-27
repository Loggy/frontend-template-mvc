gulp = require 'gulp'
browserSync = require 'browser-sync'
sass = require 'gulp-ruby-sass'
reload = browserSync.reload

gulp.task 'css', ->
  sass './app/sass'
    .on 'error', (err) ->
      console.error 'Error!', err.message
    .pipe gulp.dest('./build/css')
    .pipe reload({ stream: true })