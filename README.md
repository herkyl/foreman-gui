# Foreman-Gui

Foreman-Gui is a nifty command line utility for generating Procfiles. Foreman-Gui works with all Foreman implementations.

![Foreman-Gui](https://raw.github.com/herkyl/foreman-gui/master/images/fmg.png)

## Install

Install the command line tool

    $ npm install -g foreman-gui

## Usage

Foreman-gui has a very simple API. It only takes one parameter - the `FullProcfile` location. `FullProcfile` is a file where all your servies are defined like in a normal `Procfile`. `Procfile` is generated from your `FullProcfile`.

Runs Foreman-gui with the target file `FullProcfile`

    $ fmg

Runs Foreman-gui with a custom target file.

    $ fmg custom_procfile_location

### FullProcfile

The `FullProcfile` format is a simple `key : command` format:

    web: node web_server.js
    api: node api_server.js
    log: node log_server.js

Each line should contain a separate process.
