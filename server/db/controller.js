const { Rental, UpcomingDate, RentalDate } = require('./models.js');
const { Op } = require("sequelize");

const START_DAY = new Date('4/1/2020');
const LAST_DAY = new Date('6/30/2020');

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

const validateDates = (dates) => {
  let isValid = true;
  let issues = '';
  let date;
  const UTCDates = [];

  if (!Array.isArray(dates)) {
    isValid = false;
    issues = 'dates must be in an array';
    return { isValid, issues }
  }

  for (let i = 0; i < dates.length; i += 1) {
    if (typeof dates[i] !== 'string') {
      isValid = false;
      issues = 'all dates must be submitted in string format';
      return { isValid, issues };
    }

    date = Date.parse(dates[i]);
    if (isNaN(date)) {
      isValid = false;
      issues = 'must be valid dates';
      return { isValid, issues };
    }

    date = new Date(dates[i]);
    if ((date < START_DAY) || (date > LAST_DAY)) {
      isValid = false;
      issues = 'date out of range';
      return { isValid, issues };
    }
    UTCDates.push(date);
  }
  return { isValid, issues, UTCDates }
}

const validateFullData = (rentalInfo) => {
  // ignore if an id is passed in, client doesn't get to decide that
  const { price, max_guests, availability, } = rentalInfo;
  const { cleaning_fee, service_fee, occupancy_fee, } = rentalInfo.fees;
  let { numReviews, avgStars } = rentalInfo.reviews;
  let isValid = true;
  let issues = '';

  if (!isValidReal(price)) {
    isValid = false;
    issues += 'invalid price';
  }
  if (!isValidInt(max_guests)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid maximum guests';
  } else {
    rentalInfo.maxGuests = max_guests;
    delete rentalInfo.max_guests;
  }
  if (!isValidReal(cleaning_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid cleaning fee';
  } else {
    rentalInfo.cleaningFee = cleaning_fee;
    delete rentalInfo.fees.cleaning_fee;
  }
  if (!isValidReal(service_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid service fee';
  } else {
    rentalInfo.serviceFee = service_fee;
    delete rentalInfo.fees.service_fee;
  }
  if (!isValidReal(occupancy_fee)) {
    isValid = false;
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'invalid occupancy fee';
  } else {
    rentalInfo.occupancyFee = occupancy_fee;
    delete rentalInfo.fees.occupancy_fee;
    delete rentalInfo.fees;
  }
  if ((!isValidInt(numReviews)) || (!isValidReal(avgStars))) {
    if (issues.length > 0) {
      issues += ', ';
    }
    issues += 'problem with ratings - defaulting number and average to 0';
    rentalInfo.numReviews = 0;
    rentalInfo.avgStars = 0;
    delete rentalInfo.reviews;
  } else {
    rentalInfo.numReviews = numReviews;
    rentalInfo.avgStars = avgStars;
    delete rentalInfo.reviews;
  }

  const areDatesValid = validateDates(availability);
  if (areDatesValid.isValid) {
    rentalInfo.availability = areDatesValid.UTCDates;
  }
  isValid = isValid && areDatesValid.isValid;
  if (areDatesValid.issues.length > 0) {
    if (issues.length > 0) {
      issues += ', and ';
    }
    issues += areDatesValid.issues;
  }
  return { isValid, issues };
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

const extractDateIds = (dateIdQueryResults) => {
  const dateIds = [];
  let dateId
  for (let i = 0; i < dateIdQueryResults.length; i+= 1) {
    dateId = dateIdQueryResults[i].dataValues.id;
    dateIds.push(dateId);
  }
  return dateIds;
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

const makeNewRental = (rentalInfo) => {
  let newRentalId;
  return new Promise((resolve, reject) => {
    const dataCheck = validateFullData(rentalInfo);
    if (!dataCheck.isValid) {
      reject(dataCheck.issues);
    } else {
      resolve(rentalInfo);
    }
  })
    .then((rentalInfo) => {
      return Rental.create(rentalInfo);
    })
    .then((result) => {
      id = result.dataValues.id;
      return UpcomingDate.findAll({
        atributes: ['id'],
        where: {
          date: rentalInfo.availability,
        }
      });
    })
    .then((dateIdList) => {
      let newRows = extractDateIds(dateIdList);
      for (var i = 0; i < newRows.length; i += 1) {
        newRows[i] = { rentalId: rentalInfo.id, dateId: newRows[i] };
      }
      return RentalDate.bulkCreate(newRows);
    })
    .catch((err) => {
      throw err;
    });
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

exports.getOneJustRental = getOneJustRental;
exports.getOneRentalAndDates = getOneRentalAndDates;
exports.makeNewRental = makeNewRental;

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