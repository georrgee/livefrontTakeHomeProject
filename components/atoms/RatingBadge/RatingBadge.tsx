import React from "react";
import { View, Text } from "@/components/atoms";
import { RatingBadgeProps } from "./types";
import { styles } from "./styles";
import { ACCESSIBILITY_LABELS } from "@/constants";
/**
 * @param { number } rating The rating to display
 * @description **ATOM** component to display the rating of a movie */
const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  return (
    <View 
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={ACCESSIBILITY_LABELS.MOVIE_CARD.RATING_BADGE(rating)}
      style={styles.container}>
      <Text 
        accessibilityElementsHidden={true}
        importantForAccessibility='no-hide-descendants'
        style={styles.text}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default RatingBadge;