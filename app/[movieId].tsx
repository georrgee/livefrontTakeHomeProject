import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path?: string;
}

export default function MovieDetailsScreen() {

  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Make sure to use the API call to get the movie details
    const fetchMovieDetails = async () => {
      try {

        setLoading(true);

        const mockMovie: MovieDetails = {
          id: parseInt(movieId || '0'),
          title: `Movie ${movieId}`,
          overview: 'Just dummy data heh heh.',
          release_date: '01-01-2023',
          vote_average: 8.5,
        };
        
        // TODO: Remove this lin since it is just a timer. Trying to simulate how the loading would look
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMovie(mockMovie);
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovieDetails();

  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Movie not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text>{movieId}</Text>
        <Text style={styles.title}>{movie.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Release Date:</Text>
          <Text style={styles.value}>{movie.release_date}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{movie.vote_average}/10</Text>
        </View>
        
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        
        <Text style={styles.apiNote}>
          Movie ID: {movieId} - Ready for TMDB API integration!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  
  content: {
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  label: {
    fontWeight: '600',
    marginRight: 10,
    minWidth: 100,
  },

  value: {
    flex: 1,
  },

  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },

  overview: {
    lineHeight: 22,
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 10,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
  },

  apiNote: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
  },
});