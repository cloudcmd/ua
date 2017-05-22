'use strict';

var DIR = '../';
var minor = require('minor');
var Info = require(DIR + 'package');
var ERROR = Error('version is missing. release --v<version> or --major --minor --patch');
var Version;

module.exports  = (callback) => {
    var versionNew, error;
    var argv = process.argv;
    var length = argv.length - 1;
    var last = process.argv[length];
    var regExp = /^--(major|minor|patch)?/;
    var match = last.match(regExp);
    
    if (!Version)
        if (!regExp.test(last)) {
            error = ERROR;
        } else {
            if (match[1])
                versionNew  = minor(match[1], Info.version);
            else
                versionNew  = last.substr(3);
            
            Version = versionNew;
        }
    
    callback(error, Version);
};
