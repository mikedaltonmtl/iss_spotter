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
  // success, format and print the results to the console
  for (const pass of passTimes) {

    const dateObject = new Date(pass.risetime * 1000);

    const weekday = dateObject.toLocaleString("en-US", {weekday: "short"});
    const month = dateObject.toLocaleString("en-US", {month: "short"});
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    const timeZoneName = dateObject.toLocaleString("en-US", {timeZoneName: "short"});

    const duration = pass.duration;

    console.log(`Next pass at ${weekday} ${month} ${day} ${year} ${timeZoneName} for ${duration} seconds`);
  }
});