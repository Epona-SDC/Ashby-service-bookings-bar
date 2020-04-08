const rentalIdStart = 500000001;
var rentalId = 500000001;
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
  // generate prices of 100-199
  const price = Math.floor(Math.random() * 100) + 100;
  return price;
}

const generateMaxGuests = () => {
  // generate max # of guests from 2-5
  const maxGuests =  Math.floor(Math.random() * 4) + 2;
  return maxGuests;
}

const generateReviews = () => {
  // generate number of reviews from 3-20
  const numReviews = Math.floor(Math.random() * 18) + 3;
  return numReviews;
}

const generateAvgStars = () => {
  // generate average stars from 3.00 - 5.00 (rounded to two decimal places)
  const avgStars = Math.round(((Math.random() * 2) + 3) * 100) / 100;
  return avgStars;
}

const generateFee = () => {
  // generate fees from 50-99
  const fee = Math.floor(Math.random() * 50) + 50;
  return fee;
}

const generateRental = () => {
  const rental = {};
  // call each above
  // assmble an object
  rental.id = generateRentaIid();
  rental.price = generatePrice();
  rental.maxGuests = generateMaxGuests();
  rental.numReviews = generateReviews();
  rental.avgStars = generateAvgStars();
  rental.cleaningFee = generateFee();
  rental.serviceFee = generateFee();
  rental.occupancyFee = generateFee();
  // return said object
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

const generateRentalCSVHeaderCassandra = () => {
  let line = 'id, price, maxGuests, numReviews, avgStars, cleaningFee, serviceFee, occupancyFee, availability\n';
  return line;
}

const generateRentalCSVLineCassandra = () => {
  let line = generateRentalCSVLine();
  line = line.slice(0, line.length-2);
  let availability = generateCSVDatesCassandra();

  line = `${line}, {${availability}}\n`;

  return line;
}

const generateRentals = (num) => {
  const results = [];
  let rental;
  // iterates to num
  for (let i = 1; i <= num; i += 1) {
    rental = generateRental();
    results.push(rental);
  }
  return results;
}


// *************************  Dates Table  *************************

const getDateForId = (dateId) => {
  // computes and returns date in yyyy/mm/dd for given date id
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

const getDateForIdCassandra = (dateId) => {
  // computes and returns date in yyyy/mm/dd for given date id
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
  return `${yyyy}-${mm}-${dd}`
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
  // let csvLines = '';
  for (let i = 0; i < 91; i += 1) {
    let dateId = dateIdStart + i;
    let date = getDateForId(dateId);
    csvLines += `${dateId},${date}\n`;
  }
  return csvLines;
}

const generateCSVDatesCassandra = () => {
  let csvDates = '';
  for (let i = 0; i < 91; i += 1) {
    let dateId = dateIdStart + i;
    let date = getDateForIdCassandra(dateId);
    if (isDateAvailable()) {
      csvDates += `'${date}',`;
    }
  }
  csvDates = csvDates.slice(0, csvDates.length-1);
  return csvDates;
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
  // goes through all 91 days
  for (let i = dateIdStart; i <= dateIdEnd; i += 1) {
    if (isDateAvailable()) {
      // add to results list
      results.push(i);
    }
  }
  return results;
}

const generateNumSetsDateIds = (num) => {
  const results = [];
  let oneSet;
  // iterates to num
  for (let i = 1; i <= num; i += 1) {
    oneSet = generateOneSetDateIds();
    results.push(oneSet);
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

// *************************  exports  *************************

exports.resetRentalId = resetRentalId;
exports.generateRental = generateRental;
exports.generateRentals = generateRentals;
exports.getDateForId = getDateForId;
exports.generateDates = generateDates;
exports.generateOneSetDateIds = generateOneSetDateIds;
exports.getRentalHeader = getRentalHeader;
exports.generateRentalCSVLine = generateRentalCSVLine;
exports.generateCSVDates = generateCSVDates;
exports.startRentalsDatesCSV = startRentalsDatesCSV;
exports.generateJoinCSVLinesForOneRental = generateJoinCSVLinesForOneRental;
exports.generateRentalCSVHeaderCassandra = generateRentalCSVHeaderCassandra;
exports.generateCSVDatesCassandra = generateCSVDatesCassandra;
exports.generateRentalCSVLineCassandra = generateRentalCSVLineCassandra;