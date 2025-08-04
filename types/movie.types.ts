export interface Movie {
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
};

export interface MovieDetails extends Movie {
  budget:               number
  genres:               Genre[];
  runtime:              number;
  production_companies: ProductionCompany[];
  status:               string;
  tagline:              string;
  homepage:             string;
  revenue:              number;
};

export interface Genre {
  id:   number;
  name: string;
};

export interface ProductionCompany {
  logo_path: string | null;
  name:      string;
}

export interface PopularMovieResponse {
  results: Movie[];
  total_pages: number;
}
