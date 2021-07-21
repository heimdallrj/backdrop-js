const fs = require("fs");
const unzipper = require('unzipper');
const { DownloaderHelper } = require('node-downloader-helper');
const logger = require("../utils/logger");
const fsExtra = require("../utils/fs");
const path = require("path");
const fse = require('fs-extra');
const spawn = require('cross-spawn');

const version = 'v1.0.0-alpha.0';
const releaseZip = `https://github.com/thinkholic/backdrop-js/releases/download/${version}/backdrop-${version}.zip`;

const ensureDirSync = function (path) {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
};

function installDeps(appDir) {
  process.chdir(appDir);
  const child = spawn('npm', ['install'], { stdio: 'inherit' });
};

function init(namespace, options) {
  logger.log("Initializing...");

  // Create temp directory
  const tmpDir = path.join(__dirname, '..', '..', '_tmp');
  const tmpExtractedDir = path.join(tmpDir, `backdrop-${version}`);
  const tmpZipFilePath = path.join(tmpDir, `backdrop-${version}.zip`);
  ensureDirSync(tmpDir);

  // Get app path
  const cwd = process.cwd();
  const appDir = `${cwd}/${namespace}`;

  // Check if the latest version is exisist
  if (fsExtra.isFileExists(tmpZipFilePath)) {
    // No need to download
    fse.copySync(tmpExtractedDir, appDir);
    if (options.install) {
      installDeps(appDir);
    }
  } else {
    // Download latest release to temp directory
    const dl = new DownloaderHelper(releaseZip, tmpDir);
    dl.on('end', () => {
      fs.createReadStream(tmpZipFilePath)
        .pipe(unzipper.Extract({ path: tmpDir })
          .on('finish', () => {
            fse.copySync(tmpExtractedDir, appDir);
            fsExtra.forceUnlink(tmpDir);

            if (options.install) {
              installDeps(appDir);
            }
          }));
    });
    dl.start();
  }
}

function error() {
  logger.error("Invalid argument(s)");
}

module.exports = {
  init,
  error,
};
