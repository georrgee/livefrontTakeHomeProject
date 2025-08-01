import React from "react";
import { View, Text } from "@/components/Themed";
import { RatingBadgeProps } from "./types";
import { styles } from "./styles";
/**
 * @param { number } rating The rating to display
 * @description **ATOM** component to display the rating of a movie */
const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default RatingBadge;