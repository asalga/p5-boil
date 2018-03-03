'use strict';


/*
 */
module.exports = function(grunt) {

  const LivereloadPort = 35729;
  const ServeStatic = require('serve-static');

  // for printing to console
  const Colors = {
    red: `"\x1B[91m"`,
    pink: `"\x1B[35m"`,
    default: `"\x1B[39m"`
  };

  // directories
  const dst = 'dst';
  const src = 'src';
  const tmp = '.tmp';
  const app = 'app';
  const basePath = 'src/sketches/';

  let config = {
    // load by default if we can't find the target
    target: `${basePath}/examples/p5-require`,
    library: 'p5js-0.6',
    bundleMethod: 'concat'
  };

  /*
   */
  try {
    let cfg = grunt.file.readJSON('config.json');
    let target = cfg.targets[cfg.id];

    config.target = `${basePath}` + target.dir;
    config.bundleMethod = target.bundleMethod;
    config.library = target.library;

    grunt.log.writeln('loading:' + cfg.id);
  } catch (e) {
    grunt.log.writeln(e);
  }

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    /** 
     * Delete all working directories and contents
     */
    clean: {
      build: {
        src: [
          `${app}`,
          `${dst}`,
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
    concat: {
      dev: {
        dest: `${app}/index.js`,
        src: `${config.target}/*.js`
      },
      options: {

      }
    },

    /**
     *
     */
    copy: {
      dev: {
        files: [
          // MARKUP
          // {
          //   expand: true,
          //   cwd: `${src}/`,
          //   src: 'index.html',
          //   dest: `${app}/`,
          //   filter: 'isFile'
          // },
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
            cwd: `${config.target}/data`,
            src: '**/*.json',
            dest: `${app}/data/`,
            filter: 'isFile'
          },

          // JS
          {
            expand: true,
            cwd: `${config.target}/data`,
            src: '*.js',
            dest: `${app}/`,
            filter: 'isFile'
          },

          // AUDIO
          {
            expand: true,
            flatten: false,
            cwd: `${config.target}/data/audio`,
            src: ['**/*.{mp3,ogg}'],
            dest: `${app}/data/audio`,
            filter: 'isFile'
          },

          // IMAGES
          {
            expand: true,
            flatten: false,
            cwd: `${config.target}/data/`,
            src: ['**/*.{jpg,jpeg,png,gif,svg}'],
            dest: `${app}/data/`,
            filter: 'isFile'
          },
          
          // SHADERS
          {
            expand: true,
            flatten: false,
            cwd: `${config.target}/data/`,
            src: ['**/*.glsl'],
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
          src: `${config.target}/index.js`
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
     *  https://www.npmjs.com/package/grunt-processhtml
     *
     *  process <!-- build:include --> directives
     */
    processhtml: {
      dev: {
        options: {
          process: true,
          data: config,
          strip: true,
        },
        files: [{
          src: `${src}/index.html`,
          dest: `${app}/index.html`
        }]
      }
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
          `${config.target}/**/*.js`
        ],
        tasks: [
          'copy:dev',
          'bundle'
          //'browserify:dev'
        ],
        options: {
          livereload: true
        }
      },
      // AUDIO
      audio: {
        files: [
          `${config.target}/data/**/*.{mp3,ogg}`
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
          `${config.target}/data/**/*.{png,jpg,jpeg,gif,svg}`
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
          `${config.target}/data/**/*.{json,glsl}`
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
          // 'copy:dev'
          'processhtml'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  /*
    To bundle or not to bundle
  */
  grunt.registerTask('bundle', function() {

    if (`${config.bundleMethod}` === 'browserify') {
      grunt.task.run('browserify:dev');
    }
    //
    else if (`${config.bundleMethod}` === 'concat') {
      grunt.task.run('concat');
    }
    //
    else if (`${config.bundleMethod}` === 'module') {
      grunt.task.run('copy');
    }
  });

  grunt.registerTask('default', [
    // STATIC ASSETS
    'copy:dev',

    // JS
    'bundle',
    // jshint:dev

    // HTML
    'processhtml',

    // LIVE UPDATES / PREVIEW
    'connect:livereload',
    'open',
    'watch'
  ]);
};