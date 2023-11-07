import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherFromCityName = (cityName) => {
  //   return axios
  //     .get(
  //       `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`
  //     )
  //     .then((res) => {
  //       const responseData = res.data[0];

  //       return [responseData.lat, responseData.lon];
  //     })
  //     .then(([latitude, long]) => {
  //       const lat = +latitude;
  //       const lon = +long;
  //       axios.get(
  //         `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
  //       );
  //     });
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
  );
};

export default { getWeatherFromCityName };
