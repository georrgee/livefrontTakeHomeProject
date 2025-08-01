// models/MovieResponse.ts
import { Movie } from "./Movie";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
