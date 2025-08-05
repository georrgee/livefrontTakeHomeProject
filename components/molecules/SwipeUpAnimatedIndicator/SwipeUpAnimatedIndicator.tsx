import React from 'react';
import { ViewStyle, View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ChevronAnimatedItem } from '@/components/atoms';
import { useSwipeIndicatorAnimation } from '@/hooks';
import { SWIPE_INDICATOR_CONFIG } from '@/constants';
import { SwipeUpIndicatorProps } from './types';

const SwipeUpAnimatedIndicator: React.FC<SwipeUpIndicatorProps> = (props) => {

  const {
    size = SWIPE_INDICATOR_CONFIG.DEFAULT_SIZE,
    isOpened,
    style,
  } = props;

  const colorScheme  = useColorScheme();
  const chevronColor = Colors[colorScheme ?? 'light'].text;
  const marginBottom = -size * SWIPE_INDICATOR_CONFIG.MARGIN_RATIO;

  const animatedStyles = useSwipeIndicatorAnimation(isOpened);

  return (
    <Animated.View style={[style, animatedStyles.container]} entering={FadeIn} exiting={FadeOut}>
      <View style={{ alignItems: 'center' }}>
        <ChevronAnimatedItem
          size={size}
          color={chevronColor}
          rotationStyle={animatedStyles.rotation}
          opacityStyle={animatedStyles.opacity3}
          marginBottom={marginBottom} />
        
        <ChevronAnimatedItem
          size={size}
          color={chevronColor}
          rotationStyle={animatedStyles.rotation}
          opacityStyle={animatedStyles.opacity2}
          marginBottom={marginBottom} />

        <ChevronAnimatedItem
          size={size}
          color={chevronColor}
          rotationStyle={animatedStyles.rotation}
          opacityStyle={animatedStyles.opacity1} />
      </View>
    </Animated.View>
  );
};

export default SwipeUpAnimatedIndicator;