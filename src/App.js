import React, { useState } from "react";
import axios from "axios";
import './App.css';

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "384ca1c202af419fbb971606242305";

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);  // Show loading state
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      window.alert("Failed to fetch weather data");
    } finally {
      setLoading(false);  // Hide loading state
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>

      {/* Display loading state while fetching */}
      {loading && <p className="loading">Loading data...</p>}

      {/* Display weather data when available */}
      {weatherData && !loading && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
