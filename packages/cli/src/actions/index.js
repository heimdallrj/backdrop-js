const fs = require("fs");
const unzipper = require('unzipper');
const path = require("path");
const fse = require('fs-extra');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const { DownloaderHelper } = require('node-downloader-helper');

const logger = require("../utils/logger");
const fsExtra = require("../utils/fs");
const config = require('../config');

const { version, releaseUrl } = config;

// Utils
const ensureDirSync = function (path) {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
};

function installDeps(appDir) {
  logger.log();
  logger.log('Installing dependencies. This might take a couple of minutes.');
  logger.log();

  process.chdir(appDir);
  const child = spawn('npm', ['install'], { stdio: 'inherit' });
};

// init()
function init(namespace, options) {
  // Get the working directory and application path
  const cwd = process.cwd();
  const appDir = `${cwd}/${namespace}`;

  logger.log(`Creating a new Backdrop Server in ${chalk.green(appDir)}.`);
  logger.log('Downloading...');

  // Create temp directory
  const tmpDir = path.join(__dirname, '..', '..', '_tmp');
  const tmpExtractedDir = path.join(tmpDir, `backdrop-${version}`);
  const tmpZipFilePath = path.join(tmpDir, `backdrop-${version}.zip`);
  ensureDirSync(tmpDir);

  // Check if the latest version is exisist
  if (fsExtra.isFileExists(tmpZipFilePath)) {
    // No need to download
    fse.copySync(tmpExtractedDir, appDir);
    if (options.install) {
      installDeps(appDir);
    }
  } else {
    // Download latest release to temp directory
    const dl = new DownloaderHelper(releaseUrl, tmpDir);
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

// error()
function error() {
  logger.error("Invalid argument(s)");
}

module.exports = {
  init,
  error,
};
