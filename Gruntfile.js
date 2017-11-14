'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*', 'assemble']});

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var SERVER_PORT = 1339;

    grunt.initConfig({
        pgk: grunt.file.readJSON("package.json"),
        clean: {
            build: {
                src: ['www/*']
            }
        },
        sass: {
            options: {
                style: "expanded",
                noCache: true,
                compass: false
            },
            development: {
                files: {
                    "www/css/styles.css": 'src/scss/styles.scss'
                }
            },
            production: {
                options: {
                    style: "compressed"
                },
                files: {
                    "www/css/styles.css": 'src/scss/styles.scss'
                }
            }
        },
        copy: {
            for_www: {
                files: [
                    {
                        expand: true,
                        cwd: "src/js/",
                        src: ["**"],
                        dest: "www/js"
                    },
                    {
                        expand: true,
                        cwd: "src/assets/",
                        src: ["**"],
                        dest: "www/"
                    }
                ]
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: false
            },
            scss: {
                files: [
                    'src/scss/**',
                    '!src/scss/*.map'
                ],
                tasks: ['sass:development']
            },
            script: {
                files: ['src/js/**'],
                tasks: ['copy:for_www']
            },
            html: {
                files: ['src/html/**'],
                tasks: ['assemble']
            }
        },
        connect: {
            server: {
                options: {
                    port: SERVER_PORT,
                    hostname: '0.0.0.0',
                    base: 'www'
                }
            }
        },
        assemble: {
            options: {
                layoutdir: 'src/html/layouts',
                partials: "src/html/partials/**/*.hbs",
                layout: "base-layout.hbs",
                assets: "src/assets"
            },
            site: {
                expand: true,
                cwd: "src/html/pages",
                src: ['*.hbs'],
                dest: 'www'
            }
        }
    });

    grunt.registerTask("default", ["clean", "sass:development", "copy:for_www", "assemble"]);
    grunt.registerTask("release", ["clean", "sass:production", "copy:for_www", "assemble"]);
    grunt.registerTask("run", ["default", "connect:server", "watch"]);
};