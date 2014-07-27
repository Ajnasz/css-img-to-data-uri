
var fs = require('fs'),
path = require('path'),
mime = require('mime'),
urlRegex = 'url\\([\'"]?([0-9a-zA-Z./_-]+)[\'"]?\\)',
desc;

/**
 * Gets the path of the image from a line of css
 * @method getImagePath
 * @param {String} line The CSS line
 * @return {String|null} If no match found will return nuil, otherwise the
 * image path.
 */
function getImagePath(line, filePath) {
	var regEx = new RegExp(urlRegex, 'g'),
		output = [],
		m;

m = regEx.exec(line);
while (m) {
	output.push({
		match: m[1],
		path: path.dirname(filePath) + '/' + m[1]
	});
	m = regEx.exec(line);
}

return output.length ? output : null;
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
function replaceLine(line, m, base64, mimeType) {
	return line.replace(m, "url('data:" + mimeType + ";base64," + base64 + "')");
	// return line.replace(new RegExp(urlRegex, 'g'), "url('data:" + mimeType + ";base64," + base64 + "')");
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

	if (line.indexOf('url(') > -1 && line.indexOf('no-base64') === -1) {
		var imagePath = getImagePath(line, filePath),
		count = 0;

		if (imagePath && imagePath.length) {
			imagePath.forEach(function (p) {
				getMD5ForImage(p.path, function (base64) {
					p.base64 = base64;
					p.mime = mime.lookup(p.path);
					count += 1;

					if (count === imagePath.length) {
						imagePath.forEach(function (p) {
							line = replaceLine(line, new RegExp('url\\([\'"]?' + p.match + '[\'"]?\\)'), p.base64, p.mime);
						});
						cb(line, imagePath.map(function (p) {
							return p.path;
						}));
					}
				});
			});
		} else {
			cb(line);
		}
	} else {
		cb(line);
	}
}

function convertPathsToDataUri(data, filePath, cb) {
	var lines = data.toString('utf-8').split('\n'),
	outputLines = [],
	processedLines = 0,
	imagePaths = {},
	duplicates = [];

	function finishLineProcess() {
		processedLines += 1;

		if (processedLines === lines.length) {
			cb(outputLines.join('\n'), duplicates);
		}
	}

	lines.forEach(function (line, index) {
		processLine(line, filePath, function (line, imagePath) {
			if (imagePath && imagePath.length) {
				imagePath.forEach(function (i) {
					if (imagePaths[i] === true) {
						duplicates.push(index);
					}
					imagePaths[i] = true;
				});
			}
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
			convertPathsToDataUri(data, filePath, cb);
		});
	});
}


module.exports = build;
