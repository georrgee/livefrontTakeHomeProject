import { Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const CARD_ITEM_WIDTH  = width * 0.7;
export const CARD_ITEM_HEIGHT = CARD_ITEM_WIDTH * 1.5;
export const SPACING          = 16;
export const SCALE_FACTOR     = 0.2;