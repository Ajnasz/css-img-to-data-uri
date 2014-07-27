/*jslint node: true*/
/*
 * grunt-css-2-data-uri
 * https://github.com/ajnasz/css-2-data-uri
 *
 * Copyright (c) 2013 Lajos Koszti
 * Licensed under the MIT license.
 */


module.exports = function (grunt) {
    'use strict';

    var build = require('../lib/css_img_2_data_uri'),
        desc = 'Replaces image urls in css files to data uri';

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerTask('css_img_2_data_uri', desc, function () {
        var options = this.options(),
            files = options.files,
            filesLen = files.length,
            done = this.async(),
            doneCounter = 0;

        files.forEach(function (f) {
            build(f.src, function (css, duplicates) {

                if (duplicates.length) {
                    if (options.throwOnDuplicate) {
                        throw new Error('possible duplicated images in the following lines: '
                                        + duplicates.join(', '));
                    } else {
                        grunt.log.error('possible duplicated images in the following lines: '
                                        + duplicates.join(', '));
                    }
                }

                grunt.file.write(f.dest, css);
                // Print a success message.
                grunt.log.writeln('File "' + f.dest + '" created.');
                doneCounter += 1;

                if (doneCounter === filesLen) {
                    grunt.log.writeln("All file written");
                    done();
                }
            });
        });
    });
};
