var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');

exports.run = function (procfileLines, callback) {
  try {
    var procfileLocation = process.cwd() + '/Procfile';
    var file = fs.createWriteStream(procfileLocation);
    file.on('error', callback);
    file.on('close', callback);
    procfileLines.forEach(function(line) {
      file.write(line.name + ':' + line.command + '\n');
    });
    file.end();
  } catch (error) {
    callback(error);
  }
}
