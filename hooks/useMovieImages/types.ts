/**
 * @param path The path of the image
 * @param size The size of the image
 * @description Interface for the useMovieImages hook
 */
export interface UseMovieImages {
  getPosterUrl: (path: string | null, size?: string) => string | null;
  getBackdropUrl: (path: string | null, size?: string) => string | null;
  getImageUrl: (path: string | null, size?: string) => string | null;
};