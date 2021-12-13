/* !
* runtime-environment
* Copyright(c) 2020 Gleisson Mattos
* http://github.com/gleissonmattos
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

const env = new Proxy((typeof window !== "undefined" ? window.env : process.env), {
  get: (environments, propertie) => {
    return environments[String(propertie)];
  },
});

module.exports = env;
