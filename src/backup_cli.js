#!/usr/bin/env node

const fs = require("fs");
const { version } = require('../package.json');

const VERSION_SHORTHAND = '-v';
const HELP_SHORTHAND = '-h';

const shorthand = {
  [VERSION_SHORTHAND]: {
    description: "Print version information",
    execute: () => console.log(`v${version}`),
  },
  [HELP_SHORTHAND]: {
    description: "",
    execute: () => {
      console.log('Usage: crosenv [options] [arguments]');
    },
  }
};

const flags = {
  '--version': shorthand[VERSION_SHORTHAND],
  '--help': shorthand[HELP_SHORTHAND]
};

const commands = {};

const args = process.argv.slice(2);

const getArguments = (arguments) => {
  const allComands = [];

  arguments.forEach((arg, idx) => {
    let command;
    let parameters = [];

    const isShortHand = arg.includes('-', 0);
    const isFlag = arg.includes('--', 0);

    const parameter = arguments[idx + 1];

    if (isFlag) {
      command = flags[arg];
      if (!command) {
        throw new Error(`unknown flag: ${arg}`);
      }
    } else if (isShortHand) {
      command = shorthand[arg];
      if (!command) {
        throw new Error(`unknown shorthand: ${arg}`);
      }
    } else {
      command = commands[arg];
      if (!command) {
        throw new Error(`command not found: ${arg}`);
      }
    }

    if (command.parameter) {
      let reading = true;
      let current = 1;

      while (reading) {
        const parameter = arguments[idx + current];
        const containsParameter = parameter && (parameter.includes('-', 0) || parameter.includes('--', 0));

        if (!containsParameter) {
          throw new Error(`'${arg}' requires parameter`);
        }

        if (command.parameter === 'array') {
          commands.push(parameter);
          current++;
          return;
        }

        commands = parameter;
      }
    }

    allComands.push([command, ...(parameter && [parameter] || [])]);
  });

  return allComands;
}

try {
  const commandsMapper = getArguments(args);
  for (const relation of commandsMapper) {
    const [command, parameter] = relation;

    command.execute(parameter);
  }
} catch (err) {
  console.error('crosenv:', err.message);
}