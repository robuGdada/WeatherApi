import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const WeatherApp = () => {
  const [city, setCity] = useState("");

  const fetchWeatherData = async () => {
    try {
      const apiKey = "7c879a8831e9774036fb695c9b88c45a";
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
      );
      const data = response.data;
      const temperatureCelsius = data.main.temp - 273.15; // Convert temperature from Kelvin to Celsius
      const modifiedData = {
        ...data,
        main: { ...data.main, temp: temperatureCelsius },
      }; // Update the temperature value
      return modifiedData;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  };

  const getWeatherData = () => {
    if (city !== "") {
      fetchWeatherData();
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
    <div className="container">
      <label className="Label">Enter the city name:</label>
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

      {data && city !== "" && data.main && data.weather && (
        <div className="Data">
          <h2>Weather Data:</h2>
          <p>City: {data.name}</p>
          {data.main.temp && (
            <p>Temperature: {data.main.temp.toFixed(2)}°C</p>
          )}{" "}
          {/* Fixed to 2 decimal places */}
          {data.weather[0].main && <p>Condition: {data.weather[0].main}</p>}
        </div>
      )}
    </div>
  );
};
