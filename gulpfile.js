
// let project_folder="dist";
let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/images/",
        fonts: project_folder + "/fonts/",
        sprite: project_folder + "/images/symbols",          
    },
    src: {
        html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",       
        js: source_folder + "/js/*.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
        sprite: source_folder + "/sprite.svg",      
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.+{scss,css}",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        sprite: source_folder + "/sprite.svg",   
        grid: source_folder + "/smartgrid.js"     
    },
    clean: "./" + project_folder + "/"
};

let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    babel = require("gulp-babel"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    svgSprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    concat = require("gulp-concat"),
    smartgrid = require('smart-grid');
    // sourcemaps = require('gulp-sourcemaps'),

let fs = require('fs');

function style(params) {
    return gulp
    .src([        
        "node_modules/normalize.css/normalize.css",
        // "node_modules/air-datepicker/dist/css/datepicker.min.css"
    ])    
    .pipe(concat("libs.min.css")) 
    .pipe(clean_css())   
    .pipe(gulp.dest(project_folder + '/css'))  
}

function script(params) {
    return gulp
       .src([
          "node_modules/jquery/dist/jquery.js",
          "node_modules/focus-visible/dist/focus-visible.min.js", 
        //   "node_modules/air-datepicker/dist/js/datepicker.min.js"           
       ]) 
       .pipe(babel({
           "plugins": ["@babel/plugin-proposal-class-properties"]
       }))
       .pipe(
            uglify()
        )
       .pipe(concat("libs.min.js"))   
       .pipe(gulp.dest(project_folder + '/js'))   
}

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
} 

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)   
        // .pipe(sourcemaps.init())  
        .pipe(
            scss({
               outputStyle: "expanded"
            }) 
        )
        .pipe(
            group_media()
        )    
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss({webpClass: '.webp',noWebpClass: '.no-webp'}))    
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        // .pipe(sourcemaps.write('./'))  
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)        
        // .pipe(fileinclude())
        .pipe(babel({
            "plugins": ["@babel/plugin-proposal-class-properties"]
        }))
        .pipe(concat("main.js"))
        .pipe(dest(path.build.js))

        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )     
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)  
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function sprite() {
    return src(path.src.sprite)
        .pipe(dest(path.build.sprite))
        .pipe(browsersync.stream());
}


function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

// запуск задачи вручную gulp otf2ttf 
gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
})

// запуск задачи вручную gulp svgSprite
gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg", // sprite file name
                    // example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
})


function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.grid], grid);
    gulp.watch([path.watch.sprite], sprite);
}

function clean() {
    return del(path.clean);
}

function grid(done){
    delete require.cache[require.resolve('./#src/smartgrid.js')];
    let settings = require('./#src/smartgrid.js');

    smartgrid("#src/scss/", settings);
    done();
}

gulp.task('grid',grid)

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, style, script, grid, sprite), fontsStyle);
let watch = gulp.parallel( build, watchFiles, browserSync);

exports.sprite = sprite;
exports.grid = grid;
exports.style = style;
exports.script = script;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;