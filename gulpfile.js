var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	babel = require('babelify'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	header = require('gulp-header');

var config = {
	pluginName: 'phonepack'
}

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('fonts', function() {

	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'));

});

gulp.task('sass', function() {

	gulp.src('src/scss/index.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
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

gulp.task('jshint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint({
    	esnext: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['browserify-watch'], function() {
	var port = {
		server: "./"
	};

	if (process.env.PORT) {
		port.port = process.env.PORT,
		port.host = process.env.IP
	}

	browserSync.init(port);

	gulp.watch('./src/js/**/*.js', ['jshint']);
	gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('browserify-watch', function() {
	browserifyShare(true);
});

gulp.task('browserify', function() {
	browserifyShare(false);
});

function browserifyShare(watch) {
	var b = browserify({
		cache: {},
		packageCache: {},
		//fullPaths: true,
		notify: false,
		//debug: true,
		standalone: config.pluginName
	}).transform(babel);

	if (watch) {
		b = watchify(b);
		b.on('update', function() {
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
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream())
		.on('error', function(err) {
			console.error(err);
			this.emit('end');
		});
}

gulp.task('default', ['fonts', 'sass', 'jshint', 'watch']);