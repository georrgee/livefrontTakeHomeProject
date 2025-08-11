import React, { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SPACING } from '@/constants';
import { MovieCardDetailsProps } from './types';
import { styles } from './styles';
import { ACCESSIBILITY_LABELS, UI_MESSAGES } from '@/constants';
/**
 * @param { Movie } movie the movie obkect
 * @param { () => void } onPress the callback function to be called when the view more details button is pressed
 * @description a component that displays the movie details under the poster in the card
 */
const MovieCardDetails: React.FC<MovieCardDetailsProps> = (props) => {

  const { movie, onPress } = props;

  const handleReadMorePress = useCallback(() => {
    onPress?.(movie);
  }, [movie, onPress]);

  return (
    <View
      style={styles.movieCardDetailsContainer}
      accessibilityRole='summary'
      accessibilityLabel={ACCESSIBILITY_LABELS.CONTENT.MOVIE_DETAILS_REGION(movie.title)}>

        <View style={{ paddingTop: SPACING / 2 }}>
          <Text accessibilityRole='header' style={styles.overviewTitleTextStyle}>
            {UI_MESSAGES.TEXT.OVERVIEW_TITLE}
          </Text>

          <Text 
            accessibilityRole='text'
            accessibilityLabel={ACCESSIBILITY_LABELS.CONTENT.OVERVIEW_TEXT(movie.overview)}
            style={styles.overviewTextStyle} 
            numberOfLines={4}>
            {movie.overview}
          </Text>
      </View>

      <View style={styles.separator} />

      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Pressable 
          accessibilityRole='button'
          accessibilityLabel={ACCESSIBILITY_LABELS.CONTENT.VIEW_MORE_BUTTON(movie.title)}
          accessibilityHint={ACCESSIBILITY_LABELS.CONTENT.VIEW_MORE_HINT}
          accessible={true}
          onPress={handleReadMorePress}>
          <Text style={styles.viewMoreDetailsTextStyle}>View more details</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default MovieCardDetails;