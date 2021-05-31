const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
//style paths
const sassFiles = "./sass/**/*.scss",
	cssDest = "./css/";
// compile scss into css
function style() {
	return gulp
		.src(sassFiles)
		.pipe(sass().on("error", sass.logError))
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(gulp.dest(cssDest))
		.pipe(browserSync.stream());
}

function minify() {
	return gulp.src("./js/main.js").pipe(uglify()).pipe(gulp.dest("./js/"));
}
function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch(sassFiles, style);
	gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.minify = minify;
exports.style = style;
exports.watch = watch;
