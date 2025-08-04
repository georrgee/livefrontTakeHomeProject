import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Pressable, Dimensions, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
  SharedValue,
  useAnimatedRef,
  measure,
  useDerivedValue
} from 'react-native-reanimated';
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { Movie } from '@/types';
import { movieService } from '@/services';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = 16;

export type MovieCardProps = {
  movie: Movie;
  index: number;
  scrollX: SharedValue<number>;
  activeIndex: SharedValue<number>;
  onPress?: (movie: Movie) => void;
  isOpened: boolean;
  currentIndex: number;
};


function MovieDetails({ movie, onPress }: {
  movie: Movie, onPress?: (movie: Movie) => void }) {

    const handleReadMorePress = useCallback(() => {
      onPress?.(movie);
    }, [movie, onPress]);

  return (
    <View style={styles.movieCardDetailsContainer}>
        <View style={{ paddingTop: SPACING / 2 }}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText} numberOfLines={4}>
            {movie.overview}
          </Text>
        </View>

      <View style={styles.separator} />

      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Pressable onPress={handleReadMorePress}>
          <Text style={styles.viewMoreDetailsTextStyle}>View more details</Text>
        </Pressable>   
      </View>   
    </View>
  );
}

function CardGradients() {
  return (
    <>
      {/* Top gradient */}
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "#00000000"]}
        start={[1, 0]}
        end={[1, 0.5]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: ITEM_HEIGHT * 0.3,
        }} />
    
      {/* Bottom gradient */}
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "#00000000"]}
        start={[0, 1]}
        end={[0, 0]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: ITEM_HEIGHT * 0.3,
        }} />

      {/* Left gradient */}
      <LinearGradient
        colors={["rgba(0,0,0,.6)", "#00000000"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: ITEM_WIDTH * 0.7,
        }} />

      {/* Right gradient */}
      <LinearGradient
        colors={["rgba(0,0,0,.6)", "#00000000"]}
        start={[1, 0]}
        end={[0, 0]}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: ITEM_WIDTH * 0.3,
        }} />
    </>
  );
}

function ParallaxForeground({
  movie,
  index,
  scrollX,
}: {
  movie: Movie;
  index: number;
  scrollX: SharedValue<number>;
}) {

  const scaleFactor = 0.2;
  const _translateX = ITEM_WIDTH * scaleFactor * 2;
  const ref = useAnimatedRef<Text>();

  const posterUri = useMemo(() => {
    return movieService.getPosterImage(movie.poster_path, 'original');
  }, [movie.poster_path]);

  const posterSource = useMemo(() => {
    return posterUri ? { uri: posterUri } : require('../../../assets/images/placeholder.png')
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
    <View style={[styles.cardSize, styles.cardBackground]}>

      <Animated.Image
        source={posterSource}
        style={[StyleSheet.absoluteFillObject, { opacity: 1 }, imageStylez]}
        resizeMode="cover" />

      <CardGradients />
      <Animated.View style={[StyleSheet.absoluteFillObject, textStylez]}>
        <Star
          size={24}
          color='#FFD700'
          fill='#FFD700'
          style={{
            position: "absolute",
            right: SPACING,
            top: SPACING,
          }}
        />
        <Text style={styles.ratingText}>
          {movie.vote_average.toFixed(1)}
        </Text>

        {/* <Animated.View style={styles.titleContainer}>
          <Text
            ref={ref}
            style={styles.titleText}
            numberOfLines={2}
            adjustsFontSizeToFit>
            {movie.title}
          </Text>
        </Animated.View> */}
      </Animated.View>
    </View>
  );
}

const MovieCard = memo(function MovieCard({
  movie,
  index,
  scrollX,
  activeIndex,
  onPress,
  isOpened,
  currentIndex
}: MovieCardProps) {
  const ref = useAnimatedRef<View>();

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      activeIndex.value = index;
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      activeIndex.value = -1;
    });

  const isActiveSpringy = useDerivedValue(() => {
    return withSpring(activeIndex.value === index ? 1 : 0, {
      damping: 80,
      stiffness: 200,
    });
  }, [activeIndex.value, index]);

  const neighborsAnimation = useDerivedValue(() => {
    return activeIndex.value === -1 || Math.abs(activeIndex.value - index) > 1
      ? 0
      : interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [100, 0, -100],
        Extrapolation.CLAMP
      );
  });

  const detailsStylez = useAnimatedStyle(() => {
    const meas = measure(ref);
    if (meas === null) {
      return {};
    }
    return {
      transform: [
        {
          translateY: interpolate(
            isActiveSpringy.value,
            [0, 1],
            [0, meas.height],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const gradientContainerStylez = useAnimatedStyle(() => {
    return {
      width: interpolate(
        isActiveSpringy.value,
        [0, 1],
        [ITEM_WIDTH, ITEM_WIDTH + SPACING * 2],
        Extrapolation.CLAMP
      ),
    };
  });

  const cardStylez = useAnimatedStyle(() => {
    const meas = measure(ref);
    return {
      transform: [
        {
          translateX: withSpring(neighborsAnimation.value, {
            damping: 80,
            stiffness: 200,
          }),
        },
        {
          translateY: meas?.height
            ? interpolate(
              isActiveSpringy.value,
              [0, 1],
              [0, -meas.height / 2]
            )
            : 0,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
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
              style={{ flex: 1 }}
            />
          </Animated.View>
          <Animated.View
            ref={ref}
            style={[
              {
                alignSelf: "center",
              },
              gradientContainerStylez,
            ]}>
            {currentIndex === index && (
              <MovieDetails onPress={onPress} movie={movie} />
            )}
          </Animated.View>
        </Animated.View>
        <ParallaxForeground index={index} movie={movie} scrollX={scrollX} />
      </Animated.View>
    </GestureDetector>
  );
});

export default MovieCard;

const styles = StyleSheet.create({

  cardSize: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: SPACING,
  },

  card: {
    justifyContent: "center",
  },

  cardBackground: {
    // backgroundColor: "#000",
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
    borderRadius: SPACING,
  },

  separator: {
    marginVertical: SPACING - 5,
    marginLeft: -SPACING,
    marginRight: -SPACING,
  },

  movieCardDetailsContainer: {
    paddingHorizontal: SPACING, 
    paddingVertical: SPACING + 2, 
    flexDirection: 'column', 
  },

  overviewTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'Lexend'
  },

  overviewText: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Lexend',
    fontWeight: '400'
  },

  viewMoreDetailsTextStyle: {
    color: '#FFD700',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Lexend',
    fontWeight: '500'
  },

  ratingText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Lexend',
    position: "absolute",
    right: SPACING,
    top: SPACING + 30,
  },

  titleContainer: {
    //backgroundColor: 'red',
    width: ITEM_HEIGHT,
    top: ITEM_HEIGHT - 10,
    marginLeft: 5,
    transformOrigin: "0% 0%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING,
    transform: [{ rotate: "-90deg" }],
  },

  titleText: {
    fontSize: 26,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Lexend'
  },
});