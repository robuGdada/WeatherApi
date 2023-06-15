import axios from "axios";

const apiKey = "87fdd156f20a41598e5161323231506 ";
export const API = axios.create({
    baseURL: `http://api.weatherapi.com/v1/current.json?key=${apiKey} `,
    timeout: 8000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
