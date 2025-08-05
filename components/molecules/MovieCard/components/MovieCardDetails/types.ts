import { Movie } from '@/types';
/**
 * @param { Movie } movie The movie object to display
 * @param { function } onPress The function to call when the view more button is pressed
 * @description Props for the MovieCardDetailsProps component
 */
export interface MovieCardDetailsProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}