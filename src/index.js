#!/usr/bin/env node

var inquirer = require("inquirer");
var colors = require('colors/safe');
var async = require('async');
var procfileReader = require('./procfile_reader.js');
var foremanRunner = require('./foreman_runner.js');

function getFullProcfileName() {
    var arguments = process.argv.slice(2);
    if (arguments.length > 1) {
        console.log(colors.red('Too many arguments:', arguments.length));
        process.exit(1);
    } else if (arguments.length === 0) {
        return 'FullProcfile';
    } else if (arguments.length === 1 && arguments[0] === 'Procfile') {
        console.log(colors.red('Input Procfile must have a different name'));
        process.exit(1);
    } else {
        return arguments[0];
    }
}

procfileReader.read(getFullProcfileName(), function (error, procfile) {
    var choices = [];

    for (var i in procfile) {
        var line = procfile[i];
        choices.push({
            name: line.name,
            checked: true,
            value: i
        });
        choices.push(new inquirer.Separator(line.command));
    }

    async.waterfall([
        function (next) {
            inquirer.prompt([{
                type: "checkbox",
                message: "Select services",
                name: "services",
                choices: choices,
                validate: function(answer) {
                    if (answer.length < 1) {
                        return "You must choose at least one service.";
                    }
                    return true;
                }
            }], next);
        },
        function (answers, next) {
            var filteredProcfile = [];
            for (var i in answers.services) {
                var lineIndex = answers.services[i];
                filteredProcfile.push(procfile[lineIndex]);
            }
            foremanRunner.run(filteredProcfile, next);
        }
    ], function () {
        if (error) {
          console.error(error);
        } else {
          console.log(colors.green('Procfile created'));
          console.log(colors.green('Run foreman normally'));
        }
    });
});
