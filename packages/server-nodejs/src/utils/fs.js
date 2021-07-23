const fs = require('fs');

export const ensureDirSync = function (path) {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
};
