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
    publicRuntimeConfig: {
        BASE_PATH: process.env.BASE_PATH,
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL="http://localhost:3100",
        COMPANY_NAME: process.env.COMPANY_NAME="Logistex (A)"
      }
};