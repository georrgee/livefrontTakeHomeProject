/** @description Accessibility labels & hints for the mobile app */
export const ACCESSIBILITY_LABELS = {
  NAVIGATION: {
    BACK_BUTTON: 'Go back to previous screen',
    BACK_BUTTON_HINT: 'Double tap to go back to the previous screen',
    HOME_SCREEN: 'Popular movies home screen',
    MOVIE_DETAILS: 'View movie details',
    MOVIE_WEBSITE: (title: string) => `Visit the ${title} official website`,
    MOVIE_WEBSITE_HINT: (title: string) => `Open the ${title} official website in a browser`
  },

  MOVIE_CARD: {
    POSTER_IMAGE: (title: string) => `Poster image for ${title}`,
    RATING_BADGE: (rating: number) => `Rating: ${rating} out of 10`,
    CARD_BUTTON: (title: string) => `Movie: ${title}`,
    CARD_HINT: (rating: number, hasOverview: boolean) => 
      `Rating ${rating} out of 10. ${hasOverview ? 'Swipe up to read overview and view more details.' : 'Tap to view more details.'}`,
    SELECTED_STATE: (title: string) => `${title} is currently selected`
  },

  PROGRESS: {
    LOADING_MOVIES: 'Loading popular movies',
    LOADING_MORE: 'Loading more movies',
    PROGRESS_INDICATOR: (current: number, total: number) => `Movie ${current} of ${total}`,
    PAGINATION_INDICATOR: (current: number, total: number) => `Page indicator showing movie ${current} of ${total}`,
    SWIPE_HINT: 'Swipe left or right to browse through popular movies'
  },

  ERRORS: {
    NETWORK_ERROR: 'Network connection error',
    NETWORK_ALERT: 'Network connection error',
    RETRY_BUTTON: 'Retry loading content',
    RETRY_HINT: 'Double tap to retry the network connection',
    NO_INTERNET: 'No internet connection available',
    GENERAL_ERROR: (message: string) => `Error occurred: ${message}`
  },

  CONTENT: {
    MOVIE_CAROUSEL: (count: number) => `Movies carousel with ${count} movies`,
    MOVIE_DETAILS_SCREEN: 'Movie details',
    MOVIE_DETAILS_REGION: (title: string) => `Movie details for ${title}`,
    RATING_SECTION: 'Movie rating',
    OVERVIEW_SECTION: 'Movie overview',
    OVERVIEW_TEXT: (overview: string) => `Movie overview: ${overview}`,
    VIEW_MORE_BUTTON: (title: string) => `View more details about ${title}`,
    VIEW_MORE_HINT: 'Double tap to navigate to the detailed movie information screen'
  },

  LOADING: {
    INDICATOR: 'Loading indicator',
    MOVIES_LABEL: 'Loading movies',
    MOVIES_HINT: 'Please wait while we fetch the latest movies',
    DETAILS_LABEL: 'Loading movie details',
    PROGRESS_BAR: 'Loading progress'
  },

  SWIPE_INDICATOR: {
    LABEL: 'Swipe up indicator',
    HINT: 'Swipe up to view more details about this movie'
  },

  ANNOUNCEMENTS: {
    SCREEN_LOADED: 'Popular movies screen loaded',
    MOVIE_DETAILS_LOADED: (title: string) => `${title} details loaded`,
    NAVIGATING: (title: string) => `Navigating to ${title} details`
  }
};