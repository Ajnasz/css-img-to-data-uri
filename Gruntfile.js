/*jslint node: true*/
/*
 * grunt-css-img-2-data-uri
 * https://github.com/ajnasz/css-img-2-data-uri
 *
 * Copyright (c) 2013 Lajos Koszti
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jslint: {
            files: [
                'Gruntfile.js',
                'tasks/*.js'
            ]
        },

        css_img_2_data_uri: {
            options: {
                files: [
                    {
                        src: 'test/css/a.css',
                        dest: 'tmp/a.css'
                    },
                    {
                        src: 'test/css/b.css',
                        dest: 'tmp/b.css'
                    }
                ]
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        execute: {
            testLib: ['test/test-lib.js']
        }
    });

    grunt.loadNpmTasks('grunt-release');

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-execute');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'execute', 'css_img_2_data_uri', 'clean']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jslint',  'test']);

};
