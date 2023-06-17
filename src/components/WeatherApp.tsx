import React, { useState } from "react";

import "./WeatherApp.css";
import { useWeather } from "@/api/weather.api";

export const WeatherApp = () => {
  const [city, setCity] = useState("");

  const { data, isFetching, refetch } = useWeather();

  console.log({ data });

  if (isFetching) {
    return <h1>Loading......</h1>;
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
              <button
                className="submit"
                type="submit"
                disabled={!city}
                onClick={() => refetch()}
              >
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
