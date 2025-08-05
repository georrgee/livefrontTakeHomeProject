import React from 'react';
import { ChevronUp } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { ChevronAnimatedItemProps } from './types';
/**
 * 
 * @param { number } size The size of the chevron icon
 * @param { string } color The color of the chevron icon
 * @param { AnimatedStyle } rotationStyle The rotation style of the chevron icon
 * @param { AnimatedStyle } opacityStyle The opacity style of the chevron icon
 * @param { number } marginBottom The margin bottom of the chevron icon
 * @description An animated atom component that is displaying a ChevronUp icon
 */
const ChevronAnimatedItem: React.FC<ChevronAnimatedItemProps> = (props) => {

  const {
    size,
    color,
    rotationStyle,
    opacityStyle,
    marginBottom,
  } = props;

  return (
    <Animated.View style={[rotationStyle, opacityStyle, marginBottom ? { marginBottom } : undefined]}>
      <ChevronUp size={size} color={color} />
    </Animated.View>
  )
};

export default ChevronAnimatedItem;

