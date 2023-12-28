import React, { useState } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const API_KEY = '4718c43314591d097d17be1d1ccb39c6';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError('');
        setShowResult(true);
      } else {
        throw new Error('City not found. Please try again.');
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setShowResult(false);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Submit</button>
      </div>
      {showResult && (
        <div>
          {error && <p>{error}</p>}
          {weatherData ? (
            <div>
              <h2>Weather in {weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          ) : (
            <p>Enter a valid city name to get weather information.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
