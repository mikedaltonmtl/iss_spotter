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
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };