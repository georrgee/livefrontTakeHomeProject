import { StyleSheet } from 'react-native';
import { PAGINATION_CONSTANTS } from '@/constants';

/** @description Styles for the ProgressIndicator atom component */
export const styles = StyleSheet.create({
  
  progressBarContainer: {
    width: PAGINATION_CONSTANTS.PROGRESS_BAR_WIDTH,
    height: PAGINATION_CONSTANTS.PROGRESS_BAR_HEIGHT,
    backgroundColor: '#818080',
    borderRadius: PAGINATION_CONSTANTS.PROGRESS_BAR_HEIGHT / 2,
    overflow: 'hidden',
    marginBottom: PAGINATION_CONSTANTS.POSITIONING.MARGIN_BOTTOM,
  },

  progressBar: {
    height: '100%',
    borderRadius: PAGINATION_CONSTANTS.PROGRESS_BAR_HEIGHT / 2,
  },
});