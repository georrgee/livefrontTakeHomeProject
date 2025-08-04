import { StyleSheet } from "react-native";

/** @description Styles for the NetworkError Atom component */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },

  iconContainer: {
    marginBottom: 16,
    opacity: 0.7,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lexend',
    textAlign: 'center',
    marginBottom: 8,
  },

  message: {
    fontSize: 14,
    fontFamily: 'Lexend',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
    lineHeight: 20,
  },

  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lexend',
    color: '#FFD700',
  },
});