const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  
  // fetch IP address from JSON API
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

    // we have an IP address, return the object to the callback function
    callback(null, ip['ip']);
  });
};

/**
 * Makes a single API request to retrieve the latitude & longitude from a user's IP address.
 * Input:
 *   - A callback (to pass back an error or the coordinates object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The coordinates as an object (null if error). Example: { latitude: 45.501 longitude -73.567 }
 */
const fetchCoordsByIP = function(ip, callback) {

  const url = `https://ipwho.is/${ip}`;

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

    // data returned successfully, return just the latitude & longitude fields
    const object = {
      latitude:   data.latitude,
      longitude:  data.longitude,
    };
    callback(null, object);
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};