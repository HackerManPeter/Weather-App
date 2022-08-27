const request = require("request");
require("dotenv").config();

function geoCode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEOCODE_TOKEN}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.features.length === 0) {
      callback("Unable to find location");
    } else {
      const features = body.features[0];
      const latitude = features.center[0];
      const longitude = features.center[1];
      const location = features.place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
}

module.exports = geoCode;
