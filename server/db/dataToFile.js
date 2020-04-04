fs = require('fs');
dataGen = require('./dataGen.js');

const rentalFileName = 'rentals.csv';




const writeRentals = () => {
  const rentalFile = fs.openSync(rentalFileName, 'w');
  fs.writeSync(rentalFile, dataGen.getRentalHeader());
  for (let i = 0; i < 10000000; i += 1) {
    fs.writeSync(rentalFile, dataGen.generateRentalCSVLine());
  }
  fs.closeSync(rentalFile);
  console.log('done');
}




writeRentals();






/*  This works - sync writing to file doesn't cause data backpressure

const testing = () => {
    var dataStream = fs.openSync('testData.txt', 'w');
    for (let i = 0; i < 10000000; i += 1) {
      fs.writeSync(dataStream, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia   deserunt mollit anim id est laborum.\n');
    }
    fs.closeSync(dataStream);
    console.log('done writing 1M');
    // resolve('done making 2M');
  // });
}
testing();
*/

/*    -- used for testing writing to a file -> will write 5M at once w/out crash
      -- this should word with addition of a drain
const writeFive = function(callback) {
  var dataStream = fs.createWriteStream('testData.txt', {flags: 'a'});
  for (let i = 0; i < 5000000; i += 1) {
    dataStream.write(i + '  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia   deserunt mollit anim id est laborum.\n');
  }
  dataStream.end((result) => {
    callback(result);
  });
}
*/