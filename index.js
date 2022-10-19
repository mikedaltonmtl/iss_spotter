const { fetchMyIP } = require('./iss');

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