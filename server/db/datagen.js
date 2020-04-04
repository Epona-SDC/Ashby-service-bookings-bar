// rentalIdStart = 500000001;
// rentalId = 500000001;
// dateIdStart = 91;  // = April 1, 2020
// dateIdEnd =  182;  // = June 30, 2020

// *************************  Rentals Table Fields  *************************

// resetRentalId()
  // setsRentalId to start

// generate rentaIid()
  // returns rentalId
  // increments rentalId

// generatePrice()
  // generate prices of 100-199
  // price: Math.floor(Math.random() * 100) + 100;
  // return result

// generateMaxGuests()
  // generate max # of guests from 2-5
  // max_guests: Math.floor(Math.random() * 4) + 2;

// generateReviews()
  // generate number of reviews from 3-20
  // numReviews: Math.floor(Math.random() * 18) + 3,

// generateAveStars()
  // generate average stars from 3.00 - 5.00 (rounded to two decimal places)
  // avgStars: Math.round(((Math.random() * 2) + 3) * 100) / 100

// generateFee()
  // generate fees from 50-99
  // Math.floor(Math.random() * 50) + 50,

// generateRental()
  // call each above
  // assmble an object
  // return said object

// generateRentals(num)
  // iterates to num
    // generates a rental and stores in an array
  // returns array


// *************************  Dates Table  *************************

// resetDateId()
  // sets to dateID start

// getNextDateId()
  // return dateID
  // increment dateID

// getDateForId(dateId)
  // computes and returns date in yyyy/mm/dd for given date id

// generateDates()
  // use dateId 30 times
  // call isDateAvailable, if true
    // call getDateForId and add string to results array
  // return array of dates


// *************************  rentals_dates Table

// isDateAvailable()
  // randomly return true or false

// generateSetDateIds()
  // goes through all 91 days
    // if isDateAvailable
      // add to results list
  // return results list

