// Import necessary hooks from React
import React, { useState } from "react";

function App() {
  // State to hold the input city name
  const [city, setCity] = useState("");

  // State to hold the weather data fetched from API
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data from the API
  const getWeather = async () => {
    // Return early if no city is entered
    if (!city) return;

    // Get the API key from environment variables
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    // Construct the URL to fetch data from WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      // Fetch the weather data from the API
      const res = await fetch(url);
      const data = await res.json();

      console.log(data); // Debug log for inspecting the API response
      setWeather(data);  // Store the fetched data in state
    } catch (error) {
      // Handle any errors during fetch
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>🌤 Weather App</h2>

      {/* Input field for city name */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city state as user types
        style={{ padding: 8, marginRight: 10 }}
      />

      {/* Button to trigger weather fetch */}
      <button onClick={getWeather} style={{ padding: 8 }}>
        Get Weather
      </button>

      {/* If weather data is fetched and valid, display it */}
      {weather && weather.location && (
        <div style={{ marginTop: 20 }}>
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
        </div>
      )}

      {/* Show error if response doesn't contain valid data */}
      {weather && weather.error && (
        <p style={{ marginTop: 20, color: "red" }}>
          Error: {weather.error.message}
        </p>
      )}
    </div>
  );
}

export default App;
