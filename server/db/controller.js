const { Rental, UpcomingDate, RentalDate } = require('./models.js');

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

const addDateToRental = (rentalId, date) => {
  // get id for date from UpcomingDate table
  // insert a line into RentalDate using renatalId and dateId
}

const makeNewRental = (rentalInfo) => {
  // add entry to Rental using basic info
  // loop through array of dates
    // call addDateToRental for each
  // use promiseAll?
}

const deleteRental = (id) => {
  // use Rental to delete
  // tables set to cascade deletion automagically, yay!
}

const updateRental = () => {
  // use Rental to update basic info

  // fetch dates for the rental
  // compare the lists
  // add / delete as necessary
}


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