import { StyleSheet } from 'react-native';
/** @description Styling for the MoviesCarousel Organism Component */

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
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