import React from "react";
import { TouchableOpacity } from "react-native";
import { WifiOff } from 'lucide-react-native';
import { Text, View } from '@/components/atoms'
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { NetworkErrorProps } from "./types";
import { styles } from "./styles";

const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  message = "Please check your internet connection and try again.",
  style,
  testID
}) => {
  
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.iconContainer}>
        <WifiOff size={48} color={textColor} />
      </View>

      <Text style={[styles.title, { color: textColor }]}>
        No Internet Connection
      </Text>

      <Text style={[styles.message, { color: textColor }]}>
        {message}
      </Text>

      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}>
          <Text style={[styles.retryButtonText, { color: textColor }]}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NetworkError;