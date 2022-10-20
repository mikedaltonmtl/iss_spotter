const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Function to print ISS flyover times to console or display error message
 * If there is no error, the 'error' parameter will be null
 * If there is an error, the 'passTimes' parameter will be null
 */
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});