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

  const {
    detailsStylez,
    gradientContainerStylez,
    cardStylez,
  } = useMovieCardAnimations(index, activeIndex, scrollX, ref);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, styles.cardSize, cardStylez]}>

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
        <ParallaxForeground index={index} movie={movie} scrollX={scrollX} />
      </Animated.View>
    </GestureDetector>
  );
});

export default MovieCard;