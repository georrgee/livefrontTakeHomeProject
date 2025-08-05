import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { View } from '@/components/atoms';
import { MoviesCarousel } from '@/components/organisms';
import { Movie } from '@/types';

/** @description The Main Screen where it displays the list of popular movies */
export default function HomeScreen() {

  const insets = useSafeAreaInsets();
  const handleMovieSelectedPress = (movie: Movie) => router.push(`/${movie.id}`);

  return (
    <View style={styles.container}>
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
    //backgroundColor: 'red',
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