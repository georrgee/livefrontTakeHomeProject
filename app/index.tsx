import React, { useRef, useCallback } from 'react';
import { AccessibilityInfo, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { View } from '@/components/atoms';
import { MoviesCarousel } from '@/components/organisms';
import { Movie } from '@/types';
import { ACCESSIBILITY_LABELS } from '@/constants';

/** @description The Main Screen where it displays the list of popular movies */
export default function HomeScreen() {

  const insets      = useSafeAreaInsets();
  const carouselRef = useRef(null);

  /** @description function that handles the press event of the movie card; added accessibility ann */
  const handleMovieSelectedPress = (movie: Movie) => {
    AccessibilityInfo.announceForAccessibility(ACCESSIBILITY_LABELS.ANNOUNCEMENTS.NAVIGATING(movie.title));
    router.push(`/${movie.id}`);
  };

  /** 
   * @description hook function that is called when the screen is focused; 
   * it announces the screen loaded and sets the accessibility focus to the carousel */
  useFocusEffect(
    useCallback(() => {
      AccessibilityInfo.announceForAccessibility(ACCESSIBILITY_LABELS.ANNOUNCEMENTS.SCREEN_LOADED);
      if (carouselRef.current) AccessibilityInfo.setAccessibilityFocus(carouselRef.current);
    }, [])
  );

  return (
    <View 
      accessibilityLabel={ACCESSIBILITY_LABELS.NAVIGATION.HOME_SCREEN}
      style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <View style={[styles.moviesListContainer, { paddingTop: insets.top + 100 }]}>
          <MoviesCarousel onSelect={handleMovieSelectedPress} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  networkErrorContainer: {
    flex: 1,
    width: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  moviesListContainer: {
    flex: 1, 
    width: '100%',
  },

  movieList: {
    width: '100%',
    flex: 1,
  },

  movieItem: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
  },

  movieTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});