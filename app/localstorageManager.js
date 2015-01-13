var fs = require('fs');
//TODO: move some functions into this

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

module.exports = {
    mkdirSync : mkdirSync
}