const request = require("request");
const geoCode = require("./utils/geocode");
const openMap = require("./utils/openmap");
geoCode("New Delhi", (error, {latitude,longitude}) => {
  if (error) {
    return console.log(error);
  }
  openMap({latitude,longitude}, (error, response) => {
    if (error) {
      return console.log(error);
    }
    console.log(response);
  });
});
