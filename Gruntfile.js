'use strict';

module.exports = function(grunt) {

    const LivereloadPort = 35729;
    const ServeStatic = require('serve-static');

    let page = grunt.option('page') || 'index.html';
    const dist = 'dist';
    const src = 'src';
    const tmp = '.tmp';
    const app = `app`;

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
                    // JS
                    {
                        expand: true,
                        cwd: `${src}/js`,
                        src: '**/*.js',
                        dest: `${app}/`,
                        filter: 'isFile'
                    },
                    // IMAGES
                    {
                        expand: true,
                        flatten: true,
                        cwd: `/raw-images/`,
                        //'<%= project.imgLocal %>/',
                        src: ['**/*.{jpg,jpeg,png,gif,svg}'],
                        dest: `${app}/medias/`,
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
                   `${src}/js/*.js`
                 ],
                tasks: [
                 'copy:dev'
                ],
                options: {
                  livereload: true
                }
            },
            markup: {
                files: [
                    `index.html`
                ],
                tasks: [
                    'htmlhint:dev'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });


    grunt.registerTask('default', [
        // JS
        // 'jshint',
        //'browserify:dev',
        //'uglify:dev',

        // LIVE UPDATES / PREVIEW
        'copy:dev',
        'connect:livereload',
        'open',
        'watch'
    ]);
};