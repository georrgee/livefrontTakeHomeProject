import { Gesture, Directions } from "react-native-gesture-handler";
import { SharedValue } from 'react-native-reanimated';

export function useMovieCardGestures(index: number, activeIndex: SharedValue<number>) {
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      activeIndex.value = index;
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      activeIndex.value = -1;
    });

  return Gesture.Exclusive(flingUp, flingDown);
};