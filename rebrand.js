const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.next')) {
                walkSync(filePath, callback);
            }
        }
    });
}

walkSync('.', function(filePath, stat) {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.webp')) return;
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;
        content = content.replace(/Naia OS/g, 'Naia OS');
        content = content.replace(/naia-os/g, 'naia-os');
        content = content.replace(/naia\.nextain\.io/g, 'naia.nextain.io');
        content = content.replace(/\bnan\b/g, 'naia');
        content = content.replace(/\bNan\b/g, 'Naia');
        content = content.replace(/project-naia\.nextain\.io/g, 'project-naia.nextain.io');
        content = content.replace(/api\.naia\.com/g, 'api.naia.com');
        content = content.replace(/naia-db/g, 'naia-db');
        content = content.replace(/naia-gateway/g, 'naia-gateway');
        content = content.replace(/naia-487703/g, 'naia-487703');
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated:', filePath);
        }
    } catch (e) {
        // ignore
    }
});
