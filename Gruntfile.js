'use strict';

module.exports = function(grunt) {

  const LivereloadPort = 35729;
  const ServeStatic = require('serve-static');

  let page = grunt.option('page') || 'src/index.html';
  const dist = 'dist';
  const src = 'src';
  const tmp = '.tmp';
  const app = `app`;

  // const LivereloadPort = 35729;
  // const ServeStatic = require('serve-static');


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    project: {
      src: 'src'
    },

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
          // JS
          {
            expand: true,
            cwd: `${src}/sketches/0/`,
            src: '**/*.js',
            dest: `${app}/`,
            filter: 'isFile'
          },
          // IMAGES
          {
            expand: true,
            flatten: true,
            cwd: `src/sketches/`,
            src: ['**/*.{jpg,jpeg,png,gif,svg}'],
            dest: `${app}/data/`,
            filter: 'isFile'
          }
        ]
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
        spawn: false,
        livereload: true
      },
      scripts_dev: {
        files: [
          `${src}/sketches/0/*.js`
        ],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      },
      // IMAGES
      images: {
        files: [
          `src/sketches/**/*.png`
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
          //'htmlhint:dev'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', [

    'copy:dev',

    // LIVE UPDATES / PREVIEW
    'connect:livereload',
    'open',
    'watch'
  ]);
};