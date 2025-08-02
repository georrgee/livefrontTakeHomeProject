import axios from "axios";

const API_KEY  = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

/** @description The foundation layer; contains the axios instance setup with it's configuration (i.e: API Key, Base Url, Image Url) */
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  },

  timeout: 10000
});

tmdbAPI.interceptors.request.use((config) => {
  console.log('TMDB API REQUEST: ', config.url);
  return config
}, (error) => {
  return Promise.reject(error);
});

tmdbAPI.interceptors.response.use((response) => response, 
(error) => {
  console.error(`from tmdbAPI.ts; TMDB API ERROR: ${error.response?.data || error.message}`)
  return Promise.reject(error);
});


export default tmdbAPI;