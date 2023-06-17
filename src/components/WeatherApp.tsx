import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [city, setCity] = useState("");

  const fetchWeatherData = async () => {
    try {
      const apiKey = "7c879a8831e9774036fb695c9b88c45a";
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  };

  const getWeatherData = () => {
    if (city !== "") {
      fetchWeatherData();
    } else {
      alert("Please enter a city name");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
  });

  if (isLoading) {
    return <h1>Loading......</h1>;
  }

  if (isError) {
    return <div>Error occurred while fetching weather data.</div>;
  }

  return (
    <>
      <div className="container">
        <div className="weather-card">
          <div className="input-container">
            <label className="Label">Enter the city name</label>
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                placeholder="Enter the city name...?"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <button className="submit" type="submit" onClick={getWeatherData}>
                Submit
              </button>
            </div>
          </div>
          {data && city !== "" && data.main && data.weather && (
            <div className="Data">
              <h2>Weather Data:</h2>
              <p>City: {data.name}</p>
              {data.main.temp && (
                <p>
                  Temperature: {data.main.temp}°C / Max: {data.main.temp_max}°C
                  / Min: {data.main.temp_min}°C
                </p>
              )}
              {data.weather[0].main && <p>Condition: {data.weather[0].main}</p>}
              {data.weather[0].description && (
                <p>Description: {data.weather[0].description}</p>
              )}
              {data.main.humidity && <p>Humidity: {data.main.humidity}%</p>}
              {data.wind && <p>Wind Speed: {data.wind.speed} m/s</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
