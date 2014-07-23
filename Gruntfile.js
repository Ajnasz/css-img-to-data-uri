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
                'tasks/*.js',
                '<%= nodeunit.tests %>'
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

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'css_img_2_data_uri', 'nodeunit', 'clean']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jslint',  'test']);

};
