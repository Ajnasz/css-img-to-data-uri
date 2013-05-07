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

    var fs = require('fs'),
        path = require('path'),
        mime = require('mime'),
        urlRegex = /url\(['"]?([0-9a-zA-Z.\/\-]+)['"]?\)/,
        desc;

    /**
    * Gets the path of the image from a line of css
    * @method getImagePath
    * @param {String} line The CSS line
    * @return {String|null} If no match found will return nuil, otherwise the
    * image path.
    */
    function getImagePath(line, filePath) {
        var match = line.match(urlRegex);

        if (match) {
            return path.dirname(filePath) + '/' + match[1];
        }
        return null;
    }

    /**
    * Calculates md5 for an image
    * @method getMD5ForImage
    * @param {String} path Path of the file
    * @param {Function} callback Callback function which will be called with the
    * file content encoded to base64
    * @async
    */
    function getMD5ForImage(path, callback) {
        fs.readFile(path, function (err, data) {

            if (err) {
                throw err;
            }

            callback(data.toString('base64'));
        });
    }

    /**
    * Replaces the image url with data uri
    * @method replaceLine
    * @param {String} line The line where the url string could be found
    * @param {String} base64 The base64 encoded image
    */
    function replaceLine(line, base64, mimeType) {
        return line.replace(urlRegex, "url('data:" + mimeType + ";base64," + base64 + "')");
    }

    function checkFile(file, cb) {
        fs.stat(file, function (err, stats) {

            if (err) {
                throw err;
            }

            if (!stats.isFile()) {
                throw new TypeError(file + ' is not a file');
            }

            cb();
        });
    }

    function processLine(line, filePath, cb) {

        if (line.indexOf('url(') > -1 && line.indexOf('/*no-base64') === -1) {
            var imagePath = getImagePath(line, filePath);

            if (imagePath) {
                getMD5ForImage(imagePath, function (base64) {
                    cb(replaceLine(line, base64, mime.lookup(imagePath)));
                });
            } else {
                cb(line);
            }
        } else {
            cb(line);
        }
    }

    function doStuff(data, filePath, cb) {
        var lines = data.toString('utf-8').split('\n'),
            outputLines = [],
            processedLines = 0;

        function finishLineProcess() {
            processedLines += 1;

            if (processedLines === lines.length) {
                cb(outputLines.join('\n'));
            }
        }

        lines.forEach(function (line, index) {
            processLine(line, filePath, function (line) {
                outputLines[index] = line;
                finishLineProcess();
            });
        });
    }

    function build(file, cb) {
        var filePath = path.resolve(file);

        if (!filePath) {
            throw new Error('No file defined');
        }

        checkFile(filePath, function () {
            fs.readFile(filePath, function (err, data) {

                if (err) {
                    throw err;
                }
                doStuff(data, filePath, cb);
            });
        });
    }


    desc = 'Replaces image urls in css files to data uri';

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerTask('css_img_2_data_uri', desc, function () {
        var files = this.options().files,
            filesLen = files.length,
            done = this.async(),
            doneCounter = 0;

        files.forEach(function (f) {
            build(f.src, function (css) {
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
