const gulp = require('gulp')
// const babel = (require('gulp-babel'))
// const minify = require('gulp-babel-minify')
const uglifyJS = require('gulp-uglify')
const cssNano = require('gulp-cssnano')
const sass = require('gulp-sass')(require('sass'))

gulp.task('sass', function () {
    return gulp.src('styles/*.scss').pipe(sass()).pipe(cssNano()).pipe(gulp.dest('assets'))
})

gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', gulp.series('sass'))
})

var requiredFiles = ['scripts/**/*.js',      // include these files 
                    '!js/vendors/**/*.js']    // exclude these files

gulp.task('js', async function () {
    return gulp
        .src(requiredFiles)
        // .pipe(babel({ presets: ['@babel/preset-env'] }))
        // .pipe(minify({mangle: { keepClassName: true }}))
        .pipe(uglifyJS())
        .pipe(gulp.dest('assets'))
    })

gulp.task('build', gulp.series('js'));

