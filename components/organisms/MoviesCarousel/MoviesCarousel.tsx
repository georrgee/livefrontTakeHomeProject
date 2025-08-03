import React, { useState, useCallback } from "react";
import { ActivityIndicator, View, Dimensions, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
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
import { usePopularMovies } from "@/hooks";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACING = 16;
const FULL_SIZE = ITEM_WIDTH + SPACING;

const MoviesCarousel = ({ onSelect }: { onSelect?: (movie: Movie) => void }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [isOpened, setIsOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = useSharedValue(-1);
  const scrollX = useSharedValue(0);

  const {
    popularMovies,
    isLoading,
    isLoadingMore,
    errorMessage,
    refetchPopularMovies,
    loadMorePopularMovies,
    hasNextPage
  } = usePopularMovies(currentPage);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / FULL_SIZE;
    },
    onMomentumEnd: () => {
      const index = Math.round(scrollX.value);
      runOnJS(setCurrentIndex)(index);
    },
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      loadMorePopularMovies();
    }
  }, [hasNextPage, isLoadingMore, loadMorePopularMovies]);

  const onEndReached = useCallback(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  useAnimatedReaction(() => {
    return activeIndex.value !== -1;
  }, (value) => {
    if (isOpened === value) return;
    runOnJS(setIsOpened)(value);
  }
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {errorMessage}</Text>
        <Text style={styles.retryText} onPress={refetchPopularMovies}>Tap to retry</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isOpened && <MoviePagination data={popularMovies?.results || []} scrollX={scrollX} />}
      <Animated.FlatList
        data={popularMovies?.results || []}
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

        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? (
          <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color="#FFD700" />
          </View>
        ) : null}
      />

      {currentIndex < (popularMovies?.results || []).length && (
        <SwipeUpIndicator
          style={styles.swipeIndicator}
          isOpened={isOpened}
        />
      )}
    </View>
  )
};
    
    
export default MoviesCarousel;

  const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    loadingText: {
      color: '#FFD700',
      fontSize: 16,
      marginTop: 10,
      fontFamily: 'Lexend',
    },

    errorText: {
      color: '#FF6B6B',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'Lexend',
    },

    retryText: {
      color: '#FFD700',
      fontSize: 14,
      textDecorationLine: 'underline',
      fontFamily: 'Lexend',
    },

    loadingMoreContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },

    swipeIndicator: {
      position: "absolute",
      bottom: 30,
      alignSelf: "center",
    },
  });