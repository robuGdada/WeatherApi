import { API } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useWeatherApi = () => {
  const weatherQuery = useQuery({
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
  });
  return weatherQuery;
};

const fetchWeatherData = async () => {
  try {
    const [city, setCity] = useState("");

    const response = await API.get(`&q=${city}`);
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
};
