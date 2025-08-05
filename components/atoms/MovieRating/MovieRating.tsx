import React from 'react';
import { Text } from 'react-native';
import { Star } from 'lucide-react-native';
import { MovieRatingProps } from './types';
import { styles } from './styles';
/**
 * @param { number } rating The rating to display
 * @param { number } spacing The spacing between the star and the text
 * @description **ATOM** component to display the rating of a movie
 */
const MovieRating: React.FC<MovieRatingProps> = (props) => {

  const { rating, spacing } = props;

  return (
    <>
      <Star
        size={24}
        color='#FFD700'
        fill='#FFD700'
        style={[styles.starIconStyle, { top: spacing, right: spacing }]} />
      
      <Text style={[styles.ratingNumberTextStyle, { top: spacing + 30, right: spacing}]}>
        {rating.toFixed(1)}
      </Text>
    </>
  );
};

export default MovieRating;