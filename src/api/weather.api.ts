import { useQuery } from "@tanstack/react-query";
import { API } from "./API";

const fetchWeatherData = async () => {
    try {
      const response = await API.get(
        `onecall?lat=27.67872797357339&lon=84.42956953293776`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        //log in dev, send to sentry in prod
        console.log(e.message);
      }
    }
  };

export const useWeather = () => {
    return useQuery({
        queryKey: ["weatherData"],
        queryFn: fetchWeatherData,
        enabled: false,
        retry: false,
        onError: (e: Error) => {
          console.log(e.message)
        },
      });
}