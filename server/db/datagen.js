const rentalIdStart = 500000001;
var rentalId = 500000001;
const dateIdStart = 91;  // = April 1, 2020
const dateIdEnd =  182;  // = June 30, 2020

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
  rental._id = generateRentaIid();
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

  if ((dateId < 91) || (dateId >182)) {
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
  // use dateId 30 times
  // call isDateAvailable, if true
    // call getDateForId and add string to results array
  // return array of dates
}


// *************************  rentals_dates Table  *************************

const isDateAvailable = () => {
  // randomly return true or false
}

const generateOneSetDateIds = () => {
  // goes through all 91 days
    // if isDateAvailable
      // add to results list
  // return results list
}


// *************************  eports  *************************

// exports.resetRentalId = resetRentalId;
// exports.generateRental = generateRental;
// exports.generateRentals = generateRentals;
// exports.getDateForId = getDateForId;
// exports.generateDates = generateDates;
// exports.generateOneSetDateIds = generateOneSetDateIds;

let test = getDateForId(152);
console.log(test);

