const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const notification = require('./notification');

// get application directory
const appDir = path.resolve(os.homedir(), 'electron-app-files');
// const dirUpload = path.join(__dirname, "upload");
// console.log(dirUpload)
/****************************/

// get the list of files
exports.getFiles = () => {
    const files = fs.readdirSync(appDir);

    return files.map((filename: any) => {
        const filePath = path.resolve(appDir, filename);
        const fileStats = fs.statSync(filePath);

        return {
            name: filename,
            path: filePath,
            size: Number(fileStats.size / 1000).toFixed(1), // kb
        };
    });
};

// add files
exports.addFiles = (files = []) => {

    // ensure `appDir` exists
    fs.ensureDirSync(appDir);

    // copy `files` recursively (ignore duplicate file names)
    files.forEach((file: any) => {
        const filePath = path.resolve(appDir, file.name);

        if (!fs.existsSync(filePath)) {
            fs.copyFileSync(file.path, filePath);
        }
    });

    // display notification
    notification.filesAdded(files.length);
};