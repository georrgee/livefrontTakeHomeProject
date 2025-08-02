import { PopularMovieResponse } from "@/types";
/** 
 * @param { PopularMovieResponse | null } popularMovies the list of movies based on popularity
 * @param { boolean } isLoading Boolean to check if it is in the loading state
 * @param { string | null } errorMessage The error message 
 * @param { () => Promise<void>} refetch Function to fetch movies again
 * @param { () => Promise<void>} loadMorePopularMovies Function that loads more popular movies
 * @param { boolean } hasNextPage Boolean that checks if there is another page of data 
 * @description The expected data after fetching  */
export interface UsePopularMovies {
  popularMovies:         PopularMovieResponse | null;
  isLoading:             boolean;
  errorMessage:          string | null;
  refetchPopularMovies:  () => Promise<void>;
  loadMorePopularMovies: () => Promise<void>;
  hasNextPage:           boolean;
};