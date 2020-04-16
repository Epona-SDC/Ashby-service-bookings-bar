const { Sequelize } = require('sequelize');
const login = require('./dbconfig.js');

const dbName = 'Availability';

const dbConnection = new Sequelize(dbName, login.user, login.password, {
  host: login.host,
  dialect: `${login.dialect}`,
  logging: false,
});

// dbConnection.authenticate()
//   .then((result) => {
//     console.log(`${login.dialect} database connection check successful`);
//   })
//   .catch((err) => {
//     console.error('ERROR', err);
//   });

  const closeDb = () => {
    return dbConnection.close();
  }

exports.connection = dbConnection;
exports.closeDb = closeDb;

/*
CREATE TABLE public.dates (id integer NOT NULL, date date);

ALTER TABLE public.dates
    OWNER to rentals_admin;


CREATE TABLE public.rentals
(
    id integer NOT NULL,
    price real,
    "maxGuests" integer,
    "numReviews" integer,
    "avgStars" real,
    "cleaningFee" real,
    "serviceFee" real,
    "occupancyFee" real);

ALTER TABLE public.rentals
    OWNER to rentals_admin;


CREATE TABLE public.rentals_dates ("rentalId" integer NOT NULL, "dateId" integer NOT NULL);

ALTER TABLE public.rentals_dates
    OWNER to rentals_admin;

alter database "Availability" owner to rentals_admin
  */