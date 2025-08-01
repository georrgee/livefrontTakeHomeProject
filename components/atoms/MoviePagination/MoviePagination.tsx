import { memo } from "react";
import Animated, {
  FadeInDown,
  FadeOutDown,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Movie } from "@/types";

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
};

const DOT_SIZE = 8;
const DOT_SPACING = DOT_SIZE * 1.5;
const DOT_COLOR = "#A5A9AB";
const INDICATOR_BORDER_COLOR = "#FFD700";
const INDICATOR_BORDER_SIZE = DOT_SIZE * 0.4;

function Dot({ index, scrollX }: DotProps) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 0.5, index, index + 0.5],
        [1, 0, 1]
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: DOT_COLOR,
        },
        stylez,
      ]}
    />
  );
}

function PaginationIndicator({ scrollX }: { scrollX: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: scrollX.value * (DOT_SIZE + DOT_SPACING),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: -INDICATOR_BORDER_SIZE,
          left: -INDICATOR_BORDER_SIZE,
          width: DOT_SIZE + INDICATOR_BORDER_SIZE * 2,
          height: DOT_SIZE + INDICATOR_BORDER_SIZE * 2,
          borderRadius: (DOT_SIZE + INDICATOR_BORDER_SIZE * 2) / 2,
          borderWidth: INDICATOR_BORDER_SIZE,
          borderColor: INDICATOR_BORDER_COLOR,
        },
        stylez,
      ]}
    />
  );
}

export const MoviePagination = memo(
  ({
    data,
    scrollX,
  }: {
    data: Movie[];
    scrollX: SharedValue<number>;
  }) => {
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        style={[
          {
            flexDirection: "row",
            gap: DOT_SPACING,
            position: "absolute",
            bottom: 100,
            alignSelf: "center",
            zIndex: 1,
          },
        ]}>
        {data.map((_, index) => {
          return <Dot key={`dot-${index}`} index={index} scrollX={scrollX} />;
        })}
        <PaginationIndicator scrollX={scrollX} />
      </Animated.View>
    );
  }
);

export default MoviePagination;