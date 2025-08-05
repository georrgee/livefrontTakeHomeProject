import { Movie } from "@/types";
import { SharedValue } from "react-native-reanimated";
/**
 * @param { Movie[] } data The list of movies to display
 * @param { SharedValue<number> } scrollX The shared value for the scroll position
 * @param { boolean } isOpened Whether the pagination is opened or not
 * @description Props for the MoviePagination Molecule component
 */
export interface MoviePaginationProps {
  data:       Movie[];
  scrollX:    SharedValue<number>;
  isOpened?:  boolean;
}