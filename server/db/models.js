const { Sequelize, DataTypes } = require('sequelize');
const dbConnection = require('./pgIndex.js');

const Rental = dbConnection.define('rental', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  price: DataTypes.REAL,
  maxGuests: DataTypes.INTEGER,
  numReviews: DataTypes.INTEGER,
  avgStars: DataTypes.REAL,
  cleaningFee: DataTypes.REAL,
  serviceFee: DataTypes.REAL,
  occupancyFee: DataTypes.REAL,
}, { timestamps: false }
);

const UpcomingDate = dbConnection.define('date', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date: DataTypes.DATEONLY,
}, { timestamps: false }
);

const RentalDate = dbConnection.define('rental_date', {
  rentalId: {
    type: DataTypes.INTEGER,
    references: {
      model: Rental,
      key: 'id',
    },
  },
  dateId: {
    type: DataTypes.INTEGER,
    references: {
      model: UpcomingDate,
      key: 'id',
    }
  },
}, {
  tableName: 'rentals_dates',
  timestamps: false,
});

Rental.belongsToMany(UpcomingDate, { through: RentalDate });
UpcomingDate.belongsToMany(Rental, { through: RentalDate });

const recreateTables = () => {
  return dbConnection.sync({ force: true });
}

dbConnection.sync();

// Rental.sync()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// UpcomingDate.sync()
// .then((result) => {
//   console.log(result);
// })
// .catch((error) => {
//   console.error(error);
// });

// RentalDate.sync()
// .then((result) => {
//   console.log(result);
// })
// .catch((error) => {
//   console.error(error);
// });


exports.Rental = Rental;
exports.UpcomingDate = UpcomingDate;
exports.RentalDate = RentalDate;
exports.recreateTables = recreateTables;