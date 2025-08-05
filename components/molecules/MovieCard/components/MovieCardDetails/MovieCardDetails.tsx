import React, { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LineSeparator } from '@/components/atoms';
import { SPACING } from '@/constants';
import { MovieCardDetailsProps } from './types';
import { styles } from './styles';
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
    <View style={styles.movieCardDetailsContainer}>

      <View style={{ paddingTop: SPACING / 2 }}>
        <Text style={styles.overviewTitleTextStyle}>Overview</Text>
        <Text style={styles.overviewTextStyle} numberOfLines={4}>
          {movie.overview}
        </Text>
      </View>

      <LineSeparator />

      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Pressable onPress={handleReadMorePress}>
          <Text style={styles.viewMoreDetailsTextStyle}>View more details</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieCardDetails;