const program = require("commander");
const actions = require("./actions");
const pkg = require("../package.json");

program.version(pkg.version);

// program: initialize
program
  .command("init <namespace>")
  .description("Initialize the project.")
  .action((namespace, options) => actions.init(namespace, options));

// program: [anything else]
program.command("*").action((args) => actions.error(args));

program.parse(process.argv);
