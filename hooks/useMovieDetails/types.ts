import { MovieDetails } from "@/types";
/** 
 * @param { MovieDetails | null } movieDetails the details of a movie
 * @param { boolean } isLoading Boolean to check if it is in the loading state
 * @param { string | null } errorMessage The error message 
 * @param { () => Promise<void>} refetchMovieDetails Function to fetch the movie again
 * @description The expected data after fetching a specific movie based on id */
export interface UseMovieDetails {
  movieDetails:        MovieDetails | null;
  isLoading:           boolean;
  errorMessage:        string | null;
  refetchMovieDetails: () => Promise<void>;
};