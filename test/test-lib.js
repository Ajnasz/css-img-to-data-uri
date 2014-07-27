var css_img_2_data_uri = require('../lib/css_img_2_data_uri');
var assert = require('assert');
var fs = require('fs');

var util = require('util');

var test = (function () {
	var tests = [];

	function register(name, item) {
		tests.push({
			name: name,
			test: item
		});
	}

	function run() {
		var item = tests.shift();

		util.print(item.name);

		item.test(function () {
			util.puts(' ..done');

			if (tests.length) {
				run();
			}
		});
	}

	return {
		register: register,
		run: run
	};
}());

test.register('test multiline css processing', function (done) {
	css_img_2_data_uri(__dirname + '/css/a.css', function (txt, duplicates) {
		fs.readFile(__dirname + '/expect/a.css', function (err, data) {
			if (err) {
				throw err;
			};

			assert.deepEqual(data.toString('utf8'), txt);
			done();
		});
	});
});

test.register('test oneliner css processing', function (done) {
	css_img_2_data_uri(__dirname + '/css/b.css', function (txt, duplicates) {
		fs.readFile(__dirname + '/expect/b.css', function (err, data) {
			if (err) {
				throw err;
			};

			assert.deepEqual(data.toString('utf8'), txt);
			done();
		});
	});
});

test.register('test finding duplicates', function (done) {
	css_img_2_data_uri(__dirname + '/css/c.css', function (txt, duplicates) {
		assert.deepEqual(typeof duplicates, 'object');
		assert.deepEqual(duplicates.length, 1);
		assert.deepEqual(duplicates[0], 7);
		done();
	});
});

test.run();
