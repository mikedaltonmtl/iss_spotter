const request = require('request');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
   
  // fetch IP address from JSON API (fetchMyIP) ---------------------------------------------
  const url = `https://api.ipify.org?format=json`;

  request(url, (error, response, body) => {

    // return any errors to the callback function
    if (error) {
      const errorMessage = `A ${error.code} error occurred while trying to connect to the following api (${error.hostname}):\nThe details are as follows:\n${error}`;

      callback(Error(errorMessage), null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // deserialize body into a nodeJS object
    const ip = JSON.parse(body);

    // check that some data has been returned
    if (!ip) {
      // return error message to callback funtion then exit
      const errorMessage = `The url (${url}) did not return an IP address, sorry.`;

      callback(Error(errorMessage), null);
      return;
    }

    // we have an IP address, now use the fetchCoordsByIP functionnality ------------------
    const url = `https://ipwho.is/${ip['ip']}`;

    request(url, (error, response, body) => {

      // return any errors to the callback function
      if (error) {
        const errorMessage = `A ${error.code} error occurred while trying to connect to the following api (${error.hostname}):\nThe details are as follows:\n${error}`;

        callback(Error(errorMessage), null);
        return;
      }
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      // deserialize body into a nodeJS object
      const data = JSON.parse(body);

      // check that some data has been returned
      if (!data) {
        // return error message to callback funtion then exit
        const errorMessage = `The url (${url}) did not return any data, sorry.`;

        callback(Error(errorMessage), null);
        return;
      }
      // we have data returned, check the object to see if it was a success
      if (!data['success']) {

        callback(Error(`IP address ${ip} is invalid.`), null);
        return;
      }

      // data returned successfully, data contains the latitude & longitude fields
      // using the coordinates, move on with fetchISSFlyOverTimes ----------------------
      const latitude = data.latitude;
      const longitude = data.longitude;

      const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

      request(url, (error, response, body) => {

        // return any errors to the callback function
        if (error) {
          const errorMessage = `A ${error.code} error occurred while trying to connect to the following api (${error.hostname}):\nThe details are as follows:\n${error}`;

          callback(Error(errorMessage), null);
          return;
        }

        // if non-200 status, assume server error
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }

        // deserialize body into a nodeJS object
        const data = JSON.parse(body);

        // check that some data has been returned
        if (!data) {
          // return error message to callback funtion then exit
          const errorMessage = `The url (${url}) did not return any data, sorry.`;

          callback(Error(errorMessage), null);
          return;
        }

        // we have data returned, check the object to see if it was a success
        if (data['message'] !== 'success') {

          callback(Error(`Invalid request: latitude ${latitude}, longitude ${longitude}.`), null);
          return;
        }

        // data returned successfully, return just the response array of flyovers
        callback(null, data['response']);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };