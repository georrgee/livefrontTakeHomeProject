import { ViewStyle } from 'react-native';
/**
 * @param { boolean } isOpened Boolean to determine if the card is opened by swiping up
 * @param { number } size The size of the indicator
 * @param { ViewStyle } style The style of the indicator
 * @description Props for the SwipeUpAnimatedIndicator Molecule component
 */
export interface SwipeUpIndicatorProps {
  isOpened: boolean;
  size?:    number;
  style?:   ViewStyle;
}