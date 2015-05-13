gulp = require 'gulp'
browserSync = require 'browser-sync'
slim = require 'gulp-slim'
imagemin = require 'gulp-imagemin'
reload = browserSync.reload

gulp.task 'html', ->
  gulp.src './app/slim/*.slim'
  	.pipe slim pretty: true
    .pipe gulp.dest('./build')
    .pipe reload({ stream: true })

gulp.task 'img', ->
  gulp.src './app/images/*.{svg,png,jpg,gif}'
    .pipe imagemin()
    .pipe gulp.dest('./build/images')
    .pipe reload({ stream: true })

gulp.task 'fonts', ->
  gulp.src './app/fonts/**/*'
    .pipe gulp.dest('./build/fonts')
    .pipe reload({ stream: true })