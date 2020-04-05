const { Sequelize, DataTypes } = require('sequelize');
const dbConnection = require('./pgIndex.js');

const Rental = dbConnection.define('rental', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
  },
  price: DataTypes.REAL,
  maxGuests: DataTypes.INTEGER,
  numReviews: DataTypes.INTEGER,
  avgStars: DataTypes.REAL,
  cleaningFee: DataTypes.REAL,
  serviceFee: DataTypes.REAL,
  occupancyFee: DataTypes.REAL,
});

const UpcomingDate = dbConnection.define('date', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
  },
  date: DataTypes.DATE,
});

const RentalDate = dbConnection.define('rental_date', {
  rentals_id: DataTypes.INTEGER,
  dates_id: DataTypes.INTEGER,
}, { tableName: 'rentals_dates',
});


Rental.sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

UpcomingDate.sync()
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});

RentalDate.sync()
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});



exports.Rental = Rental;
exports.UpcomingDate = UpcomingDate;
exports.RentalDate = RentalDate;