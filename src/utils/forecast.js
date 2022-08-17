const request = require("request");

function forecast(long, lat, callback) {
  const url = `http://api.weatherstack.com/current?access_key=b50b5b6fc90add5f75d6c8695d8d0326&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.error) {
      callback("Incorrect Location");
    } else {
      const currentWeatherData = body.current;
      const weatherDescription = currentWeatherData.weather_descriptions[0];
      const temperature = currentWeatherData.temperature;
      const feelslike = currentWeatherData.feelslike;
      callback(undefined, { weatherDescription, temperature, feelslike });
    }
  });
}

module.exports = forecast;
