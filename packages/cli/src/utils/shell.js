const { execFile } = require("child_process");

const Shell = {
  exec(command, args = [], cb = () => {}) {
    const child = execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        cb(error, null);
      }
      cb(null, stdout);
    });
  },
};

module.exports = Shell;
