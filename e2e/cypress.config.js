const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "junit",
  reporterOptions: {
    mochaFile: "reports/test-result-[hash].xml",
    toConsole: true,
  },
  env: {
    nextjsBaseUrl: "http://localhost:3000",
  },
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.test.js",
  },
});
