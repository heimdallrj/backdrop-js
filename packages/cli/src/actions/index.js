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

function installDeps(appDir, app, { install }) {
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

  logger.log(`  ${chalk.cyan('npm run start')}`);
  logger.log(`    Starts the development server.`);
  logger.log();

  logger.log(`  ${chalk.cyan('npm run build')}`);
  logger.log(`    Bundles the app into static files for production.`);
  logger.log();

  logger.log(`  ${chalk.cyan('npm start:prod')}`);
  logger.log(`    Starts the production server.`);
  logger.log();

  logger.log('You can start by typing:');
  logger.log();

  logger.log(`  ${chalk.cyan(`cd ${app}`)}`);
  logger.log(`  ${chalk.cyan('npm start')}`);
  logger.log();
  logger.log('Cheers!');
};

// init()
function init(app, options) {
  try {
    // Get the working directory and application path
    const cwd = process.cwd();
    const appDir = `${cwd}/${app}`;

    logger.log(`Creating a new Backdrop Server in ${chalk.green(appDir)}.`);
    logger.log('Downloading...');

    // Create temp directory
    const tmpDir = path.join(cwd, `_${app}`);
    const releaseFp = path.join(tmpDir, `backdrop-js-${version}`);
    ensureDirSync(tmpDir);

    // Download latest release to temp directory
    const dl = new DownloaderHelper(releaseUrl, tmpDir);
    dl.on('end', () => {
      fs.createReadStream(`${releaseFp}.zip`)
        .pipe(unzipper.Extract({ path: tmpDir })
          .on('finish', () => {
            fse.copySync(releaseFp, appDir);
            fsExtra.forceUnlink(tmpDir);
            installDeps(appDir, app, options);
          }));
    });
    dl.start();
  } catch (e) {
    logger.error(e);
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
