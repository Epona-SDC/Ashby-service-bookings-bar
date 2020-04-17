fs = require('fs');
dataGen = require('./dataGen.js');

const rentalFileName = 'rentals.csv';
const datesFileName = 'dates.csv';
const rentalsDatesFileName = 'rentals_dates.csv';
const cassandraFileName = 'cassie_data.csv';

const writeRentalsCSV = () => {
  const rentalFile = fs.openSync(rentalFileName, 'w');
  fs.writeSync(rentalFile, dataGen.getRentalHeader());
  for (let i = 1; i <= 10000000; i += 1) {
    fs.writeSync(rentalFile, dataGen.generateRentalCSVLine());
  }
  fs.closeSync(rentalFile);
}

const writeDatesCSV = () => {
  const datesFile = fs.openSync(datesFileName, 'w');
  fs.writeSync(datesFile, dataGen.generateCSVDates());
  fs.closeSync(datesFile);
}

const writeRentalsDatesCSV = () => {
  const rdFile = fs.openSync(rentalsDatesFileName, 'w');
  fs.writeSync(rdFile, dataGen.startRentalsDatesCSV());
  for (let i = 1; i <= 1000000; i += 1) {
    fs.writeSync(rdFile, dataGen.generateJoinCSVLinesForOneRental());
  }
  fs.closeSync(rdFile);
}


// uncomment function calls as needed to generate files
// for Postgres:
// writeRentalsCSV();
// writeDatesCSV();
// writeRentalsDatesCSV();
