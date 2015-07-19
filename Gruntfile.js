module.exports = function(grunt) {

  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './build.config.js' );

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner:
        '/**\n' +
        ' * Theme Name: <%= pkg.fullName %>\n' +
        ' * Theme URI: <%= pkg.homepage %>\n' +
        ' * Author: <%= pkg.author.name %>\n' +
        ' * Author URI: <%= pkg.author.email %>\n' +
        ' * Description: <%= pkg.description %>\n' +
        ' * Version: <%= pkg.version %>\n' +
        ' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * License: <%= pkg.licenses.type %>\n' +
        ' * License URI: <%= pkg.licenses.url %>\n' +
        ' * Tags: <%= pkg.tags %>\n' +
        ' * Text Domain: <%= pkg.fullName %>\n' +
        ' */\n'
    },

    /**
     * Creates a changelog on a new version.
     */
    usebanner: {
      build: {
        options: {
          position:   'top',
          banner:     '<%= meta.banner %>',
          linebreak:  true
        },
        files: {
          src: [
            '<%= build_dir %>/static/*.js',
            '<%= build_dir %>/static/*.css',
          ]
        }
      }
    },

    /**
     * Creates banner to css, js, php files.
     */
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        template: 'changelog.tpl'
      }
    },

    /**
     * The directories to delete when `grunt clean` is executed.
     */
    clean: [
      '<%= build_dir %>',
      '<%= tmp_dir %>',
      '<%= compile_dir %>'
    ],

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * `build_dir`, and then to copy the assets to `compile_dir`.
     */
    copy: {
      build_html5shiv: {
        files: [
          {
            src: [ 'vendor/html5shiv/dist/html5shiv.min.js' ],
            dest: '<%= build_dir %>/static/',
            cwd: '.',
            expand: true,
            flatten: true,
          }
       ]
      },
      build_fonts: {
        files: [
          {
            src: [
              '<%= vendor_files.fonts %>',
              '<%= app_files.fonts %>'
            ],
            dest: '<%= build_dir %>/static/fonts/',
            cwd: '.',
            expand: true,
            flatten: true,
          }
       ]
      },
      build_images: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/static/images/',
            cwd: 'src/images',
            expand: true
          }
        ]
      },
      build_html: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/templates/',
            cwd: 'src/templates/<%= project_subtheme_name %>',
            expand: true
          }
        ]
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `compile_js` target is the concatenation of our application source
       * code and all specified vendor source code into a single file.
       */
      build_js: {
        options: {},
        src: [
          '<%= vendor_files.js %>',
          '<%= app_files.js %>'
        ],
        dest: '<%= build_dir %>/static/js/production.js'
      },

      build_css: {
        options: {},
        src: [
          '<%= tmp_dir %>/css/*.css',
          '<%= vendor_files.css %>',
        ],
        dest: '<%= build_dir %>/static/css/style.css'
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      options: {
        mangle: false,
      },
      build: {
        files: {
          '<%= concat.build_js.dest %>': '<%= concat.build_js.dest %>'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= build_dir %>/static/css/style.css': '<%= build_dir %>/static/css/style.css'
        }
      }
    },

    /**
     * Bootstrap SASS compilation task
     */
    sass: {
      build: {
        options: {
          style:   'expanded',
          trace:   true,
          compass: false
        },
        files: {
          '<%= tmp_dir %>/css/style.css': 'src/sass/<%= project_subtheme_name %>/main.sass'
        }
      }
    },

    /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `src/`.
     */
    jshint: {
      src: [
        '<%= app_files.js %>'
      ],
      unitjs: [
        '<%= app_files.unitjs %>'
      ],
      options: {
        curly:  true,
        immed:  true,
        newcap: true,
        noarg:  true,
        sub:    true,
        boss:   true,
        eqnull: true
      }
    },

    /**
     * Compress whole build folder to ready to go template installer
     */
    compress: {
      build: {
        options: {
          mode: 'zip',
          archive: 'bin/<%= pkg.name %>_v<%= pkg.version %>_<%= grunt.template.today("yyyy-mm-dd") %>.zip',
        },
        expand: true,
        cwd: '<%= build_dir %>/',
        src: ['**'],
        dest: '<%= pkg.name %>/',
      }
    },

    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal. Set it
     * and forget it, as Ron Popeil used to tell us.
     *
     * But we don't need the same thing to happen for all the files.
     */
    delta: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: 789789,
      },

      /**
       * When the Gruntfile changes, we just want to lint it. In fact, when
       * your Gruntfile changes, it will automatically be reloaded!
       */
      unitjs: {
        files: [ '<%= app_files.unitjs %>' ],
        tasks: [
          'jshint:unitjs',
          'build',
          'compress:build',
        ]
      },

      /**
       * When our template source files change, we want to copy them to build
       */
      html: {
        files: [ 'src/templates/<%= project_subtheme_name =>/**/*.html' ],
        tasks: [
          'copy:build_html',
          'compress:build',
        ]
      },

      /**
       * When images source change, we wnat to copy them
       */
      images: {
        files: [ 'src/images/**/*' ],
        tasks: [
          'copy:build_images',
          'compress:build',
        ]
      },

      /**
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
       */
      js: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: [
          'jshint:src',
          'concat:build_js',
          'uglify:build',
          'compress:build',
        ]
      },

      /**
       * When the CSS files change, we need to compile and minify them.
       */
      sass: {
        files: [
          'src/**/*.sass',
          'src/**/*.scss'
        ],
        tasks: [
          'sass:build',
          'concat:build_css',
          'cssmin',
          'compress:build',
        ]
      },
    }

  }; /* end taskConfig*/

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'delta' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'clean',                     // clean folders `build/` and `bin/`
    'sass:build',                // compile src/less/bootstrap-main.less
    'concat:build_css',          // concat vendors css with user css
    'cssmin',                    // minify compiled CSS file

    'concat:build_js',           // compile vendor_files.js to build/js i łączy ze sobą w prod.js
    'uglify',                    // minified js/prod.js

    'copy:build_fonts',          // compile vendor_file.fonts to build/fonts
    'copy:build_html',           // copy jinja2 html templates
    'copy:build_images',         // copy images folder
    'copy:build_html5shiv',      // copy js file compatibiliy with older browsers
    // 'usebanner:build'            // adding banner to CSS and JS files
  ]);

  grunt.registerTask( 'zip', [ 'build', 'compress:build' ]);

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build' ] );

};
