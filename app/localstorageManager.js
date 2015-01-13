var fs = require('fs');

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

var moveFile = function (srcPath, destPath) {
    var source = fs.createReadStream(srcPath); // some tmp directory managed by browser
    var destination = fs.createWriteStream(destPath); // microblog/localstorage/images/:blogId/:postId/image.png

    source.pipe(destination, {end: false});
    source.on("end", function () {
        fs.unlinkSync(picture.path);
    });
}

module.exports = {
    mkdirSync : mkdirSync,
    moveFile : moveFile
}