var fs = require('fs');
var readline = require('readline');
var colors = require('colors/safe');

exports.read = function (fileName, callback) {
  var location = process.cwd() + '/' + fileName;
  console.log(colors.green('Reading from file ' + location));
  var fs = require('fs')
    , readline = require('readline')
    , array = [];

  var rd = readline.createInterface({
    input: fs.createReadStream(location),
    output: process.stdout,
    terminal: false
  });

  rd.on('line', function(line) {
    var pair = line.split(':');
    array.push({
      name: pair[0].trim(),
      command: pair[1].trim()
    });
  });

  rd.on('close', function () {
    callback(null, array);
  });
}
