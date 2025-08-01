import React from "react";
import { Text } from "react-native";
import { TitleTextProps } from "./types";
import { styles } from "./styles";

const TitleText: React.FC<TitleTextProps> = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]} numberOfLines={1}>
      {children}
    </Text>
  );
};

export default TitleText;

