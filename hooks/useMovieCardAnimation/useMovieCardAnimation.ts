import { useDerivedValue, useAnimatedStyle, interpolate, Extrapolation, withSpring } from 'react-native-reanimated';
import { SharedValue, measure } from 'react-native-reanimated';
import { CARD_ITEM_WIDTH, CARD_ITEM_HEIGHT, SPACING } from '@/constants';

export function useMovieCardAnimations(
  index: number,
  activeIndex: SharedValue<number>,
  scrollX: SharedValue<number>,
  ref: any
) {

  const isActiveSpringy = useDerivedValue(() => {
    return withSpring(activeIndex.value === index ? 1 : 0, {
      damping: 80,
      stiffness: 200,
    });
  }, [activeIndex.value, index]);

  const neighborsAnimation = useDerivedValue(() => {
    return activeIndex.value === -1 || Math.abs(activeIndex.value - index) > 1
      ? 0
      : interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [100, 0, -100],
        Extrapolation.CLAMP
      );
  });

  const detailsStylez = useAnimatedStyle(() => {
    const meas = measure(ref);
    if (meas === null) {
      return {};
    }
    return {
      transform: [
        {
          translateY: interpolate(
            isActiveSpringy.value,
            [0, 1],
            [0, meas.height],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const gradientContainerStylez = useAnimatedStyle(() => {
    return {
      width: interpolate(
        isActiveSpringy.value,
        [0, 1],
        [CARD_ITEM_WIDTH, CARD_ITEM_WIDTH + SPACING * 2],
        Extrapolation.CLAMP
      ),
    };
  });

  const cardStylez = useAnimatedStyle(() => {
    const meas = measure(ref);
    return {
      transform: [
        {
          translateX: withSpring(neighborsAnimation.value, {
            damping: 80,
            stiffness: 200,
          }),
        },
        {
          translateY: meas?.height
            ? interpolate(
              isActiveSpringy.value,
              [0, 1],
              [0, -meas.height / 2]
            )
            : 0,
        },
      ],
    };
  });

  return {
    isActiveSpringy,
    detailsStylez,
    gradientContainerStylez,
    cardStylez,
  };
}