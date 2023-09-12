/* !
* crenv
* Copyright(c) 2023 Gleisson Mattos
* http://github.com/gleissonmattos
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

const env = new Proxy(typeof window !== "undefined" ? window.env || {} : process.env, {
  get: (environments, property) => {
    return environments[String(property)];
  },
});

module.exports = env;
