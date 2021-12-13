const env = new Proxy(typeof window !== "undefined" ? window.env : process.env, {
    get: (envObj, prop) => {
        if (!(String(prop) in envObj)) {
            throw new Error(
                `Environment variable '${String(prop)}' is not defined`
            );
        }

        return envObj[String(prop)];
    },
});

module.exports = env;
