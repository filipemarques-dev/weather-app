import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

function Weather() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    }

    fetchWeather();
  }, [city]);

  if (!weather) return <p>Loading...</p>;
  if (weather.cod !== 200) return <p>City not found.</p>;

  return (
    <div className="weather-card">
      <h2>Weather in {weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>🌡️ Temp: {weather.main.temp}°C</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
