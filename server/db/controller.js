const { Rental, UpcomingDate, RentalDate } = require('./models.js');

const isValidReal = (num) => {
  if ((num !== undefined) && (typeof num === 'number')) {
    return true;
  }
  return false;
}

const isValidInt = (num) => {
  if ((num !== undefined) && (Number.isInteger(num))) {
    return true;
  }
  return false;
}

const returnedRentalInfoToObject = (returnedInfo) => {
  const {
    id, price, maxGuests, numReviews, avgStars, cleaningFee, serviceFee, occupancyFee
  } = returnedInfo;

  const rentalInfo = {
    _id: id,
    price: price,
    max_guests: maxGuests,
    reviews: {
      numReviews: numReviews,
      avgStars: avgStars,
    },
    fees: {
      cleaning_fee: cleaningFee,
      service_fee: serviceFee,
      occupancy_fee: occupancyFee,
    },
  };
  return rentalInfo;
}

const returnedDatesToArray = (returnedDates) => {
  const dates = [];
  let current;

  for (let i = 0; i < returnedDates.length; i +=1) {
    current = returnedDates[i].dataValues.date;
    dates.push(current);
  }
  return dates;
}

const getOneJustRental = (id) => {
  return Rental.findOne({
    where: { id: id },
  })
    .then((result) => {
      if (result === null) {
        throw 'That id does not exist';
      }
      return returnedRentalInfoToObject(result.dataValues);
    })
    .catch((err) => {
      if (typeof err !== 'string') {
        console.error('error fetching basic rental info');
      }
      throw err;
    });
}

const getOneRentalAndDates = (id) => {
  return Rental.findOne({
    where: { id: id },
    include: UpcomingDate,
  })
    .then((result) => {
      if (result === null) {
        throw 'That id does not exist';
      }
      const dataValues = result.dataValues;
      const rentalInfo = returnedRentalInfoToObject(dataValues);
      const allDates = returnedDatesToArray(dataValues.dates);
      rentalInfo.availability = allDates;

      return rentalInfo;
    })
    .catch((err, extra3) => {
      if (typeof err !== 'string') {
        console.error('error fetching basic rental info');
      }
      throw err;
    });
}

const validateFullData = (rentalInfo) => {
  // ignore if an id is passed in, client doesn't get to decide that
  const { price, max_guests, availability, } = rentalInfo;
  const { cleaning_fee, service_fee, occupancy_fee, } = rentalInfo.fees;
  let { numReviews, avgStars } = rentalInfo.reviews;
  let isValid = true;
  let issues = '';

  // some data validation
  // price: exists, valid real
  if (!isValidReal(price)) {
    isValid = false;
    issues += 'invalid price';
  }
  // max_guests: exists, valid int
  if (!isValidInt(max_guests)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid maximum guests';
  }
  // cleaning_fee: exists, valid real
  if (!isValidReal(cleaning_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid cleaning fee';
  }
  // service_fee: exists, valid real
  if (!isValidReal(service_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid service fee';
  }
  // occupancy_fee: exists, valid real
  if (!isValidReal(occupancy_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid occupancy fee';
  }
  // if no numReviews, default to 0 and set avgStars same
  if ((!isValidInt(numReviews)) || (!isValidReal(avgStars))) {
    // else: both valid int / real
    numReviews = 0;
    avgStars = 0;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'problem with ratings - defaulting number and average to 0';
  }
  // use Rental to update basic info

  // put dates in order
  // loop through and check that dates are valid
    // add each valid date

  return { isValid, issues };
}


const makeNewRental = (rentalInfo) => {
}

const addDateToRental = (rentalId, date) => {
  // get id for date from UpcomingDate table
  // insert a line into RentalDate using renatalId and dateId
}

const updateRental = (rentalInfo) => {
  // verify id & fetch record
  // validate updates
  // make changes
  // save updates
}

const deleteRental = (id) => {
  // use Rental to delete
  // tables set to cascade deletion automagically, yay!
}


// var test = {
// 	"availability" : [
// 		"10/10/2020",
// 		"8/9/2020",
// 		"6/8/2020",
// 		"4/13/2020",
// 		"4/25/2020",
// 		"5/18/2020",
// 		"11/26/2020",
// 		"3/12/2020",
// 		"8/10/2020",
// 		"9/2/2020",
// 		"1/8/2020",
// 		"4/18/2020"
// 	],
// 	"price" : 172,
// 	"max_guests" : 3,
// 	"reviews" : {
// 		"numReviews" : 8,
// 		"avgStars" : 4.63
// 	},
// 	"fees" : {
// 		"cleaning_fee" : 55,
// 		"service_fee" : 61,
// 		"occupancy_fee" : 90
// 	}
// }
// console.log(validateFullData(test));


exports.getOneJustRental = getOneJustRental;
exports.getOneRentalAndDates = getOneRentalAndDates;

/*  Making the data look like this and shouldn't have to refactor the client:

const rentalSchema = new mongoose.Schema({
  _id: Number,
  price: Number,
  max_guests: Number,
  reviews: {
    numReviews: Number,
    avgStars: Number
  },
  fees: {
    cleaning_fee: Number,
    service_fee: Number,
    occupancy_fee: Number
  },
  availability: [String]
});
*/