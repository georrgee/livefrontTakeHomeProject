/**
 * @param { string | null } backdrop_path the backdrop image path of the movie
 * @param { number } id the id of the movie
 * @param { string } overview the overview of the movie
 * @param { string | null } poster_path the poster image path of the movie
 * @param { string } release_date the release date of the movie
 * @param { string } title the title of the movie
 * @param { number } vote_average the vote average of the movie
 * @description interface that represents a movie
 */
export interface Movie {
  backdrop_path: string | null;
  id:            number;
  overview:      string;
  poster_path:   string | null;
  release_date:  string;
  title:         string;
  vote_average:  number;
};

/**
 * @param { number } budget the budget of the movie
 * @param { Genre[] } genres the genres of the movie
 * @param { number } runtime the runtime of the movie
 * @param { ProductionCompany[] } production_companies the production companies of the movie
 * @param { string } status the status of the movie
 * @param { string } homepage the homepage of the movie
 * @param { number } revenue the revenue of the movie
 * @description interface that represents a movie with more details
 */
export interface MovieDetails extends Movie {
  budget:               number
  genres:               Genre[];
  runtime:              number;
  production_companies: ProductionCompany[];
  status:               string;
  homepage:             string;
  revenue:              number;
};

/**
 * @param { number } id the id of the genre
 * @param { string } name the name of the genre
 * @description interface that represents a genre
 */
export interface Genre {
  id:   number;
  name: string;
};

/**
 * @param { string | null } logo_path the logo path of the production company
 * @param { string } name the name of the production company
 * @description interface that represents a production company
 */
export interface ProductionCompany {
  logo_path: string | null;
  name:      string;
};

/**
 * @param { Movie[] } results the array of movies
 * @param { number } total_pages the total number of pages
 * @description interface that represents the response of the popular movies request
 */
export interface PopularMovieResponse {
  results:     Movie[];
  total_pages: number;
};