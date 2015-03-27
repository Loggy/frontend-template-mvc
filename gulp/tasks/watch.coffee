gulp = require 'gulp'

gulp.task 'watch', ['browserSync'], ->
  gulp.watch 'app/slim/*.slim', ['html']
  gulp.watch 'app/sass/*.sass', ['css']

gulp.task 'setWatch', ->
  global.isWatching = true