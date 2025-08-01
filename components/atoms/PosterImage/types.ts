import { StyleProp, ImageStyle } from "react-native";
/** @description Props for the PosterImage Atom component */

export interface PosterImageProps {
  uri: string | undefined;
  style?: StyleProp<ImageStyle>;
}
