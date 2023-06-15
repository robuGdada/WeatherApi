import React, { useState } from "react";
import { useWeatherApi } from "@/hooks";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const getCity = () => city;
  const { data, isLoading, isError } = useWeatherApi();

  //   if (isLoading) {
  //     return <h1>Loading......</h1>;
  //   }
  if (isError) {
    return <div>Error occurred while fetching weather data.</div>;
  }

  const { location, current } = data || {};
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
      <button className="submit" type="submit">
        Submit
      </button>

      {city !== "" && location && current && (
        <div className="Data">
          <h2>Weather Data:</h2>
          <p>City: {location.name}</p>
          <p>Temperature: {current.temp_c}°C</p>
          <p>Condition: {current.condition.text}</p>
        </div>
      )}
    </div>
  );
};
