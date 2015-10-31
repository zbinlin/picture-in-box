"use strict";

import path from "path";

import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
//import rename from "gulp-rename";
import babel from "gulp-babel";
import sass from "gulp-sass";
import concat from "gulp-concat";
import clean from "gulp-clean";
import plumber from "gulp-plumber";

import browserSync from "browser-sync";

const FILES_DST = "./dist";
const IGNORE_FILES = "!**/*~";
const HTML_FILES_SRC = [IGNORE_FILES, "./src/*.html"];
const HTML_FILES_DST = FILES_DST;
const CSS_FILE_SRC = [IGNORE_FILES, "./src/*.scss"];
const CSS_FILE_DST = FILES_DST;
const JS_FILES_SRC = [IGNORE_FILES, "./src/*.js*"];
const JS_FILES_DST = FILES_DST;
const WATCH_FILES = [IGNORE_FILES, "./src/**/*.*"];
const WATCH_IGNORE_FILES = IGNORE_FILES;


gulp.task("clean", function () {
    return gulp.src(path.join(FILES_DST, "*"), {read: false})
        .pipe(clean());
});

gulp.task("html", function () {
    return gulp.src(HTML_FILES_SRC)
        .pipe(gulp.dest(HTML_FILES_DST));
});

gulp.task("css", function () {
    return gulp.src(CSS_FILE_SRC)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(CSS_FILE_DST));
});

gulp.task("js", function () {
    return gulp.src(JS_FILES_SRC)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            // output: path.join(JS_FILES_DST, "bundle.js")
            presets: ["react", "es2015"],
            plugins: ["transform-es2015-modules-umd"],
            babelrc: false
        }))
        .pipe(concat("bundle.js"))
        .pipe(sourcemaps.write("."))
        //.pipe(rename(function (path) {
        //    if (/\.jsx$/i.test(path.extname)) {
        //        path.extname = ".js";
        //    }
        //    return path;
        //}))
        .pipe(gulp.dest(JS_FILES_DST));
});

gulp.task("default", ["html", "css", "js"]);

gulp.task("browser-sync", function () {
    browserSync.init({
        port: 3080,
        server: {
            baseDir: FILES_DST
        }
    });
});

gulp.task("watch", ["browser-sync"], function () {
    return gulp.watch([WATCH_FILES, WATCH_IGNORE_FILES], ["default"]);
});
