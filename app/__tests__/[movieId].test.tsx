import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { AccessibilityInfo, Linking } from 'react-native';
import MovieDetailsScreen from '../[movieId]';
import { ACCESSIBILITY_LABELS, UI_MESSAGES } from '@/constants';
import { MovieDetails } from '@/types';
import '../../components/__tests__/setup';

const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
};

jest.mock('expo-router', () => ({
  useRouter: () => mockRouter,
  useLocalSearchParams: jest.fn(() => ({ movieId: '1' })),
  useFocusEffect: jest.fn((callback) => {
    if (typeof callback === 'function') {
      callback();
    }
  }),
}));

const mockUseMovieDetails = {
  movieDetails: null as MovieDetails | null,
  isLoading: false,
  errorMessage: null as string | null,
  refetchMovieDetails: jest.fn(),
};

const mockUseNetworkStatus = {
  isConnected: true,
  isInternetReachable: true,
};

jest.mock('@/hooks', () => ({
  useMovieDetails: jest.fn(() => mockUseMovieDetails),
  useNetworkStatus: jest.fn(() => mockUseNetworkStatus),
}));

jest.mock('@/services', () => ({
  movieService: {
    getBackdropImage: jest.fn((path: string) => `https://image.tmdb.org/t/p/original${path}`),
  },
}));

jest.mock('@/utils', () => ({
  formatMovieRunTime: jest.fn((runtime: number) => `${runtime} min`),
  formatYear: jest.fn((date: string) => '2023'),
}));

const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview that describes the plot.',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  budget: 1000000,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
  ],
  runtime: 120,
  production_companies: [
    { logo_path: '/logo.jpg', name: 'Test Studios' },
    { logo_path: null, name: 'Another Studio' },
  ],
  status: 'Released',
  homepage: 'https://testmovie.com',
  revenue: 5000000,
};

