import React from 'react';
import { View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ChevronAnimatedItem } from '@/components/atoms';
import { useSwipeIndicatorAnimation } from '@/hooks';
import { SWIPE_INDICATOR_CONFIG } from '@/constants';
import { SwipeUpIndicatorProps } from './types';
/**
 * @param { number } size The size of the indicator
 * @param { boolean } isOpened Whether the indicator is opened
 * @param { ViewStyle } style The style of the indicator
 * @description An animated molecule component that animates when the user swipes up to show more content
 */
const SwipeUpAnimatedIndicator: React.FC<SwipeUpIndicatorProps> = (props) => {

  const {
    size = SWIPE_INDICATOR_CONFIG.DEFAULT_SIZE,
    isOpened,
    style,
  } = props;

  const colorScheme    = useColorScheme();
  const animatedStyles = useSwipeIndicatorAnimation(isOpened);

  const chevronColor  = Colors[colorScheme ?? 'light'].text;
  const marginBottom  = -size * SWIPE_INDICATOR_CONFIG.MARGIN_RATIO;
  const opacityStyles = [animatedStyles.opacity3, animatedStyles.opacity2, animatedStyles.opacity1];

  return (
    <Animated.View style={[style, animatedStyles.container]} entering={FadeIn} exiting={FadeOut}>
      <View style={{ alignItems: 'center' }}>
        {
          opacityStyles.map((opacityStyle, index) => (
            <ChevronAnimatedItem
              key={index}
              size={size}
              color={chevronColor}
              rotationStyle={animatedStyles.rotation}
              opacityStyle={opacityStyle}
              marginBottom={index < opacityStyles.length - 1 ? marginBottom : undefined} />
          ))
        }
      </View>
    </Animated.View>
  );
};

export default SwipeUpAnimatedIndicator;