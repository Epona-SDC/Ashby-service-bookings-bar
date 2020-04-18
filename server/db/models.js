const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index.js');

const Rental = db.connection.define('rental', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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

const UpcomingDate = db.connection.define('date', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date: DataTypes.DATEONLY,
}, { timestamps: false }
);

const RentalDate = db.connection.define('rental_date', {
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

// db.connection.sync();

exports.Rental = Rental;
exports.UpcomingDate = UpcomingDate;
exports.RentalDate = RentalDate;