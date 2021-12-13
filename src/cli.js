#!/usr/bin/env node

const commander = require("commander");
const commands = require('./commands');
const { version } = require('../package.json');

commander.name("crosenv");
commander.description("Reading environment variables at runtime instead of build time, client and server side cross");

commander.addHelpCommand(true);
commander.helpOption(true);

commander.version(`v${version}`, '-v, --version', 'print current version');

commander.action((...args) => commands.main(commander.opts(), args));

commander.parse(process.argv);
