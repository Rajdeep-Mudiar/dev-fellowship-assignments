import { useState } from "react";
import Search from "./search";
import "./weather.css"; // We'll create this file for styling!

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchWeatherData() {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");
      
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    fetchWeatherData();
  }

  return (
    <div className="weather-container">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading && <div className="weather-loading">Loading weather data...</div>}
      {error && <div className="weather-error">{error}</div>}
      {!loading && !error && weatherData && (
        <div className="weather-card">
          <h2 className="city-name">{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
          <div className="weather-description">{weatherData.weather[0].description}</div>
          <div className="weather-details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
