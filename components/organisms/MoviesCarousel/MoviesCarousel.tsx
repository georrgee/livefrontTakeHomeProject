import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
  useAnimatedReaction,
  LinearTransition
} from "react-native-reanimated";
import { Movie } from "@/types";
import { MoviePagination, SwipeUpIndicator } from "@/components/atoms";
import { MovieCard } from "@/components/molecules";


const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACING = 16;
const FULL_SIZE = ITEM_WIDTH + SPACING;

const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: "/path/to/backdrop1.jpg",
    genre_ids: [28, 12],
    id: 1001,
    original_language: "en",
    original_title: "Skyward Bound",
    overview: "A young pilot discovers a forgotten civilization in the clouds and must broker peace before war erupts between the sky dwellers and the surface world.",
    popularity: 87.3,
    poster_path: "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg", // Example poster path
    release_date: "2023-11-10",
    title: "Skyward Bound",
    video: false,
    vote_average: 7.8,
    vote_count: 1245,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [35, 10749],
    id: 1002,
    original_language: "en",
    original_title: "Coffee & Coincidences",
    overview: "Two strangers keep bumping into each other over coffee; are they meant to be or is it just bad timing? A romantic comedy about fate, love, and really good espresso.",
    popularity: 45.1,
    poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    release_date: "2021-02-14",
    title: "Coffee & Coincidences",
    video: false,
    vote_average: 6.3,
    vote_count: 512,
  },
  {
    adult: false,
    backdrop_path: "/path/to/backdrop3.jpg",
    genre_ids: [27, 53],
    id: 1003,
    original_language: "en",
    original_title: "Whispering Walls",
    overview: "A renovation crew awakens something malevolent in an old mansion; the walls remember everything, and they're ready to tell their dark secrets.",
    popularity: 62.0,
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    release_date: "2024-10-31",
    title: "Whispering Walls",
    video: false,
    vote_average: 8.1,
    vote_count: 2340,
  },
  {
    adult: false,
    backdrop_path: "/path/to/backdrop4.jpg",
    genre_ids: [878, 12],
    id: 1004,
    original_language: "en",
    original_title: "Quantum Echo",
    overview: "When a physicist discovers how to communicate with parallel versions of herself, she must choose between saving her world or saving herself.",
    popularity: 93.7,
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    release_date: "2024-03-15",
    title: "Quantum Echo",
    video: false,
    vote_average: 8.5,
    vote_count: 3021,
  },
  {
    adult: false,
    backdrop_path: "/path/to/backdrop5.jpg",
    genre_ids: [16, 10751],
    id: 1005,
    original_language: "en",
    original_title: "The Last Library",
    overview: "In a world where books are forbidden, a young girl discovers the last secret library and must protect it from those who would destroy knowledge forever.",
    popularity: 76.2,
    poster_path: "/5tVlz6MdkZjh8xjFfyuBhCeGZBw.jpg",
    release_date: "2023-12-08",
    title: "The Last Library",
    video: false,
    vote_average: 7.9,
    vote_count: 1876,
  },
];

const MoviesCarousel = ({ onSelect }: { onSelect?: (movie: Movie) => void }) => {

  const [isOpened, setIsOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = useSharedValue(-1);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / FULL_SIZE;
    },
    onMomentumEnd: () => {
      const index = Math.round(scrollX.value);
      runOnJS(setCurrentIndex)(index);
    },
  });

  useAnimatedReaction(
    () => {
      return activeIndex.value !== -1;
    },
    (value) => {
      if (isOpened === value) {
        return;
      }
      runOnJS(setIsOpened)(value);
    }
  );

  return (
    <View style={styles.container}>
      {!isOpened && <MoviePagination data={mockMovies} scrollX={scrollX} />}
      <Animated.FlatList
        data={mockMovies}
        horizontal
        contentContainerStyle={[
          {
            gap: SPACING,
            paddingHorizontal: (width - ITEM_WIDTH) / 2,
            alignItems: "center",
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition.springify()
          .damping(80)
          .stiffness(200)}
        renderItem={({ item, index }) => {
          return (
            <MovieCard
              movie={item}
              index={index}
              scrollX={scrollX}
              activeIndex={activeIndex}
              onPress={onSelect}
              isOpened={currentIndex === index ? isOpened : false}
              currentIndex={currentIndex}
            />
          );
        }}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        scrollEnabled={!isOpened}
      />

      {currentIndex < mockMovies.length && (
        <SwipeUpIndicator
          style={styles.swipeIndicator}
          isOpened={isOpened}
        />
      )}
    </View>
  );
};

export default MoviesCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  swipeIndicator: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});