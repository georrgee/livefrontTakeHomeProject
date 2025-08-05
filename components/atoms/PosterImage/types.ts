import { StyleProp, ImageStyle } from "react-native";
/**
 * @param { string | undefined } uri The URI of the image to display
 * @param { StyleProp<ImageStyle> } style The style object to apply to the image
 * @description Props for the PosterImage Atom component */
export interface PosterImageProps {
  uri:    string | undefined;
  style?: StyleProp<ImageStyle>;
}
