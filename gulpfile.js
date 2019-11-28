var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var minify = require("gulp-csso");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var	uglify = require("gulp-uglify-es").default;
var	concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var imgCompress  = require("imagemin-jpeg-recompress");
var sprite = require("gulp-svg-sprite");
var cheerio = require("gulp-cheerio");
var wait = require("gulp-wait");
var del = require("del");

function serve (done) {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
	gulp.watch("sass/**/*", styles);
	gulp.watch(["libs/**/*.js", "js/common.js"], scripts).on("change", browserSync.reload);
	gulp.watch("*.html", html).on("change", browserSync.reload);
	done();
}

function styles (done) {
	gulp.src("sass/style.sass")
		.pipe(wait(200))
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
      overrideBrowserslist: ["last 2 versions"],
      cascade: false
    }))
		.pipe(gulp.dest("build/css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream());
		done();
}

function scripts (done) {
	gulp.src([
		"libs/jquery/jquery.min.js",
		"libs/OwlCarousel2-2.3.4/dist/owl.carousel.min.js",
		"libs/wow/wow.min.js",
		"js/common.js" // Всегда в конце
		])
	.pipe(concat("scripts.min.js"))
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(gulp.dest("js"))
	.pipe(gulp.dest("build/js"));
	done();
}

function html (done) {
  gulp.src("*.html")
		.pipe(gulp.dest("build"));
	done();
}

function copy (done) {
  gulp.src([
    	"fonts/**"
  ],	{ base: "."})
	.pipe(gulp.dest("build"))
	gulp.src([
		"libs/normalize/normalize.css"
	])
	.pipe(gulp.dest("build/css"));
	del('build/img/icons');
	done();
}

function imgmin (done) {
  gulp.src('img/**/*')
  .pipe(imagemin([
    imgCompress({
      loops: 4,
      min: 50,
      max: 80,
      quality: 'high'
    }),
    imagemin.gifsicle(),
    imagemin.optipng(),
    imagemin.svgo()
	]))
	.pipe(gulp.dest('build/img'));
	done();
}

function svgsprite (done) {
	gulp.src('build/img/icons/*.svg')
		.pipe(cheerio({ // удалить все атрибуты fill, style and stroke в фигурах
			run: function($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				done();
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(sprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'  //sprite file name (https://habr.com/ru/sandbox/125438/)
				}
			},
		}))
		.pipe(gulp.dest('build/img'));
	done();
}

gulp.task('imagemin', imgmin); // Оптимизация графики
gulp.task('sprite', svgsprite); // Объединение иконочных спрайтов в один svg-файл
gulp.task('default', gulp.series(copy, html, scripts, styles, serve)); // Запуск сборки