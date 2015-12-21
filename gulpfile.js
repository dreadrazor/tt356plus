var gulp = require('gulp')
  , sass = require('gulp-sass')
  , del = require('del')
  , argv = require('yargs').argv
  , shell = require('gulp-shell')
  , watch = require('gulp-watch')
  , concat = require('gulp-concat')
  , jshint = require('gulp-jshint')
  , angularProtractor = require('gulp-angular-protractor');

gulp.task('clean-tmp', function(){
    return del(['tmp']);
});

gulp.task('clean-db', function(){
    return del(['database']);
});

gulp.task('clean',['clean-tmp', 'clean-db']);

gulp.task('copy-libs-fonts', function(){
  return gulp.src([
            'node_modules/bootstrap/fonts/**/*'
          ])
         .pipe(gulp.dest('tmp/public/static/fonts'));
});

gulp.task('copy-libs-css', function(){
  return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
            , 'node_modules/animate.css/animate.min.css'
            , 'node_modules/pace/themes/purple/pace-theme-barber-shop.css'
          ])
          .pipe(concat('libs.css'))
          .pipe(gulp.dest('tmp/public/static/css'));
});

gulp.task('copy-libs-js', function(){
  return gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
            , 'node_modules/bootstrap/dist/js/bootstrap.min.js'
            , 'node_modules/pace/pace.min.js'
            , 'node_modules/angular/angular.min.js'
            , 'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js'
            , 'node_modules/angular-cookies/angular-cookies.min.js',
            , 'node_modules/angular-websocket/angular-websocket.min.js',
            , 'node_modules/angular-animate/angular-animate.min.js',
            , 'node_modules/angular-route/angular-route.min.js',
            , 'node_modules/restangular/dist/restangular.min.js',
            , 'node_modules/async/dist/async.min.js'
            , 'node_modules/underscore/underscore-min.js'
          ])
          .pipe(concat('libs.js'))
          .pipe(gulp.dest('tmp/public/static/js'));
});

gulp.task('assets', function(){
  return gulp.src(['public/static/assets/**/*'])
         .pipe(gulp.dest('tmp/public/static/assets'));
});

gulp.task('partials', function(){
  return gulp.src(['public/static/partials/**/*'])
         .pipe(gulp.dest('tmp/public/static/partials'));
});

gulp.task('scss', function () {
  return gulp.src('public/static/scss/themes/*.scss')
         .pipe(sass())
         .pipe(gulp.dest('tmp/public/static/css/themes'));
});

gulp.task('js', function(){
  return gulp.src([
            'public/static/config.js'
            , 'public/static/js/**/*.js'
         ])
         .pipe(concat('dist.js'))
         .pipe(gulp.dest('tmp/public/static/js'));
});

gulp.task('templates', function(){
  return gulp.src('public/templates/**/*')
         .pipe(gulp.dest('tmp/public/templates'));
});

var howmany = argv.howmany || 5;
var divisions = argv.divisions || 2;
var playersPerTeam = argv.playersPerTeam || 5;
gulp.task('populate', ['clean-db'], shell.task([
  'node ./populate.js --teams='+howmany+' --divisions='+divisions+' --playersPerTeam='+playersPerTeam
], {quiet: false}));

gulp.task('lint', function() {
  return gulp.src([
        './*.js'
        , 'public/static/**/*.js'
     ])
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: 'docs/jshint-output.html',
      createMissingFolders : false
    }));
});

gulp.task('docs', function(){
  //todo
});

gulp.task('test', ['build'], function(callback) {
    gulp.src(['tests/frontend/**/*.js'])
        .pipe(angularProtractor({
            'configFile': 'tests/conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});

gulp.task('watch', ['quick'], function () {
    watch([
            'public/static/**/*'
            , 'public/templates/**/*.jade'
          ], function(){
      gulp.start('quick');
    });
});

gulp.task('copy', ['templates', 'partials', 'assets', 'copy-libs-fonts', 'copy-libs-css', 'copy-libs-js'], function() {});
gulp.task('install', ['populate', 'docs', 'build'], function() {});
gulp.task('build', ['lint', 'copy', 'scss', 'js'], function() {});
gulp.task('quick', ['lint', 'templates', 'partials', 'assets', 'scss', 'js'], function() {});
gulp.task('default', ['build'], function() {});
