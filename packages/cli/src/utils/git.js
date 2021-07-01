const nodegit = require("nodegit");

const Git = {
  clone(config, cb = () => {}) {
    const url = config.url,
      local = `./${config.namespace}`,
      cloneOpts = config.options || {};

    nodegit
      .Clone(url, local, cloneOpts)
      .then(function (repo) {
        cb(null, repo);
      })
      .catch(function (err) {
        cb(err, null);
      });
  },
};

module.exports = Git;
