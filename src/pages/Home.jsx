import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "a39bb7ece9094a31d72aa8a843fb94cf";

function Home() {
  const [city, setCity] = useState("");
  const [locationWeather, setLocationWeather] = useState(null);
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          //Fetch One Call API for current + daily forecast
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();

          if (data.cod !== "200") {
            setError("Failed to fetch forecast.");
            return;
          }

          const groupedByDay = {};

          data.list.forEach((entry) => {
            const date = entry.dt_txt.split(" ")[0];
            if (!groupedByDay[date] && entry.dt_txt.includes("12:00:00")) {
              groupedByDay[date] = entry;
            }
          });

          const selectedForecasts = Object.values(groupedByDay).slice(0, 5);

          setLocationWeather(data.city);
          setDailyForecasts(selectedForecasts);
        } catch (err) {
          setError("Error fetching weather data.");
        }
      },
      () => setError("Permission to access location was denied.")
    );
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {locationWeather && (
        <div className="weather-card" style={{ marginTop: "2rem" }}>
          <h2>Forecast for {locationWeather.name}</h2>
        </div>
      )}

      {dailyForecasts.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>5-Day Forecast</h3>
          <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
            {dailyForecasts.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const dayName = date.toLocaleDateString(undefined, {
                weekday: "short",
              });

              return (
                <div
                  key={index}
                  className="weather-card"
                  style={{ minWidth: "120px", flex: "none" }}
                >
                  <p>{dayName}</p>
                  <p>{forecast.weather[0].main}</p>
                  <p>🌡️ {forecast.main.temp}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
