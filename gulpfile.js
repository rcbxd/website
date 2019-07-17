var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('sass', () => {
    return gulp.src('static/scss/style.scss').pipe(sass({
        style: 'expanded'
    })).pipe(gulp.dest('static/')).pipe(connect.reload());
});

gulp.task('pug', () => {
    return gulp.src('./index.pug').pipe(pug({})).pipe(gulp.dest('./')).pipe(connect.reload());
})

gulp.task('connect', () => {
    connect.server({
        root: '',
        livereload: true
    })
})

gulp.task('watch', () => {
    gulp.watch('static/scss/*.scss', ['sass']);
    gulp.watch('index.pug', ['pug']);
})

gulp.task('default', ['connect', 'watch'])