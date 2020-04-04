fs = require('fs');
dataGen = require('./dataGen.js');


const writeFive = function(callback) {
  var dataStream = fs.createWriteStream('testData.txt', {flags: 'a'});
  for (let i = 0; i < 5000000; i += 1) {
    dataStream.write(i + '  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia   deserunt mollit anim id est laborum.\n');
  }
  dataStream.end((result) => {
    callback(result);
  });
}


// writeFive((result) => {
//   console.log('done writing', result);
// });

const testing = () => {
  // return new Promise((resolve, reject) => {
    // var dataStream = fs.createWriteStream('testData.txt', {flags: 'a'});
    var dataStream = fs.openSync('testData.txt', 'a');
    for (let i = 0; i < 10000000; i += 1) {
      fs.writeSync(dataStream, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia   deserunt mollit anim id est laborum.\n');
    }
    fs.closeSync(dataStream);
    console.log('done writing 1M');
    // resolve('done making 2M');
  // });
}

testing();


// testing()
//   .then((results) => {
//     console.log(results);
//     return testing();
//   })
//   .then((results) => {
//     console.log(results);
//     return testing();
//   })
//   .then((results) => {
//     console.log(results);
//     return testing();
//   })
//   .then((results) => {
//     console.log(results);
//     return testing();
//   })
//   .then((results) => {console.log(results)})
//   .catch((err) => {console.error(err)});