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

function installDeps(appDir, namespace, { install }) {
  process.chdir(appDir);

  let child;

  if (install) {
    logger.log();
    logger.log('Installing dependencies. This might take a couple of minutes.');
    logger.log();

    child = spawn.sync('npm', ['install'], { stdio: 'inherit' });
  }

  child = spawn.sync('git', ['init'], { stdio: 'inherit' });

  logger.log();
  logger.log('Created git commit.');
  logger.log();

  logger.log(`Success! Server created at ${chalk.green(appDir)}`);
  logger.log('Inside that directory, you can run several commands:');
  logger.log();

  logger.log(`  ${chalk.cyan('npm run start:dev')}`);
  logger.log(`    Starts the development server.`);
  logger.log();

  logger.log(`  ${chalk.cyan('npm run build')}`);
  logger.log(`    Bundles the app into static files for production.`);
  logger.log();

  logger.log(`  ${chalk.cyan('npm start')}`);
  logger.log(`    Starts the production server.`);
  logger.log();

  logger.log('You can start by typing:');
  logger.log();

  logger.log(`  cd ${namespace}`);
  logger.log(`  ${chalk.cyan('npm start:dev')}`);
  logger.log();
  logger.log('Cheers!');
};

// init()
function init(namespace, options) {
  // Get the working directory and application path
  const cwd = process.cwd();
  const appDir = `${cwd} / ${namespace}`;

  logger.log(`Creating a new Backdrop Server in ${chalk.green(appDir)}.`);
  logger.log('Downloading...');

  // Create temp directory
  const tmpDir = path.join(__dirname, '..', '..', '_tmp');
  const tmpExtractedDir = path.join(tmpDir, `backdrop - ${version}`);
  const tmpZipFilePath = path.join(tmpDir, `backdrop - ${version}.zip`);
  ensureDirSync(tmpDir);

  // Check if the latest version is exisist
  if (fsExtra.isFileExists(tmpZipFilePath)) {
    // No need to download
    fse.copySync(tmpExtractedDir, appDir);

    installDeps(appDir, namespace, options);
  } else {
    // Download latest release to temp directory
    const dl = new DownloaderHelper(releaseUrl, tmpDir);
    dl.on('end', () => {
      fs.createReadStream(tmpZipFilePath)
        .pipe(unzipper.Extract({ path: tmpDir })
          .on('finish', () => {
            fse.copySync(tmpExtractedDir, appDir);
            fsExtra.forceUnlink(tmpDir);

            installDeps(appDir, namespace, options);
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
