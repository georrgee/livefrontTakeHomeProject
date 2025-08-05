import { SharedValue } from 'react-native-reanimated';
/**
 * @param { SharedValue<number> } scrollX The shared value for the scroll position
 * @param { number } totalItems The total number of items in the list
 * @param { boolean } isOpened Whether the progress bar is opened or not
 * @description Props for the ProgressIndicator atom component
 */

export interface ProgressIndicatorProps {
  scrollX: SharedValue<number>;
  totalItems: number;
  isOpened: boolean;
}