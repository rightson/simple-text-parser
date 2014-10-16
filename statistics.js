var path = require('path');
var lineReader = require('line-reader');

if (process.argv.length < 4) {
	return console.log('Usage:\n  node %s <filename> <nth_column> [from_nth_line] [delimiter]', path.basename(process.argv[1]));
}

var options = {
	filename: process.argv[2],
	nth_column: process.argv[3] || 2,
	start_line: process.argv[4] || 1,
	delimiter: process.argv[5] || '\t',
};

var statistics = {}
var current_line = 1;
lineReader.eachLine(options.filename, function (line, last) {
	if (current_line++ < options.start_line) {
		return;
	}

	var action = line.split(options.delimiter)[options.nth_column];
	if (!action) {
		return;
	}
	if (!statistics[action]) {
		statistics[action] = 0;
	}
	statistics[action] += 1;

	if (last) {
		console.log(sort_object(statistics));
	}
});

function sort_object (object) {
	var sortable = [];
	for (var key in object) {
  		sortable.push([key, object[key]])
	}
	sortable.sort(function(a, b) {return b[1] - a[1]});

	return sortable;
}