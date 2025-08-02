import { useState, useEffect, useCallback } from "react";
import { movieService } from "@/services";
import { UsePopularMovies } from "./types";
import { PopularMovieResponse } from "@/types";

export const usePopularMovies = (initialPage: number = 1): UsePopularMovies => {

  // * MARK - Hook Variables
  const [popularMovies, setPopularMovies] = useState<PopularMovieResponse | null>(null);
  const [isLoading, setIsLoading]         = useState<boolean>(true);
  const [errorMessage, setErrorMessage]   = useState<string | null>(null);
  const [currentPage, setCurrentPage]     = useState<number>(initialPage);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // * MARK - Functions

  /** @description Fetches the popular movies from the TMDB API */
  const fetchPopularMovies = useCallback(async (page: number, append: boolean = false) => {
    try {
      if (!append) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      };

      setErrorMessage(null);

      const response = await movieService.getPopularMovies(page);

      setPopularMovies((previousMovies) => {
        if (append && previousMovies) {
          return {
            ...response,
            results: [...previousMovies.results, ...response.results]
          }
        }

        return response; 
    });

    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch popular movies");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  /** @description Function that refetches popular movies */
  const refetchPopularMovies = useCallback(async () => {
    setCurrentPage(1);
    await fetchPopularMovies(1, false);
  }, [fetchPopularMovies]);

  /** @description Function that loads more popular movies*/
  const loadMorePopularMovies = useCallback( async () => {
    
    const isCurrentPageLessThanTotalPages = popularMovies && currentPage < popularMovies.total_pages && !isLoadingMore;

    if (isCurrentPageLessThanTotalPages) {
      const nextPage: number = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchPopularMovies(nextPage, true);
    };
  }, [popularMovies, currentPage, isLoadingMore, fetchPopularMovies]);

  // * MARK - useEffect Hooks (Component life cycle)
  useEffect(() => {
    fetchPopularMovies(initialPage)
  }, [fetchPopularMovies, initialPage]);

  return {
    popularMovies,
    isLoading: isLoading || isLoadingMore,
    errorMessage,
    refetchPopularMovies,
    loadMorePopularMovies,
    hasNextPage: popularMovies ? currentPage < popularMovies.total_pages : false
  };
};