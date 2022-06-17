/* eslint-disable */
// const dotenv = require("dotenv");
// dotenv.config();


module.exports = {
    trailingSlash: true,
    // env: {
    //     /* .env */
    //     BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    //     RUN_CONTEXT: process.env.RUN_CONTEXT
    // },
    generateBuildId: async () => "current",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};