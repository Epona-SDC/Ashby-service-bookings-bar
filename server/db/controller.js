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

const makeNewRental = (rentalInfo) => {
  // ignore if an id is passed in, client doesn't get to decide that
  // some data validation
  // price: exists, valid real
  // max_guests: exists, valid int
  // cleaning_fee: exists, valid real
  // service_fee: exists, valid real
  // occupancy_fee: exists, valid real
  // if no numReviews, default to 0 and set avgStars same
    // else: both valid int / real
  // use Rental to update basic info

  // put dates in order
  // loop through and check that dates are valid
    // add each valid date
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