describe('MovieDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMovieDetails.movieDetails = null;
    mockUseMovieDetails.isLoading = false;
    mockUseMovieDetails.errorMessage = null;
    mockUseNetworkStatus.isConnected = true;
    mockUseNetworkStatus.isInternetReachable = true;
  });

  describe('Loading State', () => {
    it('renders loading indicator when isLoading is true', () => {
      mockUseMovieDetails.isLoading = true;

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Loading movie details...')).toBeTruthy();
    });
  });

  describe('Network Error State', () => {
    it('renders network error when not connected', () => {
      mockUseNetworkStatus.isConnected = false;

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Connect to the internet to view movie details.')).toBeTruthy();
    });

    it('renders network error when internet is not reachable', () => {
      mockUseNetworkStatus.isInternetReachable = false;

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Connect to the internet to view movie details.')).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('renders error message when there is an error', () => {
      mockUseMovieDetails.errorMessage = 'Failed to load movie';

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Failed to load movie')).toBeTruthy();
      expect(getByText(UI_MESSAGES.NETWORK_ERROR.RETRY_BUTTON)).toBeTruthy();
      expect(getByText(UI_MESSAGES.NAVIGATION.BACK_BUTTON)).toBeTruthy();
    });

    it('renders default error when movieDetails is null without error message', () => {
      mockUseMovieDetails.movieDetails = null;
      mockUseMovieDetails.errorMessage = null;

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Movie not found')).toBeTruthy();
    });

    it('calls refetchMovieDetails when retry button is pressed', () => {
      mockUseMovieDetails.errorMessage = 'Failed to load movie';

      const { getByText } = render(<MovieDetailsScreen />);

      fireEvent.press(getByText(UI_MESSAGES.NETWORK_ERROR.RETRY_BUTTON));

      expect(mockUseMovieDetails.refetchMovieDetails).toHaveBeenCalled();
    });

    it('calls router.back when back button is pressed in error state', () => {
      mockUseMovieDetails.errorMessage = 'Failed to load movie';

      const { getByText } = render(<MovieDetailsScreen />);

      fireEvent.press(getByText(UI_MESSAGES.NAVIGATION.BACK_BUTTON));

      expect(mockRouter.back).toHaveBeenCalled();
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      mockUseMovieDetails.movieDetails = mockMovieDetails;
    });

    it('renders movie details correctly', () => {
      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Test Movie')).toBeTruthy();
      expect(getByText('This is a test movie overview that describes the plot.')).toBeTruthy();
    });

    it('renders movie metadata correctly', () => {
      const { getByText, getByLabelText } = render(<MovieDetailsScreen />);

      expect(getByText('2023')).toBeTruthy(); 
      expect(getByLabelText('Runtime: 120 min')).toBeTruthy(); 
      expect(getByText('8.5/10')).toBeTruthy(); 
    });

    it('renders production companies correctly', () => {
      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Test Studios')).toBeTruthy();
      expect(getByText('Another Studio')).toBeTruthy();
    });

    it('renders homepage link when available', () => {
      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Visit Official Website')).toBeTruthy();
    });

    it('opens homepage URL when link is pressed', () => {
      const { getByText } = render(<MovieDetailsScreen />);

      fireEvent.press(getByText('Visit Official Website'));

      expect(Linking.openURL).toHaveBeenCalledWith('https://testmovie.com');
    });

    it('does not render homepage link when not available', () => {
      mockUseMovieDetails.movieDetails = {
        ...mockMovieDetails,
        homepage: '',
      };

      const { queryByText } = render(<MovieDetailsScreen />);

      expect(queryByText('Visit Official Website')).toBeNull();
    });

    it('calls router.back when back button is pressed', () => {
      render(<MovieDetailsScreen />);

      const backButton = screen.getByLabelText(ACCESSIBILITY_LABELS.NAVIGATION.BACK_BUTTON);
      expect(backButton).toBeTruthy();
      fireEvent.press(backButton);
      expect(mockRouter.back).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseMovieDetails.movieDetails = mockMovieDetails;
    });

    it('announces movie details loaded on focus', async () => {
      render(<MovieDetailsScreen />);

      await waitFor(() => {
        expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
          ACCESSIBILITY_LABELS.ANNOUNCEMENTS.MOVIE_DETAILS_LOADED('Test Movie')
        );
      });
    });

    it('has correct accessibility labels for navigation elements', () => {
      const { getByLabelText } = render(<MovieDetailsScreen />);
      expect(getByLabelText(ACCESSIBILITY_LABELS.NAVIGATION.BACK_BUTTON)).toBeTruthy();
    });

    it('has correct accessibility labels for movie website link', () => {
      const { getByLabelText } = render(<MovieDetailsScreen />);

      expect(getByLabelText(
        ACCESSIBILITY_LABELS.NAVIGATION.MOVIE_WEBSITE('Test Movie')
      )).toBeTruthy();
    });

    it('has correct accessibility structure for rating stars', () => {
      const { getByLabelText } = render(<MovieDetailsScreen />);

      expect(getByLabelText('4.3 out of 5 stars, 8.5 out of 10')).toBeTruthy();
    });

    it('has correct accessibility labels for genres', () => {
      const { getByLabelText } = render(<MovieDetailsScreen />);
      expect(getByLabelText('Genres: Action, Adventure')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing backdrop image gracefully', () => {
      mockUseMovieDetails.movieDetails = {
        ...mockMovieDetails,
        backdrop_path: null,
      };

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Test Movie')).toBeTruthy();
      expect(getByText('Overview')).toBeTruthy();
    });

    it('handles missing production company logos', () => {
      mockUseMovieDetails.movieDetails = {
        ...mockMovieDetails,
        production_companies: [
          { logo_path: null, name: 'Studio Without Logo' },
        ],
      };

      const { getByText } = render(<MovieDetailsScreen />);
      expect(getByText('Studio Without Logo')).toBeTruthy();
    });

    it('handles missing budget gracefully', () => {
      const movieDetailsWithoutBudget = {
        ...mockMovieDetails,
        budget: undefined as any, // Simulate missing budget from API
      };
      
      mockUseMovieDetails.movieDetails = movieDetailsWithoutBudget;

      const { getByText } = render(<MovieDetailsScreen />);

      expect(getByText('Budget:')).toBeTruthy();
      // The component should render "N/A" for missing budget
      const budgetElements = screen.getAllByText(/N\/A/);
      expect(budgetElements.length).toBeGreaterThan(0);
    });

    it('handles missing revenue gracefully', () => {
      const movieDetailsWithoutRevenue = {
        ...mockMovieDetails,
        revenue: undefined as any,
      };
      
      mockUseMovieDetails.movieDetails = movieDetailsWithoutRevenue;
      const { getByText } = render(<MovieDetailsScreen />);
      expect(getByText('Revenue:')).toBeTruthy();
      const revenueElements = screen.getAllByText(/N\/A/);
      expect(revenueElements.length).toBeGreaterThan(0);
    });

    it('handles both missing budget and revenue gracefully', () => {
      const movieDetailsWithoutFinancials = {
        ...mockMovieDetails,
        budget: undefined as any,
        revenue: undefined as any,
      };
      
      mockUseMovieDetails.movieDetails = movieDetailsWithoutFinancials;

      const { getByText } = render(<MovieDetailsScreen />);
      expect(getByText('Budget:')).toBeTruthy();
      expect(getByText('Revenue:')).toBeTruthy();
      const naElements = screen.getAllByText(/N\/A/);
      expect(naElements.length).toBeGreaterThanOrEqual(2);
    });
  });
});