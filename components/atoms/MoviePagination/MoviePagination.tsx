import { memo } from "react";
import Animated, {
  FadeInDown,
  FadeOutDown,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Movie } from "@/types";

const ACTIVE_DOT_COLOR = "#FFD700";
const MAX_VISIBLE_DOTS = 7; // Always odd number for symmetry
const PROGRESS_BAR_WIDTH = 80;
const PROGRESS_BAR_HEIGHT = 3;

function ProgressIndicator({
  scrollX,
  totalItems,
  isOpened
}: {
  scrollX: SharedValue<number>;
  totalItems: number;
  isOpened: boolean;
}) {
  const progressStyle = useAnimatedStyle(() => {
    const progress = (scrollX.value + 1) / totalItems;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    return {
      width: withSpring(PROGRESS_BAR_WIDTH * clampedProgress, {
        damping: 20,
        stiffness: 100,
      }),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const shouldShow = totalItems > MAX_VISIBLE_DOTS && !isOpened;
    return {
      opacity: withTiming(shouldShow ? 1 : 0, {
        duration: 300,
      }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: PROGRESS_BAR_WIDTH,
          height: PROGRESS_BAR_HEIGHT,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: PROGRESS_BAR_HEIGHT / 2,
          overflow: "hidden",
          marginBottom: 12,
        },
        containerStyle,
      ]}>
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: ACTIVE_DOT_COLOR,
            borderRadius: PROGRESS_BAR_HEIGHT / 2,
          },
          progressStyle,
        ]}
      />
    </Animated.View>
  );
}

export const MoviePagination = memo(
  ({
    data,
    scrollX,
    isOpened = false,
  }: {
    data: Movie[];
    scrollX: SharedValue<number>;
    isOpened?: boolean;
  }) => {

    const totalItems = data.length;

    if (totalItems <= 1) return null;

    return (
      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutDown.duration(300)}
        style={{
          position: "absolute",
          bottom: 100,
          alignSelf: "center",
          zIndex: 1,
          alignItems: "center",
        }}>
        <ProgressIndicator scrollX={scrollX} totalItems={totalItems} isOpened={isOpened} />
      </Animated.View>
    );
  }
);

export default MoviePagination;