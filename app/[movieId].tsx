import React, { useMemo } from 'react';
import { Image, StyleSheet, ScrollView, ActivityIndicator, Linking, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, ChevronLeft} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import { useMovieDetails } from '@/hooks';
import { movieService } from '@/services';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { NetworkError } from '@/components/atoms';
import { useNetworkStatus } from '@/hooks';

export default function MovieDetailsScreen() {

  const router = useRouter();
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  const { movieDetails, isLoading, errorMessage, refetchMovieDetails } = useMovieDetails(movieId ? parseInt(movieId) : null);
  const { isConnected, isInternetReachable } = useNetworkStatus();

  const colorScheme = useColorScheme();
  const sectionTitleTextColor = Colors[colorScheme ?? 'light'].sectionTitleText;
  const refreshIndicatorColor = Colors[colorScheme ?? 'light'].refreshIndicator;

  const formatMovieRunTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`
  };

  const backdropUri = useMemo(() => {
    return movieService.getBackdropImage(movieDetails?.backdrop_path || '', 'original')
  }, [movieDetails?.backdrop_path]);

  const backdropSource = useMemo(() => {
    return backdropUri ? { uri: backdropUri } : require('../assets/images/placeholder.png')
  }, [backdropUri]);

  const handleRefresh = async () => await refetchMovieDetails();
  const formatYear = (dateString: string) => new Date(dateString).getFullYear();

  const handleHomepagePress = () => {
    if (movieDetails?.homepage) {
      Linking.openURL(movieDetails.homepage);
    }
  };

  if (!isConnected || isInternetReachable === false) {
    return (
      <View style={styles.centerContainer}>
        <NetworkError onRetry={() => refetchMovieDetails()} message="Connect to the internet to view movie details." />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (errorMessage || !movieDetails) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{errorMessage || 'Movie not found'}</Text>
        <View style={styles.errorButtonsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={refetchMovieDetails}
            activeOpacity={0.7}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonError}
            onPress={() => router.back()}
            activeOpacity={0.7}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRefreshControl = () => {
    return (
      <RefreshControl 
        tintColor={refreshIndicatorColor} 
        refreshing={isLoading} 
        onRefresh={handleRefresh} />
    )
  }

  const renderMovieBackdropImage = () => {
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating / 2);
      const hasHalfStar = (rating / 2) % 1 >= 0.5;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(
            <Star
              key={i}
              size={16}
              color='#FFD700'
              fill='#FFD700'
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          stars.push(
            <Star
              key={i}
              size={16}
              color='#FFD700'
              fill='none'
            />
          );
        } else {
          stars.push(
            <Star
              key={i}
              size={16}
              color='#FFD700'
              fill='none'
            />
          );
        }
      }
      return stars;
    };


    return (
      <View style={styles.backdropContainer}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        {movieDetails.backdrop_path && (
          <Image
            source={backdropSource}
            style={styles.backdropImage}
            resizeMode='cover'
            fadeDuration={300}
            loadingIndicatorSource={require('../assets/images/placeholder.png')} />
        )}

        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(0,0,0,0.9)']}
          locations={[0, 0.2, 1]}
          style={styles.gradientOverlay} />

        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)', 'transparent']}
          locations={[0, 0.5, 1]}
          style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <View style={styles.movieInfoOverlay}>
          <Text style={styles.movieTitle}>{movieDetails.title}</Text>
          <View style={styles.movieMetaRow}>
            <Text style={styles.movieYear}>{formatYear(movieDetails.release_date)}</Text>
            <Text style={styles.movieDuration}>{formatMovieRunTime(movieDetails.runtime)}</Text>
            <View style={styles.starsContainer}>
              {renderStars(movieDetails.vote_average)}
            </View>
          </View>

          <View style={styles.genresContainer}>
            {movieDetails.genres.slice(0, 2).map((genre) => (
              <View key={genre.id} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMovieBackdropImage()}
      <View style={styles.scrollableContent}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={renderRefreshControl()}>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: sectionTitleTextColor }]}>Overview</Text>
              <Text style={styles.overview}>{movieDetails.overview}</Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: sectionTitleTextColor }]}>Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Release Date:</Text>
                <Text style={styles.value}>{movieDetails.release_date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Rating:</Text>
                <Text style={styles.value}>{movieDetails.vote_average.toFixed(1)}/10</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Runtime:</Text>
                <Text style={styles.value}>{formatMovieRunTime(movieDetails.runtime)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Budget:</Text>
                <Text style={styles.value}>${movieDetails.budget?.toLocaleString() || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Revenue:</Text>
                <Text style={styles.value}>${movieDetails.revenue?.toLocaleString() || 'N/A'}</Text>
              </View>
            </View>

            {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: sectionTitleTextColor }]}>Production Companies</Text>
                {movieDetails.production_companies.map((company) => (
                  <View key={company.name} style={styles.companyRow}>
                    {company.logo_path ? (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${company.logo_path}` }}
                        style={styles.companyLogo}
                        resizeMode='contain'
                      />
                    ): 
                      <Image
                        source={require('../assets/images/placeholder.png')}
                        style={styles.companyLogo}
                        resizeMode='contain' />
                    }
                    <Text style={styles.companyName}>{company.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {movieDetails.homepage && (
              <View style={styles.section}>
                <TouchableOpacity onPress={handleHomepagePress}>
                  <Text style={styles.homepageLink}>Visit Official Website</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },

  scrollableContent: {
    flex: 1,
    //backgroundColor: '#000',
  },

  content: {
    padding: 20,
    paddingTop: 30,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Lexend',
  },

  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
    fontFamily: 'Lexend',
  },

  basicInfoContainer: {
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  label: {
    fontWeight: '500',
    marginRight: 10,
    minWidth: 100,
    fontFamily: 'Lexend',
  },

  value: {
    flex: 1,
    fontFamily: 'Lexend',
    fontWeight: '400'
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFD700',
    fontFamily: 'Lexend',
  },

  overview: {
    lineHeight: 24,
    fontSize: 16,
    fontFamily: 'Lexend',
    fontWeight: '400'
  },

  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  companyLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },

  companyName: {
    fontSize: 16,
    flex: 1,
    fontFamily: 'Lexend',
    fontWeight: '400'
  },

  homepageLink: {
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Lexend',
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

  backdropContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
  },

  backdropImage: {
    width: '100%',
    height: '100%',
  },

  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },

  movieInfoOverlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },

  movieTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Lexend',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  movieMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    backgroundColor: 'transparent',
  },

  movieYear: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend',
    fontWeight: '300'
  },

  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'transparent',
  },

  starsText: {
    fontSize: 16,
    color: '#FFD700',
  },

  movieDuration: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend',
    fontWeight: '300'
  },

  genresContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 8,
  },

  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  genreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lexend',
  },

  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lexend',
    textAlign: 'center',
    flex: 1,
  },

  headerSpacer: {
    width: 40,
  },

  errorButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },

  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },

  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lexend',
  },

  backButtonError: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lexend',
  },
});