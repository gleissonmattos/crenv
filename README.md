<div align="center">
  <h1>crenv  ̤</h1>
  <p>Performs the loading and reading of cross-side environment variables at runtime, on the server and in the browser, including generated static HTML pages.</p>
</div>

## Basic usage

```bash
$ crenv --target .env.production --public ./src/public -- [your after command here]
```
A file will be generated on your defined public path (`./src/public/envs.js`) with the variables that can be accessed on the client like this. You will just need to import the auto-generated file into your project, example:
```html
<script src="public/envs.js"></script>
```
This is especially useful for SSR projects like those written in [REACT](https://pt-br.reactjs.org) and [VUE](https://vuejs.org) where variables are loaded during build or when pages are rendered client-side and server-side. 

This way we can access the client and server side variables automatically like this:

```javascript
import env from "runtime-environment";

// read client and server side environments
env.APPLICATION_ENV_HELLO
```
Then you no longer need to worry about dealing with process.env or knowing how and when you will need to access the environment variables in the client, everything will be done cross-environment and automatically.

## Installation
Installation is easy with the [npm](https://www.npmjs.com) command:

```bash
$ npm install --save runtime-environment
```

If you only need the *cli* outside the project, you can install the lib globally:

```bash
$ npm install -g runtime-environment
```

# cli

The *cli* allows the automatic generation of environment variables looking directly at the [dotenv](https://www.npmjs.com/package/dotenv) file which may vary in each your application environment.

Example:
As long as you have an .env file:

```dotenv
// .env.production
MY_CROSS_ENV_ENVIRONMENT=production
MY_CROSS_ENV_API_URL=https://my-api.io
SECURITY_SERVER_KEY=88370f41-9204-43df-91a5-b089c6b3e89b
```
Some of your variables may need to be accessed server-side or client-side. When running:
```bash
$ crenv -e production --prefix MY_CROSS_ENV
```
A file will be generated with cross environments variables defineds with prefix `MY_CROSS_ENV` in its default public folder (`./public/envs.js`) and the client can consume it by importing the `envs.js` file into the page.

```javascript
// public/envs.js

window.env = {
    MY_CROSS_ENV_ENVIRONMENT: "production",
    MY_CROSS_ENV_API_URL: "https://my-api.io"
}
```

Your project will automatically handle variables when you access them this way.
On ssr pages for example, they will work in server-side as well as client-side rendering.
```jsx
import env from "runtime-environment"

export default () => (
  <div>
    <h1>My environment {env.MY_CROSS_ENV_ENVIRONMENT}</h1>
  </div>
);
```

```javascript
// API client integration file
import env from "runtime-environment"

export const getPosts = () => fetch(`${env.MY_CROSS_ENV_API_URL}/posts`);
```

OBS.: 
- If no target dotenv file is defined or no environment is defined the *runtime-environment* will read the environment variables from where it is running, from `process.env`.
- You need to define a prefix before running the command. If not defined, the default prefix is ​​`APPLICATION_ENV`. Only variables with the defined prefix are loaded, as in the example above.

## cli options

##### -e / --env
Set the target *environment*. The lib is read based on dotenv file sufix: `.env.[environment]`.

##### -t / --target
Set target dotenv file: `crenv -t ./.env.develop`.

##### --public
Set the public project path. When run command the `envs.js` will be generated in this path.
The default path value is `./public/`.

##### --prefix
Set prefix environment variables. All variables with prefix will be understood as cross and will also be passed to the client-side.
On the server, all variables can be read through this module. On the client, only those with a defined prefix can be accessed.
The default prefix is `APPLICATION_ENV`.

##### -v / --version
Show current lib version

##### -h / --help
Show help commands
