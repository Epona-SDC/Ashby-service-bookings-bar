const { Sequelize } = require('sequelize');
const login = require('./dbconfig.js');

const dbName = 'Availability';

const dbConnection = new Sequelize(dbName, login.user, login.password, {
  host: login.host,
  dialect: `${login.dialect}`
});

dbConnection.authenticate()
  .then((result) => {
    console.log(`${login.dialect} database connection check successful`);
  })
  .catch((err) => {
    console.error('ERROR', err);
  });

module.exports = dbConnection;