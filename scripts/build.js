const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const spawn = require('cross-spawn');
const copyfiles = require('copyfiles');

// Utils
function isFileOrDirExists(fp) {
  try {
    fs.lstatSync(fp);
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }

  return true;
}

try {
  const package = require('../package.json');

  const appName = package.name;
  const version = package.version;
  const appDir = `${appName}-${version}`;
  const appDirPath = path.join(__dirname, '..', appDir);

  // @server
  const serverDirPath = path.join(__dirname, '..', 'packages', 'server-nodejs');
  const excludes = ['.env', '.env.example', '.vscode', 'media', '.jsondb', 'src', 'dist', 'node_modules', 'public'];

  const filesOrDirs = fs.readdirSync(serverDirPath).filter(fOrd => !excludes.includes(fOrd));

  if (isFileOrDirExists(appDirPath)) {
    rimraf.sync(appDirPath);
  }
  mkdirp.sync(appDirPath);
  mkdirp.sync(`${appDirPath}/src`);

  // Create directories
  // and copy files
  const srcDir = `${serverDirPath}/src`;
  const destDir = `${appDirPath}/src/`;
  fse.copySync(srcDir, destDir, { overwrite: true });

  // Copy all other files
  filesOrDirs.forEach((fp) => {
    const srcFile = `${serverDirPath}/${fp}`;
    const dest = `${appDirPath}/${fp}`;
    fse.copySync(srcFile, dest);
  });

  // Copy .env
  fse.copySync(`${serverDirPath}/.env.example`, `${appDirPath}/.env`);

  // @frontend
  const frontendDirPath = path.join(__dirname, '..', 'packages', 'frontend', 'build');
  fse.copySync(frontendDirPath, `${appDirPath}/public`);

} catch (e) {
  console.log(e);
}
