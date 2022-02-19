import axios from "axios";

export const getCurrentWeather = (city) => {
  const ACCESS_KEY = process.env.REACT_APP_API_KEY;
  const apiEndpoint = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${city}`;

  return axios
    .get(apiEndpoint)
    .then((response) => response.data)
    .catch(() => null);
};
