/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir:    'build',
  tmp_dir:      'tmp',

  /**
   * Current CSS sub-theme (for many SASS versions of site template)
   */
  project_theme_name: 'official',

  app_files: {
    unitjs: [ 'gulpfile.js', 'build.config.js' , 'gulp_src/**/*.js' ],
    js: [
      'src/js/**/*.js',
      '!src/js/**/*.spec.js'
      // 'src/plugins/**/*.js',
      // '!src/plugins/**/*.spec.js'
    ],
    fonts: [ 'src/fonts/**/*' ], // Additional fonts that aren't store into vendor libraries
    // images: [
      // 'src/plugins/**/*.png',
      // 'src/plugins/**/*.jpg'
    // ],
    // css: [ 'src/plugins/**/*.css' ], // all additional css from plugins
    html: [ 'src/html/**' ],
    plugins: [ 'src/plugins/tipuesearch/**' ]
  },

  vendor_files: {
    js: [
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
      'node_modules/jquery.easing/jquery.easing.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/anchor-js/anchor.js',
      'node_modules/lodash/lodash.js'
    ],
    css: [
    ],
    fonts: [
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
      'node_modules/font-awesome/fonts/*'
    ]
  }
};
