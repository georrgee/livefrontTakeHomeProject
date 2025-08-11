import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { movieService } from '@/services';
import { CardGradients, MovieRating } from '@/components/atoms';
import { CARD_ITEM_HEIGHT, CARD_ITEM_WIDTH, SPACING } from '@/constants';
import { styles } from './styles';
import { ParallaxForegroundProps } from './types';
/**
 * @param { Movie } movie the movie object
 * @param { number } index the index of the movie in the list
 * @param { Animated.SharedValue<number> } scrollX the scrollX value of the list
 * @param { boolean } accessibilityElementsHidden whether accessibility elements should be hidden
 * @param { string } importantForAccessibility controls how accessibility services interact with this element
 * @description A component that renders the foreground of a movie card, including the poster image, rating, and title
 */
const ParallaxForeground: React.FC<ParallaxForegroundProps> = (props) => {

  const { movie, index, scrollX, accessibilityElementsHidden, importantForAccessibility } = props;

  const scaleFactor = 0.2;
  const _translateX = CARD_ITEM_WIDTH * scaleFactor * 2;

  const posterUri = useMemo(() => {
    return movieService.getPosterImage(movie.poster_path, 'w1280');
  }, [movie.poster_path]);

  const posterSource = useMemo(() => {
    return posterUri ? { uri: posterUri } : require('../../../../../assets/images/placeholder.png')
  }, [posterUri]);

  const imageStylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1 + scaleFactor,
        },
        {
          translateX: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [-_translateX, 0, _translateX],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const textStylez = useAnimatedStyle(() => {
    const textSize = 120;
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [-textSize, 0, textSize],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View 
      style={[styles.cardSize, styles.cardBackground]}
      accessibilityElementsHidden={accessibilityElementsHidden}
      importantForAccessibility={importantForAccessibility}>

      <Animated.Image
        source={posterSource}
        style={[StyleSheet.absoluteFillObject, { opacity: 1 }, imageStylez]}
        resizeMode='contain' />

      <CardGradients itemWidth={CARD_ITEM_WIDTH} itemHeight={CARD_ITEM_HEIGHT} />

      <Animated.View style={[StyleSheet.absoluteFillObject, textStylez]}>
        <MovieRating rating={movie.vote_average} spacing={SPACING} />
      </Animated.View>
      
    </View>
  );
}

export default ParallaxForeground;