import { useState, useEffect, useCallback } from "react";
import { movieService } from "@/services";
import { MovieDetails } from "@/types";
import { UseMovieDetails } from "./types";

export const useMovieDetails = (movieID: number | null): UseMovieDetails => {

  // * MARK - Hook Variables

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading]       = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // * MARK - Functions

  /** @description function that fetches the details of a movie */
  const fetchMovieDetails = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await movieService.getMovieDetails(id);
      setMovieDetails(response);

    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : `Failed to fetch the details of the movie`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** @description function that refetches the details of a movie */
  const refetchMovieDetails = useCallback( async () => {
    if (movieID) await fetchMovieDetails(movieID);
  }, [movieID, fetchMovieDetails]);

  // * MARK - useEffect Hooks (Component life cycle)
  
  useEffect(() => {
    if (movieID) {
      fetchMovieDetails(movieID);
    } else {
      setMovieDetails(null);
      setErrorMessage(null)
    }
  }, [movieID, fetchMovieDetails]);

  return {
    movieDetails,
    isLoading,
    errorMessage,
    refetchMovieDetails
  }
}