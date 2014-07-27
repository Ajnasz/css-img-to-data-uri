/*jslint node: true*/
(function () {
    'use strict';

    var grunt = require('grunt');

    exports.css_img_2_base64 = {
        setUp: function (done) {
            // setup here if necessary
            done();
        },
        singleLine: function (test) {
            test.expect(1);
            var original = grunt.file.read('test/expect/b.css'),
                expect = grunt.file.read('tmp/b.css');

            test.equal(original, expect);
            test.done();
        },
        multiLine: function (test) {
            test.expect(1);
            var original = grunt.file.read('test/expect/a.css'),
                expect = grunt.file.read('tmp/a.css');

            test.equal(original, expect);
            test.done();
        }
    };
}());
