var config 	  = require('../config.js'),
    gulp 	    = require('gulp');

gulp.task('watch', function() {

    gulp.watch( config.iconfont.source + '/**/*.svg', ['iconfont', 'scss'] );
    gulp.watch( config.sprite.source + '/**/*.{jpg,gif,png}', ['sprite', 'scss'] );
    gulp.watch( config.images.source + '/**/*', ['images', 'scss'] );

    gulp.watch( 
      [
        config.scss.source + '/**/*.scss',
        '!' + config.scss.source + '/2.tools/_iconfont.scss',
        '!' + config.scss.source + '/2.tools/_sprite.scss'
      ],

      ['scss'] 
    );

    gulp.watch( config.javascript.source + '/**/*.js', ['javascript'] );
    gulp.watch( config.jade.source + '/**/*.jade', ['jade'] );

});
