const request = require("request");
const geoCode = (address, callback) => {
  const geoCodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoiaml0ZW5wYWxzcmEiLCJhIjoiY2tiM2xidXpyMDZyMzJxczBtbWlrcnY5ayJ9.J9AAu2W5uKOzxt-w-Ipafw&limit=1";

  request({ url: geoCodeURL, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid Request", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
