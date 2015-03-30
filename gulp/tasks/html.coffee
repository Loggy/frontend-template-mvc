gulp = require 'gulp'
browserSync = require 'browser-sync'
slim = require 'gulp-slim'
reload = browserSync.reload

gulp.task 'html', ->
  gulp.src './app/slim/*.slim'
  	.pipe slim pretty: true
    .pipe gulp.dest('./build')
    .pipe reload({ stream: true })

gulp.task 'json', ->
  gulp.src './app/scripts/*.json'
    .pipe gulp.dest('./build/scripts')
    .pipe reload({ stream: true })

gulp.task 'img', ->
  gulp.src './app/images/*.{svg,png,jpg,gif}'
    .pipe gulp.dest('./build/images')
    .pipe reload({ stream: true })