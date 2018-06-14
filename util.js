let fs = require('fs')

function rmdirSync(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                rmdirSync(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function copyDirSync(srcPath, targetPath) {
    
}

module.exports = {
    rmdirSync: rmdirSync,
    copyDirSync: copyDirSync
}