const rentalIdStart = 1;
var rentalId = 1;
const dateIdStart = 91;  // = April 1, 2020
const dateIdEnd =  181;  // = June 30, 2020

// *************************  Rentals Table Fields  *************************

const resetRentalId = () => {
  rentalId = rentalIdStart;
}

const generateRentaIid  = () => {
  const  result = rentalId;
  rentalId += 1;
  return result;
}

const generatePrice = () => {
  const price = Math.floor(Math.random() * 100) + 100;
  return price;
}

const generateMaxGuests = () => {
  const maxGuests =  Math.floor(Math.random() * 4) + 2;
  return maxGuests;
}

const generateReviews = () => {
  const numReviews = Math.floor(Math.random() * 18) + 3;
  return numReviews;
}

const generateAvgStars = () => {
  const avgStars = Math.round(((Math.random() * 2) + 3) * 100) / 100;
  return avgStars;
}

const generateFee = () => {
  const fee = Math.floor(Math.random() * 50) + 50;
  return fee;
}

const generateRental = () => {
  const rental = {};
  rental.id = generateRentaIid();
  rental.price = generatePrice();
  rental.maxGuests = generateMaxGuests();
  rental.numReviews = generateReviews();
  rental.avgStars = generateAvgStars();
  rental.cleaningFee = generateFee();
  rental.serviceFee = generateFee();
  rental.occupancyFee = generateFee();
  return rental;
}

const getRentalHeader = () => {
  const header = `id, price, max_guests, numReviews, avgStars, cleaning_fee, service_fee, occupancy_fee\n`;
  return header;
}

const generateRentalCSVLine = () => {
  const rental = generateRental();
  const {
    id,
    price,
    maxGuests,
    numReviews,
    avgStars,
    cleaningFee,
    serviceFee,
    occupancyFee,
  } = rental;
  const line = `${id}, ${price}, ${maxGuests}, ${numReviews}, ${avgStars}, ${cleaningFee}, ${serviceFee}, ${occupancyFee}\n`;
  return line;
}

// *************************  Dates Table  *************************

const getDateForId = (dateId) => {
  const yyyy = '2020';
  let mm;
  let dd;

  if ((dateId < 91) || (dateId > 182)) {
    return 'invalid dateID';
  }
  if (dateId <= 120) {
    mm = '04';
    dd = dateId - 90;
  } else if (dateId <= 151) {
    mm = '05';
    dd = dateId - 120;
  } else {
    mm = '06';
    dd = dateId - 151;
  }
  return `${yyyy}/${mm}/${dd}`
}

const generateDates = () => {
  let dates = [];
  for (let i = 0; i < 91; i += 1) {
    let dateId = dateIdStart + i;
    let date = getDateForId(dateId);
    dates.push({dateId, date})
  }
  return dates;
}

const generateCSVDates = () => {
  let dates = [];
  let csvLines = 'id,date\n';
  for (let i = 0; i < 91; i += 1) {
    let dateId = dateIdStart + i;
    let date = getDateForId(dateId);
    csvLines += `${dateId},${date}\n`;
  }
  return csvLines;
}

// *************************  rentals_dates Table  *************************

const isDateAvailable = () => {
  if(Math.floor(Math.random() * 2)) {
    return true;
  }
  return false;
}

const generateOneSetDateIds = () => {
  const results = [];
  for (let i = dateIdStart; i <= dateIdEnd; i += 1) {
    if (isDateAvailable()) {
      results.push(i);
    }
  }
  return results;
}

const generateRentalsDatesCSVHeader = () => {
  return 'rentalId,dateId\n';
}

const startRentalsDatesCSV = () => {
  resetRentalId();
  return generateRentalsDatesCSVHeader();
}

const generateJoinCSVLinesForOneRental = () => {
  let line = '';
  const dateIds = generateOneSetDateIds();
  for (let i = 0; i < dateIds.length; i += 1) {
    line += `${rentalId},${dateIds[i]}\n`;
  }
  rentalId += 1;
  return line;
}


// *************  for generating stress test data  *************

const generateRandomDatesList = () => {
  let dates = [];
  for (let i = 0; i < 91; i += 1) {
    if (isDateAvailable()) {
      let dateId = dateIdStart + i;
      let date = getDateForId(dateId);
      dates.push(date)
    }
  }
  return dates;
}

const generateNewRentalWithDates = (context, events, done) => {
  const rental = generateRental();

  context.vars['price'] = rental.price;
  context.vars['max_guests'] = rental.maxGuests;

  const reviews = {};
  reviews.numReviews = rental.numReviews;
  reviews.avgStars = rental.avgStars;

  context.vars['reviews'] = reviews;

  const fees = {};
  fees.cleaning_fee = rental.cleaningFee;
  fees.service_fee = rental.serviceFee;
  fees.occupancy_fee = rental.occupancyFee;

  context.vars['fees'] = fees;

  context.vars['availability'] = generateRandomDatesList();

  return done();
}

const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomRentalId = (context, events, done) => {
  let id;
  if (randomRange(0, 9) === 0) {
    id = randomRange(1, 10000000);
  } else {
    id = randomRange(9000001, 10000000);
  }
  context.vars['id'] = id;
  return done();
}

// *************************  exports  *************************

exports.resetRentalId = resetRentalId;
exports.generateRental = generateRental;
exports.getRentalHeader = getRentalHeader;
exports.generateRentalCSVLine = generateRentalCSVLine;
exports.generateCSVDates = generateCSVDates;
exports.startRentalsDatesCSV = startRentalsDatesCSV;
exports.generateJoinCSVLinesForOneRental = generateJoinCSVLinesForOneRental;

exports.generateNewRentalWithDates = generateNewRentalWithDates;
exports.randomRentalId = randomRentalId;


// exports.generateRentals = generateRentals;
// exports.getDateForId = getDateForId;
// exports.generateDates = generateDates;
// exports.generateOneSetDateIds = generateOneSetDateIds;


// exports.generateRentalCSVHeaderCassandra = generateRentalCSVHeaderCassandra;
// exports.generateCSVDatesCassandra = generateCSVDatesCassandra;
// exports.generateRentalCSVLineCassandra = generateRentalCSVLineCassandra;