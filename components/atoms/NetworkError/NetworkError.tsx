import React from "react";
import { TouchableOpacity } from "react-native";
import { WifiOff } from 'lucide-react-native';
import { Text, View } from '@/components/atoms'
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { NetworkErrorProps } from "./types";
import { styles } from "./styles";
import { ACCESSIBILITY_LABELS, UI_MESSAGES } from "@/constants";  
/**
 * @param { () => void } onRetry The function to call when the user taps the "Try Again" button
 * @param { string } message The message to display to the user
 * @param { StyleProp<ViewStyle> } style The style object to apply to the container
 * @param { string } testID The test ID to use for the container
 * @description **ATOM** component to display a network error message */
const NetworkError: React.FC<NetworkErrorProps> = (props) => {

  const {
    onRetry,
    message = UI_MESSAGES.NETWORK_ERROR.DEFAULT_MESSAGE,
    style,
    testID
  } = props;
  
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View 
      accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.NETWORK_ERROR}
      accessibilityRole='alert'
      style={[styles.container, style]} 
      testID={testID}>
      <View 
        accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.NO_INTERNET}
        style={styles.iconContainer}>
        <WifiOff size={48} color={textColor} />
      </View>

      <Text style={[styles.title, { color: textColor }]}>
        {UI_MESSAGES.NETWORK_ERROR.TITLE}
      </Text>

      <Text style={[styles.message, { color: textColor }]}>
        {message}
      </Text>

      {onRetry && (
        <TouchableOpacity
          accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.RETRY_BUTTON}
          accessibilityRole='button'
          accessibilityHint="Double tap to retry loading content"
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}>
          <Text style={[styles.retryButtonText, { color: textColor }]}>
            {UI_MESSAGES.NETWORK_ERROR.RETRY_BUTTON}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NetworkError;