'use strict';

const DIR = '../';
const cl = require('./cl');
const place = require('place');
const rendy = require('rendy');
const shortdate = require('shortdate');
const files = require('files-io');
const Info = require(DIR + 'package');

module.exports = (callback) => {
    let name        = 'Історія версій';
    let  history    = name + '\n---------------\n';
    let link        = '//github.com/coderaiser/cloudcmd/releases/tag/';
    let template    = '- *{{ date }}*, '    +
                  '**[v{{ version }}]'   +
                  '(' + link + 'v{{ version }})**\n';
    let version     = Info.version;
    
    cl((error, versionNew) => {
        if (error)
            return callback(error);
        
        replaceVersion('index.md', version, versionNew, () => {
            var historyNew = history + rendy(template, {
                date        : shortdate(),
                version     : versionNew
            });
            
            replaceVersion('index.md', history, historyNew, () => {
                var to = rendy('v{{ version }}.md', {
                    version: versionNew
                });
                
                files.pipe('index.md', to, (error) => {
                    callback(error, 'done: ok');
                });
            });
        });
    });
};

function replaceVersion(name, version, versionNew, callback) {
    place(name, version, versionNew, (error) => {
        if (error)
            return callback(error);
        
        callback(null, 'done: ' + name);
    });
}
