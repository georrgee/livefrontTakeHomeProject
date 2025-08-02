import { useMemo } from "react";
import { movieService } from "@/services";
import { UseMovieImages } from "./types";

export const useMovieImages = (): UseMovieImages => {
  return useMemo(() => ({
    getPosterUrl: movieService.getPosterImage,
    getBackdropUrl: movieService.getBackdropImage,
    getImageUrl: movieService.getImageURL
  }), []);
};