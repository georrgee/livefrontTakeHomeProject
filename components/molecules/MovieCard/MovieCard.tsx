import React, { memo } from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, 
  Extrapolation, withSpring, SharedValue } from 'react-native-reanimated';
import { Text, View } from '@/components/Themed';
import { PosterImage, RatingBadge, TitleText } from '@/components/atoms';
import { Movie } from '@/types';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = 16;


export type MovieCardProps = {
  movie: Movie;
  index: number;
  scrollX: SharedValue<number>;
  onPress?: (movie: Movie) => void;
  isActive: boolean;
};

export const MovieCard = memo(function MovieCard({ movie, index, scrollX, onPress, isActive }: MovieCardProps) {

  const animatedStyle = useAnimatedStyle(() => {

    const scale = withSpring(isActive ? 1.05 : 1);
    
    const translateX = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [-20, 0, 20],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { translateX }],
    };
  });

  return (
    <Pressable onPress={() => onPress?.(movie)}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* <PosterImage uri={getPosterUri(movie.poster_path)} style={styles.poster} /> */}
        <PosterImage uri={''} style={styles.poster} />

        <View style={styles.infoOverlay}>
          <TitleText style={{ fontSize: 16 }}>{movie.title}</TitleText>
          <View style={styles.row}>
            <RatingBadge rating={movie.vote_average} />
            <Text style={styles.releaseDate}>{movie.release_date.slice(0, 4)}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: SPACING / 2,
    backgroundColor: "#111",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  poster: {
    ...StyleSheet.absoluteFillObject,
  },
  infoOverlay: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8 as any,
    marginTop: 4,
  },
  releaseDate: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 12,
    opacity: 0.8,
  },
});