import { StyleSheet } from 'react-native';
import { PAGINATION_CONSTANTS } from '@/constants/paginationConstants';
/** @description Styles for the MoviePagination Molecule component */
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: PAGINATION_CONSTANTS.POSITIONING.BOTTOM_OFFSET,
    alignSelf: 'center',
    zIndex: 1,
    alignItems: 'center',
  },
});