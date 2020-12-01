const request = require("request");
const openMap = ({latitude,longitude}, callback) => {
  const openMapURL =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=dc6ba59dc2a6cf5ab444502c61798f25";
  //console.log(openMapURL);
  request({ url: openMapURL, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the Server", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, {
        location: body.name,
        description: body.weather[0].description,
      });
    }
  });
};
module.exports = openMap;
