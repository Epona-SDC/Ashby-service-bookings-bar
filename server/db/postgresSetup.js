const { Sequelize, DataTypes } = require('sequelize');
const { Rental, UpcomingDate, RentalDate, refreshAll } = require('./models.js');


console.log('trying to refresh tables');
recreateTables()
.then((result) => {
  console.log('success');
})
.catch((error) => {
  console.error(error);
});