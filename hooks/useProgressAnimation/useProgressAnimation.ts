import { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';
import { PAGINATION_CONSTANTS } from '@/constants';

export const useProgressAnimation = (
  scrollX: SharedValue<number>,
  totalItems: number,
  isOpened: boolean
) => {

  const progressStyle = useAnimatedStyle(() => {
    
    const progress = (scrollX.value + 1) / totalItems;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    return {
      width: withSpring(
        PAGINATION_CONSTANTS.PROGRESS_BAR_WIDTH * clampedProgress,
        PAGINATION_CONSTANTS.SPRING_CONFIG
      ),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const shouldShow = totalItems >= PAGINATION_CONSTANTS.MIN_ITEMS_FOR_PROGRESS_BAR && !isOpened;
    return {
      opacity: withTiming(shouldShow ? 1 : 0, {
        duration: PAGINATION_CONSTANTS.ANIMATION_DURATION.OPACITY_TRANSITION,
      }),
    };
  });

  return { progressStyle, containerStyle };
};