import axios from "axios";

export const API = axios.create({
    baseURL: 'https://api.openweathermap.org/data/3.0/',
    params: {
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
    }
})