export interface Movie {
  adult:             boolean;
  backdrop_path:     string | null;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string | null;
  release_date:      string; //TODO: see if we need to do some parsing later on
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
};

export interface MovieDetails extends Movie {
  budget:               number
  genres:               Genre[];
  runtime:              number;
  production_companies: ProductionCompany[];
  spoken_languages:     SpokenLanguage[];
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
  //id:   number;
  logo_path: string | null;
  name:      string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1:    string;
  name:         string;
};

export interface PopularMovieResponse {
  page:          number;
  results:       Movie[];
  total_pages:   number;
  total_results: number;
}
