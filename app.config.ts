import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({

  ...config,
  name: 'quikMovies',
  slug: 'quikMovies',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'quikmovies',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },

  ios: {
    supportsTablet: true,
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },

    edgeToEdgeEnabled: true,
  },

  plugins: ['expo-router'],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },
});