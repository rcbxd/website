var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('sass-landing', () => {
    return gulp.src('static/landing/scss/style.scss').pipe(sass({
        style: 'expanded'
    })).pipe(gulp.dest('static/landing')).pipe(connect.reload());
});

gulp.task('pug', () => {
    return gulp.src('./routes/index.pug').pipe(pug({})).pipe(gulp.dest('./')).pipe(connect.reload());
})

gulp.task('connect', () => {
    connect.server({
        root: '',
        livereload: true
    })
})

gulp.task('watch', () => {
    gulp.watch('static/landing/scss/*.scss', ['sass-landing']);
    gulp.watch('./routes/index.pug', ['pug']);
})

gulp.task('default', ['connect', 'watch'])