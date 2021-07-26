const fs = require('fs');

export const ensureDirSync = function (path) {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
};

export const isFileExists = (fp) => {
  try {
    fs.lstatSync(fp);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }

  return true;
};
