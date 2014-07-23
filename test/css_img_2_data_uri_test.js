/*jslint node: true*/
(function () {
    'use strict';

    var grunt = require('grunt');

        /*
        ======== A Handy Little Nodeunit Reference ========
        https://github.com/caolan/nodeunit

        Test methods:
        test.expect(numAssertions)
        test.done()
        Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
        */

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
