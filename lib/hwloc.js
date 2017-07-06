const shelljs = require('shelljs');
const xml = require('xml2js');
const Promise = require('bluebird');

const paramsToString = function (params) {

    if(!params) {
        return '';
    }

    let str = '';

    for(const key of Object.keys(params)) {

        str += '--' + key + ' ';

        if(params[key]) {
            str += params[key] + ' ';
        }

    }

    return str;

};

const ls = function (params) {
    return new Promise(function (resolve, reject) {

        shelljs.exec('hwloc-ls ' + paramsToString(params), {silent: true}, function (code, stdout, stderr) {

            if(stderr) reject(stderr);

            xml.parseString(stdout, function (err, result) {

                if(err) reject(err);

                resolve(result);

            });

        });

    })

};



module.exports = {
    ls: ls
};
