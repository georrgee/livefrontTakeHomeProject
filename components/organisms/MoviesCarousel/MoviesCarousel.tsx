import React, { useState, useCallback, useEffect } from "react";
import { ActivityIndicator, AccessibilityInfo, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
  useAnimatedReaction,
  LinearTransition
} from "react-native-reanimated";
import { Movie } from "@/types";
import { NetworkError, Text } from "@/components/atoms";
import { MovieCard, MoviePagination, SwipeUpAnimatedIndicator } from "@/components/molecules";
import { usePopularMovies, useNetworkStatus } from "@/hooks";
import { useColorScheme } from 'react-native';
import Colors from "@/constants/Colors";
import { styles } from "./styles";
import { ACCESSIBILITY_LABELS, UI_MESSAGES } from "@/constants";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACING = 16;
const FULL_SIZE = ITEM_WIDTH + SPACING;

const MoviesCarousel = ({ onSelect }: { onSelect?: (movie: Movie) => void }) => {

  const [currentPage, setCurrentPage]   = useState(1);
  const [isOpened, setIsOpened]         = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeIndex = useSharedValue(-1);
  const scrollX     = useSharedValue(0);

  const { isConnected, isInternetReachable } = useNetworkStatus();
  const colorScheme = useColorScheme();

  const loadingIndicatorColor = Colors[colorScheme ?? 'light'].refreshIndicator;
  const textColor             = Colors[colorScheme ?? 'light'].text;

  const {
    popularMovies,
    isLoading,
    isLoadingMore,
    errorMessage,
    refetchPopularMovies,
    loadMorePopularMovies,
    hasNextPage
  } = usePopularMovies(currentPage);

  const movieCount = popularMovies?.results?.length || 0;

  useEffect(() => {
    if (movieCount) {
      AccessibilityInfo.announceForAccessibility(
        ACCESSIBILITY_LABELS.PROGRESS.PROGRESS_INDICATOR(currentIndex + 1, movieCount)
      )
    }
  }, [currentIndex, movieCount]);

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

  const handleRetry = () => refetchPopularMovies();

  const onEndReached = useCallback(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  useAnimatedReaction(() => {
    return activeIndex.value !== -1;
  }, (value) => {
    if (isOpened === value) return;
    runOnJS(setIsOpened)(value);
  });

  if (!isConnected || isInternetReachable === false) {
    return (
      <View 
        style={[styles.container, styles.centerContent]}
        accessibilityRole="alert"
        accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.NETWORK_ERROR}>
        <NetworkError onRetry={handleRetry} message={UI_MESSAGES.NETWORK_ERROR.MOVIES_LIST} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View 
        accessibilityRole='progressbar'
        accessibilityLabel={ACCESSIBILITY_LABELS.LOADING.MOVIES_LABEL}
        accessibilityHint={ACCESSIBILITY_LABELS.LOADING.MOVIES_HINT}
        style={[styles.container, styles.centerContent]}>
        <ActivityIndicator 
          accessibilityLabel={ACCESSIBILITY_LABELS.LOADING.INDICATOR}
          size="large" 
          color={loadingIndicatorColor} />
        <Text 
          style={[styles.loadingText, { color: textColor}]}>
            {UI_MESSAGES.LOADING.MOVIES}
        </Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View
        style={[styles.container, styles.centerContent]}
        accessibilityRole='alert'
        accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.GENERAL_ERROR(errorMessage)}>
        <Text style={styles.errorText} accessibilityRole='header'>
          {UI_MESSAGES.ERROR.PREFIX}{errorMessage}
        </Text>
        <Text
          style={styles.retryText}
          onPress={refetchPopularMovies}
          accessibilityRole='button'
          accessibilityLabel={ACCESSIBILITY_LABELS.ERRORS.RETRY_BUTTON}
          accessibilityHint={ACCESSIBILITY_LABELS.ERRORS.RETRY_HINT}>
          {UI_MESSAGES.TEXT.RETRY_BUTTON}
        </Text>
      </View>
    );
  }

  return (
    <View 
      accessibilityRole='list'
      accessibilityLabel={ACCESSIBILITY_LABELS.CONTENT.MOVIE_CAROUSEL(movieCount)}
      accessibilityHint={ACCESSIBILITY_LABELS.PROGRESS.SWIPE_HINT}
      style={styles.container}>
      {!isOpened && <MoviePagination data={popularMovies?.results || []} scrollX={scrollX} /> }
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
        accessibilityRole='list'
        accessibilityLabel={ACCESSIBILITY_LABELS.PROGRESS.LOADING_MOVIES}
        ListFooterComponent={isLoadingMore ? (
          <View 
            accessibilityRole='progressbar'
            accessibilityLabel={ACCESSIBILITY_LABELS.PROGRESS.LOADING_MORE}
            style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color="#FFD700" />
          </View>
        ) : null}
      />

      {currentIndex < (popularMovies?.results || []).length && (
        <SwipeUpAnimatedIndicator
          style={styles.swipeIndicator}
          isOpened={isOpened}
        />
      )}
    </View>
  )
};

export default MoviesCarousel;