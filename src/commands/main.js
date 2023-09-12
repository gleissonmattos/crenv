/* !
* crenv
* Copyright(c) 2023 Gleisson Mattos
* http://github.com/gleissonmattos
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

const fs = require("fs");
const shell = require('shelljs');

function getEnvironments({ prefix }) {
  const environments = {};

  Object.keys(process.env).forEach(key => {
    if (key.includes(`${prefix}_`, 0)) {
      environments[key] = process.env[key];
    }
  });

  return environments;
}

module.exports = (options, [, program]) => {
  const { args } = program;
  const { public: publicPath, env, target, prefix } = options;
  const dotenvFile = env && `/.env.${env}` || target;

  if (fs.existsSync(dotenvFile)) {
    require("dotenv").config({
      path: dotenvFile,
    });
  }

  const environments = getEnvironments({ prefix });
  const content = `window.env = ${JSON.stringify(environments)}`;

  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  const clientFileEnv = `${publicPath}/envs.js`;

  fs.writeFileSync(clientFileEnv, content);

  shell.echo('crenv:', 'client environment file generated at \x1b[36m', clientFileEnv, '\x1b[0m');
  shell.echo('crenv:', 'add on your client page: \x1b[36m', '<script type="text/javascript" src="[publicPath]/envs.js"></script>', '\x1b[0m');

  if (args.length && shell.exec(args.join(' ')).code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }
};
