var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
// var sourcemaps = require('gulp-sourcemaps');
var connectPhp = require('gulp-connect-php'); // 用來連結php的
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;



//path 路徑
var web = {
    html: [
        'dev/*.html',
        'dev/**/*.html'
    ],
    sass: [
        'dev/sass/*.scss',
        'dev/sass/**/*.scss',
    ],
    js: [
        'dev/js/*.js',
        'dev/js/**/*.js',
    ],
    img: [
        'dev/images/*.*',
        'dev/images/**/*.*',
    ],
    font: [
        'dev/font/*.*', 
         'dev/font/**/*.*'
    ], 
    php: [
        'dev/*.php',
        'dev/php/*.*',
        'dev/php/**/*.*'
    ]
}

var options = {
    base: './dest', // 檔案位置
    debug: true, 
    bin: '/Applications/MAMP/bin/php/php7.4.1/bin/php', // php執行檔的路徑
    ini: '/Applications/MAMP/bin/php/php7.4.1/conf/php.ini', // php的ini檔的路徑
    port: 8080,  // 自行定義端口
};

//流程
gulp.task('concatjs', function () {
    gulp.src(web.js).pipe(gulp.dest('dest/js'));
});

gulp.task('concatphp', function () {
    gulp.src(web.php).pipe(gulp.dest('dest/php'));
});

gulp.task('img', function () {
    gulp.src(web.img).pipe(gulp.dest('dest/images'));
});

gulp.task('font', function () {
    gulp.src(web.font).pipe(gulp.dest('dest/font'));
});

//任務串連

gulp.task('concatcss', ['sass'], function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('dest/css'));
});

gulp.task('lint', function() {
    return gulp.src('./dev/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });


gulp.task('sass', function () {
    return gulp.src(['dev/sass/*.scss', 'dev/sass/**/*.scss'])
    //    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS({compatibility: 'ie9'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dest/css/'));
});

//打包html
gulp.task('fileinclude', function () {
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest'));
});

//壓縮圖片
gulp.task('mini_img', function () {
    return  gulp.src('dev/images/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dest/mini_images/'))
  });

// gulp.task('watch' , function(){
//   gulp.watch(['sass/*.scss' , 'sass/**/*.scss'], ['concatcss']);
//   gulp.watch('js/*.js', ['concatjs']);
//   gulp.watch(['*.html' , '**/*.html'],  ['fileinclude']);
// });

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./dest",
            proxy: 'localhost:8080', // 網址路徑必須跟php端口一樣
            port:3000,
            watch: true,
            index: "cms_login.html"
        }
    });
    connectPhp.server(options); // 啟動
    gulp.watch(web.html, ['fileinclude']).on('change', reload);
    gulp.watch(web.sass, ['sass']).on('change', reload);
    gulp.watch(web.js, ['concatjs']).on('change', reload);
    // gulp.watch(web.js, ['lint']).on('change', reload);
    gulp.watch(web.img, ['img']).on('change', reload);
    gulp.watch(web.font, ['font']).on('change', reload);
    gulp.watch(web.php, ['concatphp']).on('change', reload);
});