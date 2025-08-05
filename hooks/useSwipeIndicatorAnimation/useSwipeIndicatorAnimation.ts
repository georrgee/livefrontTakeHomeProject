import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { AnimationConfig } from './types';

const DEFAULT_CONFIG: AnimationConfig = {
  staggerDelay: 250,
  animationDuration: 750,
  cycleDuration: 1500,
  rotationConfig: {
    damping: 80,
    stiffness: 200,
  },
  fadeConfig: {
    duration: 300,
  },
};

export const useSwipeIndicatorAnimation = (isOpened: boolean, config: Partial<AnimationConfig> = {} ) => {
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);
  const rotation = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    rotation.value = withSpring(
      isOpened ? 180 : 0,
      finalConfig.rotationConfig
    );
    
    containerOpacity.value = withTiming(
      isOpened ? 0 : 1,
      finalConfig.fadeConfig
    );
  }, [isOpened, finalConfig]);

  useEffect(() => {
    if (isOpened) return;

    const createOpacityAnimation = () => 
      withSequence(
        withTiming(1, { duration: finalConfig.animationDuration }),
        withTiming(0.3, { duration: finalConfig.animationDuration })
      );

    const animate = () => {
      opacity1.value = createOpacityAnimation();
      
      setTimeout(() => {
        opacity2.value = createOpacityAnimation();
      }, finalConfig.staggerDelay);
      
      setTimeout(() => {
        opacity3.value = createOpacityAnimation();
      }, finalConfig.staggerDelay * 2);
    };

    animate();
    const interval = setInterval(animate, finalConfig.cycleDuration);
    return () => clearInterval(interval);
  }, [isOpened, finalConfig]);

  const animatedStyles = {
    rotation: useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    })),

    container: useAnimatedStyle(() => ({
      opacity: containerOpacity.value,
    })),

    opacity1: useAnimatedStyle(() => ({
      opacity: opacity1.value,
    })),

    opacity2: useAnimatedStyle(() => ({
      opacity: opacity2.value,
    })),

    opacity3: useAnimatedStyle(() => ({
      opacity: opacity3.value,
    })),
  };

  return animatedStyles;
};