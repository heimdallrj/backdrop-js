const logger = require("../utils/logger");
const git = require("../utils/git");

function init(namespace, options) {
  logger.log("Initializing...");

  git.clone(
    {
      url: "https://github.com/thinkholic/backdrop-server.git",
      namespace,
    },
    function (err, resp) {
      if (err) {
        logger.error("ERR", err);
      } else {
        logger.log("Initializing successful.");
      }
    }
  );
}

function error() {
  logger.error("Invalid argument(s)");
}

module.exports = {
  init,
  error,
};
