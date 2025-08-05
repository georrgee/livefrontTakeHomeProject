import { Movie } from '@/types';
import { SharedValue } from 'react-native-reanimated';
/**
 * @param { Movie } movie The movie object to display
 * @param { number } index The index of the movie in the list
 * @param { SharedValue<number> } scrollX The shared value for the scroll position
 * @description Props for the ParallaxForeground component
 */
export interface ParallaxForegroundProps {
  movie:   Movie;
  index:   number;
  scrollX: SharedValue<number>;
}