import { AnimatedStyle } from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

/**
 * @param { number } size The size of the chevron icon
 * @param { string } color The color of the chevron icon
 * @param { AnimatedStyle<ViewStyle> } rotationStyle The rotation style of the chevron icon
 * @param { AnimatedStyle<ViewStyle> } opacityStyle The opacity style of the chevron icon
 * @param { number } marginBottom The margin bottom of the chevron icon
 * @description Props for the ChevronAnimatedItem atom component
 */
export interface ChevronAnimatedItemProps {
  size:          number;
  color:         string;
  rotationStyle: AnimatedStyle<ViewStyle>;
  opacityStyle:  AnimatedStyle<ViewStyle>;
  marginBottom?: number;
};