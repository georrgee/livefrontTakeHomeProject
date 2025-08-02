import tmdbAPI from "./tmdbAPI";
import { IMAGE_BASE_URL } from "./tmdbAPI";
import { MovieDetails, PopularMovieResponse } from "@/types";
/** @description The business layer; contains the logic for fetching the actual data from the TMDB API */

export const movieService = {
  /** 
   * @description Fetches the popular movies
   * @returns { Promise<PopularMovieResponse> } A promise that resolves to the popular movies response */
  getPopularMovies: async (page: number = 1): Promise<PopularMovieResponse> => {
    const response = await tmdbAPI.get("/movie/popular", {
      params: {
        language: 'en-US',
        page
      }
    });

    return response.data;
  },

  /**
   * @description Fetches the details of a movie
   * @returns { Promise<MovieDetails> } A promise that resolves to movie details response */
  getMovieDetails: async (movieID: number): Promise<MovieDetails> => {
    const response = await tmdbAPI.get(`/movie/${movieID}`, {
      params: {
        language: 'en-US',
      }
    });

    return response.data;
  },

  /**
   * @description Helper function that will help us fetch the poster and backdrop image path
   * @returns { Promise<string | null> } A promise that resolves to the image url where its either a string or null */
  getImageURL: (pathURL: string | null, size: string = 'w500'): string | null => {
    if (!pathURL) return null;
    return `${IMAGE_BASE_URL}/${size}/${pathURL}`
  },

  /**
    * @description Function that fetches the poster image at a size of w500 (default)
    * @returns { Promise<string | null> } A promise that resolves to the poster image url */
  getPosterImage: (posterPath: string | null, size: string = 'w500'): string | null => {
    return movieService.getImageURL(posterPath, size)
  },

  /**
    * @description Function that fetches the backdrop image at a size of w500 (default)
    * @returns { Promise<string | null> } A promise that resolves to the poster image url */
  getBackdropImage: (backdropPath: string | null, size: string = 'w1280'): string | null => {
    return movieService.getImageURL(backdropPath, size)
  }
};

export default movieService;