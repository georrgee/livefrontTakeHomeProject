import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { GestureDetector } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { MovieCardProps } from './types';
import MovieCardDetails from './components/MovieCardDetails';
import ParallaxForeground from './components/ParallaxForeground';
import { useMovieCardAnimations, useMovieCardGestures } from '@/hooks';
import { styles } from './styles';
import { ACCESSIBILITY_LABELS } from '@/constants';

/** @description An animated molecule component that renders a movie card, including the poster image, rating, and title */
const MovieCard = memo(function MovieCard({
  movie,
  index,
  scrollX,
  activeIndex,
  onPress,
  currentIndex
}: MovieCardProps) {

  const ref = useAnimatedRef<View>();
  const gesture = useMovieCardGestures(index, activeIndex);

  const isSelected  = currentIndex === index;
  const hasOverview = Boolean(movie.overview);

  const {
    detailsStylez,
    gradientContainerStylez,
    cardStylez,
  } = useMovieCardAnimations(index, activeIndex, scrollX, ref);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View 
        accessibilityRole='button'
        accessibilityLabel={ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(movie.title)}
        accessibilityHint={ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_HINT(movie.vote_average, hasOverview)}
        accessibilityState={{ selected: isSelected }}
        accessible={true}
        style={[styles.card, styles.cardSize, cardStylez]}>

        <Animated.View
          style={[
            styles.cardSize,
            {
              position: "absolute",
              justifyContent: "flex-end",
            },
            detailsStylez,
          ]}>

          <Animated.View
            style={[
              styles.cardSize,
              gradientContainerStylez,
              {
                position: "absolute",
                overflow: "hidden",
                alignSelf: "center",
              },
            ]}
            pointerEvents='none'>

            <LinearGradient
              colors={["#1a1a1a", "#0a0a0a"]}
              start={[0, 0]}
              end={[0, 1]}
              style={{ flex: 1 }} />
          </Animated.View>

          <Animated.View
            ref={ref}
            style={[{ alignSelf: "center"}, gradientContainerStylez]}>
            {currentIndex === index && (
              <MovieCardDetails onPress={onPress} movie={movie} />
            )}
          </Animated.View>
        </Animated.View>

        <ParallaxForeground 
          accessibilityElementsHidden={true}
          importantForAccessibility='no-hide-descendants'
          index={index} 
          movie={movie} 
          scrollX={scrollX} />
          
      </Animated.View>
    </GestureDetector>
  );
});

export default MovieCard;