#!/usr/bin/env node


/* !
* crenv
* Copyright(c) 2020 Gleisson Mattos
* http://github.com/gleissonmattos
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/


const program = require("commander");
const commands = require('./commands');
const { version } = require('../package.json');

program.name("renv");
program.description("Reading environment variables at runtime instead of build time, client and server side cross");

program.helpOption(true);
program.version(`v${version}`, '-v, --version', 'print current version');

program.addOption(new program.Option("-e, --env [environment]", "environment sufix. ex.: .env.[sufix]"));
program.addOption(new program.Option("-t, --target [targetPath]", "target environment dotenv path").default('.env', 'dotenv default file (.env)'));
program.addOption(new program.Option("--public [publicPath]", "client public project path").default('./public', 'default public client path (./public)'));
program.addOption(new program.Option("--prefix [prefix]", "environments prefix to read").default('APPLICATION_ENV', 'default prefix (APPLICATION_ENV_[NAME])'));

program.action((...args) => commands.main(program.opts(), args));

program.parse(process.argv);
