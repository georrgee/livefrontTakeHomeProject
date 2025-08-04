import { Movie } from "@/types";
import { SharedValue } from "react-native-reanimated";
/**
 * @param { Movie } movie The movie object to display
 * @param { number } index The index of the movie in the list
 * @param { SharedValue<number> } scrollX The shared value for the scroll position
 * @param { SharedValue<number> } activeIndex The shared value for the active index
 * @param { function } onPress The function to call when the card is pressed
 * @param { boolean } isOpened Whether the card is opened or not
 * @param { number } currentIndex The current index of the movie in the list
 * @description Props for the MovieCard Molecule component
 */
export type MovieCardProps = {
  movie:        Movie;
  index:        number;
  scrollX:      SharedValue<number>;
  activeIndex:  SharedValue<number>;
  onPress?:     (movie: Movie) => void;
  isOpened:     boolean;
  currentIndex: number;
};