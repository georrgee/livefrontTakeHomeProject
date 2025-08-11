import React from 'react';
import { Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { MovieRatingProps } from './types';
import { styles } from './styles';
import { ACCESSIBILITY_LABELS } from '@/constants';
/**
 * @param { number } rating The rating to display
 * @param { number } spacing The spacing between the star and the text
 * @description **ATOM** component to display the rating of a movie
 */
const MovieRating: React.FC<MovieRatingProps> = (props) => {

  const { rating, spacing } = props;

  const getStarRatingAccessibilityDescription = (rating: number) => {
    const outOfFive = (rating / 2).toFixed(1);
    return `${rating.toFixed(1)} out of 5 stars`
  };

  return (
    <View 
      accessible={true}
      accessibilityRole='text'
      accessibilityLabel={getStarRatingAccessibilityDescription(rating)}>
      <Star
        size={24}
        color='#FFD700'
        fill='#FFD700'
        style={[styles.starIconStyle, { top: spacing, right: spacing }]} />
      
      <Text style={[styles.ratingNumberTextStyle, { top: spacing + 30, right: spacing}]}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default MovieRating;