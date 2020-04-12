const dbConnection = require('./index.js');

const query = 'SELECT * FROM rentals WHERE id = 509000001;';

dbConnection.cassie.execute(query)
  .then((result, extra1, extra2) => {
    const row = result.first();

    const id = row['id'];
    console.log('id:', id);

    const price = row['price']['_intVal']['bits_'][0];
    console.log('price:', price);

    const maxGuests = row['maxguests'];
    console.log('maxGuests:', maxGuests);

    const numReviews = row['numreviews'];
    console.log('numReviews:', numReviews);

    const avgStars = row['avgstars']['_intVal']['bits_'][0];
    console.log('avgStars:', avgStars);

    const cleaningFee = row['cleaningfee']['_intVal']['bits_'][0];
    console.log('cleaningFee:', cleaningFee);

    const occupancyFee = row['occupancyfee']['_intVal']['bits_'][0];
    console.log('occupancyFee:', occupancyFee);

    const serviceFee = row['servicefee']['_intVal']['bits_'][0];
    console.log('serviceFee:', serviceFee);

    const availability = row['availability'];
    // console.log('availability:', availability);
    const oneDate = availability[0];
    console.log('one date:', oneDate);
    console.log('date keys:', Object.keys(oneDate));
    console.log('date values', Object.values(oneDate));

    const oneDatePiece = oneDate['date'];
    console.log(oneDatePiece);
    console.log(typeof oneDatePiece);
    console.log('oneDatePiece keys:', Object.keys(oneDatePiece));
    console.log('oneDatePiece values', Object.values(oneDatePiece));

    /*  THIS WILL construct the date!  just get single digits for m & d
    const year = oneDate['year'];
    const month = oneDate['month'];
    const day = oneDate['day'];
    const dateString = `${year}-${month}-${day}`;
    console.log('assembled from y/m/d:', dateString);
    */



    // console.log('**price keys:', Object.keys(rowPrice));
    // console.log('**price values', Object.values(rowPrice));

    // const directPrice = result.rows[0].price;
    // console.log('equal?', rowPrice === directPrice);

    // console.log('price from row', row['price']);
    // console.log('RESULT:', result);
    // console.log('**all of price:', rowPrice);
    // console.log('**type of price', typeof rowPrice);
    // const maxGuests = result.rows[0].maxguests;
    // console.log('**type of guests', typeof maxGuests);

    // console.log('**row 0 id', result.rows[0].id);
    // console.log('**price', result.rows[0].price);
    // console.log('**maxguests', result.rows[0].maxguests);
    // console.log('**numreviews', result.rows[0].numreviews);
    // console.log('**avgstars', result.rows[0].avgstars);
    // console.log('**cleaningfee', result.rows[0].cleaningfee);
    // console.log('**occupancyfee', result.rows[0].occupancyfee);
    // console.log('**servicefee', result.rows[0].servicefee);

    // console.log('success!', result);
    // console.log('extras?', extra1);
    // console.log('more extras?', extra2);
    dbConnection.closeDb();
  })
  .catch((err) => {
    console.error('issue with query execution', err);
  });
