const { defineConfig } = require("cypress");
const mysql = require("mysql");
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  "chromeArgs": [
    "--ignore-certificate-errors",
    "--allow-insecure-localhost",
    "--allow-running-insecure-content",
    "--ignore-urlfetcher-cert-requests",
    "--ignore-certificate-errors-spki-list"
  ],
  
    reporterOptions: {
      charts: true,
      reportDir:"cypress/report",
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  
  defaultCommandTimeout: 50000,
  execTimeout: 120000,
  taskTimeout: 120000,
  retries:{ "runMode": 0, "openMode": 0},
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: false,
  e2e: {
 
    "specPattern": "cypress/e2e/**/*.{feature,features}",
   
    async setupNodeEvents(on, config) {
      console.log(config.env)
      return require('./cypress/plugins/index.js')(on, config),
     
      require('cypress-mochawesome-reporter/plugin')(on),
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      }),
     
      on("task", {
        queryDb: query => {
          return queryTestDb(query, config);
        }
      });

      
    
    },
    "env": {
      "db": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "",
        "database": "classicmodels"
      }
    }
    
  },

  
});
