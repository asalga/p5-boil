'use strict';

module.exports = function(grunt) {

  const LivereloadPort = 35729;
  const ServeStatic = require('serve-static');

  // directories
  const dist = 'dist';
  const src = 'src';
  const tmp = '.tmp';
  const app = 'app';
  const basePath = 'src/sketches/';

  let config = {
    sketchTarget: `${basePath}/1`
  };

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    /** 
     * Delete all working directories and contents
     */
    clean: {
      build: {
        src: [
          `${app}`,
          `${dist}`,
          `${tmp}`
        ]
      }
    },


    /**
     * https://github.com/jsoverson/grunt-open
     *
     * Opens the web server in the browser
     */
    open: {
      server: {
        path: `http://localhost:<%= connect.options.port %>/`
      }
    },


    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [
              ServeStatic(`${app}`),
              connect().use(`${app}`, ServeStatic(`${app}`)),
              ServeStatic(`${app}`)
            ]
          }
        }
      }
    },


    /**
     *
     */
    copy: {
      dev: {
        files: [
          // MARKUP
          {
            expand: true,
            cwd: `${src}/`,
            src: 'index.html',
            dest: `${app}/`,
            filter: 'isFile'
          },
          // STYLE
          {
            expand: true,
            cwd: `${src}/css/`,
            src: '*.css',
            dest: `${app}/`,
            filter: 'isFile'
          },
          // DATA
          {
            expand: true,
            cwd: `${src}/sketches/1/data`,
            src: '**/*.json',
            dest: `${app}/data/`,
            filter: 'isFile'
          },

          // // JS
          // {
          //   expand: true,
          //   cwd: `${src}/sketches/1/`,
          //   src: '*.js',
          //   dest: `${app}/`,
          //   filter: 'isFile'
          // },

          // IMAGES
          {
            expand: true,
            flatten: false,
            cwd: `${src}/sketches/1/data`,
            src: ['**/*.{jpg,jpeg,png,gif,svg}'],
            dest: `${app}/data/`,
            filter: 'isFile'
          }
        ]
      }
    },

    /**
     * 
     */
    browserify: {
      dev: {
        files: [{
          dest: `${app}/dev_bundle.js`,
          src: `${config.sketchTarget}/index.js`
        }],
        options: {
          mangle: false
        }
      }
    },


    /**
     * https://github.com/gruntjs/grunt-contrib-jshint
     * options inside .jshintrc file
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      files: [
        `${src}/js/**/*.js`,
        `${src}/json/**/*.js`,
        `!${src}/js/vendor/**/*.js`
      ]
    },


    /**
     * https://github.com/gruntjs/grunt-contrib-watch
     *
     */
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      scripts_dev: {
        files: [
          `${config.sketchTarget}/*.js`
        ],
        tasks: [
          'copy:dev',
          'browserify:dev'
        ],
        options: {
          livereload: true
        }
      },
      // IMAGES
      images: {
        files: [
          `${config.sketchTarget}/data/**/*.{png,jpg,jpeg,gif,svg}`
        ],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      },
      // DATA
      data: {
        files: [
          `${config.sketchTarget}/data/**/*.json`
        ],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      },
      // STYLE
      style: {
        files: [
          `src/css/style.css`
        ],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      },
      // MARKUP
      markup: {
        files: [
          `src/index.html`
        ],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    // STATIC ASSETS
    'copy:dev',

    // JS
    //jshint
    'browserify:dev',

    // LIVE UPDATES / PREVIEW
    'connect:livereload',
    'open',
    'watch'
  ]);
};