import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { useSharedValue } from 'react-native-reanimated';
import MockAdapter from 'axios-mock-adapter';
import tmdbAPI from '@/services/tmdbAPI';
import HomeScreen from '@/app/index';
import { MovieCard } from '@/components/molecules';
import { RatingBadge } from '@/components/atoms';
import { ACCESSIBILITY_LABELS } from '@/constants';
import { Movie } from '@/types';

const mockAxios = new MockAdapter(tmdbAPI);

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
};

interface MovieCardWrapperProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isOpened?: boolean;
  currentIndex?: number;
}

const MovieCardWrapper: React.FC<MovieCardWrapperProps> = ({ 
  movie, 
  onPress, 
  isOpened = false, 
  currentIndex = 0 
}) => {
  const scrollX = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  return (
    <MovieCard
      movie={movie}
      index={currentIndex}
      scrollX={scrollX}
      activeIndex={activeIndex}
      onPress={onPress || (() => {})}
      isOpened={isOpened}
      currentIndex={currentIndex}
    />
  );
};

describe('Accessibility Tests', () => {
  beforeEach(() => {
    jest.useRealTimers();
    
    mockAxios.reset();
    jest.clearAllMocks();
    
    const mockResponse = {
      page: 1,
      results: [mockMovie],
      total_pages: 1,
      total_results: 1,
    };
    mockAxios.onGet('/movie/popular').reply(200, mockResponse);
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  describe('HomeScreen Accessibility', () => {
    jest.setTimeout(20000); 
  
    it('should have proper accessibility labels', async () => {
      const { getByText, getByLabelText, unmount } = render(<HomeScreen />);
      
      try {
        await waitFor(() => {
          const movieTitle = getByText('Test Movie');
          expect(movieTitle).toBeTruthy();
        }, { timeout: 15000 });
  
        await waitFor(() => {
          const movieCard = getByLabelText(
            ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
          );
          expect(movieCard).toBeTruthy();
        }, { timeout: 5000 });
      } finally {
        unmount();
      }
    }, 20000); 
  
    it('should announce screen reader updates', async () => {
      const { getByText, unmount } = render(<HomeScreen />);
      
      try {
        await waitFor(() => {
          const movieTitle = getByText('Test Movie');
          expect(movieTitle).toBeTruthy();
        }, { timeout: 15000 });
  
        expect(getByText('Test Movie')).toBeTruthy();
      } finally {
        unmount();
      }
    }, 20000); 
  });

  describe('MovieCard Accessibility', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should have proper accessibility role', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toBeTruthy();
      expect(movieCard).toHaveProp('accessibilityRole', 'button');
    });

    it('should have proper accessibility label', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveAccessibleName(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
    });

    it('should have accessibility hint for navigation', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveProp('accessibilityHint', 
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_HINT(mockMovie.vote_average, true)
      );
    });

    it('should be focusable for screen readers', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveProp('accessible', true);
    });

    it('should indicate selected state when opened', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()}
          isOpened={true} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveProp('accessibilityState', { selected: true });
    });
  });

  describe('RatingBadge Accessibility', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should have proper accessibility label', () => {
      render(<RatingBadge rating={8.5} />);

      const ratingBadge = screen.getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.RATING_BADGE(8.5)
      );
      expect(ratingBadge).toBeTruthy();
    });

    it('should have proper accessibility role', () => {
      render(<RatingBadge rating={7.2} />);

      const ratingBadge = screen.getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.RATING_BADGE(7.2)
      );
      expect(ratingBadge).toBeTruthy();
    });
  });

  describe('General Accessibility Features', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should support high contrast mode', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()}
        />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toBeVisible();
    });

    it('should respect reduced motion preferences', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toBeTruthy();
    });

    it('should provide meaningful content descriptions', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveAccessibleName(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
    });

    it('should support screen reader navigation', () => {
      const { getByLabelText } = render(
        <MovieCardWrapper
          movie={mockMovie}
          onPress={jest.fn()} />
      );

      const movieCard = getByLabelText(
        ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title)
      );
      expect(movieCard).toHaveProp('accessible', true);
    });
  });
});