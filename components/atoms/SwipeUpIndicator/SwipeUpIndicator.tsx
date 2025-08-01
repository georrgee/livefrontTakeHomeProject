import { ChevronUp } from 'lucide-react-native'
import { ViewStyle, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence
} from "react-native-reanimated";
import { useEffect } from "react";

const SwipeUpIndicator = ({
  size = 24,
  isOpened,
  style,
}: {
  isOpened: boolean;
  size?: number;
  style?: ViewStyle;
}) => {
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);
  const rotation = useSharedValue(0);

  // Animate rotation when opened/closed
  useEffect(() => {
    rotation.value = withSpring(isOpened ? 180 : 0, {
      damping: 80,
      stiffness: 200,
    });
  }, [isOpened]);

  // Animate opacity with staggered effect
  useEffect(() => {
    const animate = () => {
      opacity1.value = withSequence(
        withTiming(1, { duration: 750 }),
        withTiming(0.3, { duration: 750 })
      );

      setTimeout(() => {
        opacity2.value = withSequence(
          withTiming(1, { duration: 750 }),
          withTiming(0.3, { duration: 750 })
        );
      }, 250);

      setTimeout(() => {
        opacity3.value = withSequence(
          withTiming(1, { duration: 750 }),
          withTiming(0.3, { duration: 750 })
        );
      }, 500);
    };

    animate();
    const interval = setInterval(animate, 1500);
    return () => clearInterval(interval);
  }, []);

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const opacity1Style = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const opacity2Style = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const opacity3Style = useAnimatedStyle(() => ({
    opacity: opacity3.value,
  }));

  return (
    <Animated.View style={style} entering={FadeIn} exiting={FadeOut}>
      <View style={{ alignItems: 'center' }}>
        <Animated.View style={[rotationStyle, opacity3Style, { marginBottom: -size * 0.5 }]}>
          <ChevronUp size={size} color="#fff" />
        </Animated.View>
        <Animated.View style={[rotationStyle, opacity2Style, { marginBottom: -size * 0.5 }]}>
          <ChevronUp size={size} color="#fff" />
        </Animated.View>
        <Animated.View style={[rotationStyle, opacity1Style]}>
          <ChevronUp size={size} color="#fff" />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SwipeUpIndicator;