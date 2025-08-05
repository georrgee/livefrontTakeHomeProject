import { StyleSheet } from 'react-native';
import { CARD_ITEM_WIDTH, CARD_ITEM_HEIGHT, SPACING } from '@/constants';

export const styles = StyleSheet.create({
  cardSize: {
    width: CARD_ITEM_WIDTH,
    height: CARD_ITEM_HEIGHT,
    borderRadius: SPACING,
  },

  cardBackground: {
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
    borderRadius: SPACING,
  },
});