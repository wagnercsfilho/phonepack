var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css');

var config = {
	pluginName: 'phonepack'
}

gulp.task('sass', function(){
	gulp.src('src/scss/index.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(prefix('last 2 versions'))
	.pipe(rename(config.pluginName + ".css"))
	.pipe(gulp.dest('dist/css'))
	.pipe(rename({
            suffix: ".min"
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});

gulp.task('watch', ['browserify-watch'], function(){
	browserSync.init({
		server: "./"/*,
    port: process.env.PORT || null,
    host: process.env.IP || null*/
	});

	gulp.watch('src/js/*.js').on('change', browserSync.reload);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch("demo/**/*.html").on('change', browserSync.reload);
});

gulp.task('browserify-watch', function(){
  watch = true;
  browserifyShare();
});

function browserifyShare(){
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    notify: false
  });
  
  if(watch) {
    // if watch is enable, wrap this bundle inside watchify
    b = watchify(b);
    b.on('update', function(){
      bundleShare(b);
    });
  }
  
  b.add('./src/js/index.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source(config.pluginName + '.js'))
	.pipe(buffer())
	.pipe(gulp.dest('./dist/js/'))
	.pipe(uglify())
	.pipe(rename({
            suffix: ".min"
    }))
	.pipe(gulp.dest('./dist/js/'))

	.pipe(browserSync.stream());
}

gulp.task('default', ['sass', 'watch']);