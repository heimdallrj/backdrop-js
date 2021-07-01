const shelljs = require("shelljs/shell");
const fs = require("fs");
const fsExtra = require("fs-extra");

const Utils = {
  getWorkingDir(path = null) {
    if (!path) return `${shelljs.pwd()}`;

    return `${shelljs.pwd()}/${path}`;
  },

  isFileExists(fp) {
    try {
      fs.lstatSync(fp);
    } catch (err) {
      if (err.code === "ENOENT") {
        return false;
      }
      throw err;
    }

    return true;
  },

  writeFileSync(targetFp, tplFp, tplParams) {
    const fileContent = getFileContent(tplFp, tplParams);
    fsExtra.outputFileSync(targetFp, fileContent);
  },

  readFileSync(fp, charset = null) {
    const content = fs.readFileSync(fp, charset);
    return content;
  },

  copyFileSync(srcFp, targetFp) {
    shelljs.cp("-R", srcFp, targetFp);
  },

  mkdirSync(path) {
    try {
      fs.statSync(path);
    } catch (err) {
      fs.mkdirSync(path);
    }
  },

  forceUnlink(fp) {
    if (typeof fp !== "object") {
      return;
    }
    shelljs.rm("-rf", fp);
  },
};

module.exports = Utils;
