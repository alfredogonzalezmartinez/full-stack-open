import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/weather/getCurrentWeather.js";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(
    () => getCurrentWeather(city).then((data) => setWeather(data)),
    [city]
  );

  return (
    <section>
      <h3>Weather in {city}</h3>
      {weather === null ? (
        <p>current weather not available</p>
      ) : (
        <>
          <p>temperature: {weather.current.temperature} Celsius</p>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0] + " weather icon"}
          />
          <p>
            wind: {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </p>
        </>
      )}
    </section>
  );
};

export default Weather;
