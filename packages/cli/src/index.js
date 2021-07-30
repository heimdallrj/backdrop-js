const program = require("commander");
const actions = require("./actions");
const pkg = require("../package.json");

program.version(pkg.version);

// program: initialize
program
  .command("init <app>")
  .option('-i, --install', 'install dependencies')
  .description("Initialize the project")
  .action((...args) => actions.init(...args));

// program: [anything else]
program.command("*").action((args) => actions.error(args));

program.parse(process.argv);
