const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
} = require('./iss');

// callback function to test fetchMyIP function in iss.js
/*
fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/

// callback function to test fetchCoordsByIP function in iss.js
/*
const ip = "72.10.160.134";

fetchCoordsByIP(ip, (error, data) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned data:', data);
});
*/
const coordinates = { latitude: 45.5016889, longitude: -73.567256 };

fetchISSFlyOverTimes(coordinates, (error, response) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Responses returned :', response);

});
