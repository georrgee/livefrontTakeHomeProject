import { StyleProp, ViewStyle } from "react-native";
/**
 *  @param { () => void } onRetry Callback function to retry the network request
 *  @param { string } message Custom message to display
 *  @param { StyleProp<ViewStyle> } style Custom style for the component
 *  @description Props for the NetworkError Atom component */

export interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
  style?: StyleProp<ViewStyle>;
}