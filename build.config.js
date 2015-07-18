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
  compile_dir:  'bin',

  /*
   * Current CSS sub-theme (for many SASS versions of site template)
   */
  project_subtheme_name: 'official',

  app_files: {
    js:       [ 'src/js/**/*.js', '!src/js/**/*.spec.js', '!src/assets/**/*.js' ],
    coffee:   [ 'src/coffee/**/*.coffee', '!src/coffee/**/*.spec.coffee' ],
    fonts:    [ 'src/fonts/**/*' ], // Additional fonts that aren't store into vendor libraries
    html:     [ 'src/templates/**/*.html' ]
  },

  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery.easing/js/jquery.easing.js',
      'vendor/lodash/lodash.js',
      'vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js',
    ],
    css: [
    ],
    fonts: [
      'vendor/font-awesome-sass/assets/fonts/font-awesome/*',
      'vendor/bootstrap-sass-official/assets/fonts/bootstrap/*'
    ],
    assets: [
    ]
  }
};
