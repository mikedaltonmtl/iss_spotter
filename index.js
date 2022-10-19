const {
  fetchMyIP,
  fetchCoordsByIP,
} = require('./iss');

// callback function to test fetchMyIP function in iss.js
/*
fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip['ip']);
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
