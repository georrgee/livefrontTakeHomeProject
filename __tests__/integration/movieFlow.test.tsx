import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import tmdbAPI from '@/services/tmdbAPI';
import HomeScreen from '@/app/index';
import { Movie } from '@/types';

jest.mock('@/components/molecules/MovieCard/MovieCard', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');

  return {
    MovieCard: ({ movie, onPress }: { movie: Movie; onPress: (movie: Movie) => void }) => (
      React.createElement(TouchableOpacity, {
        onPress: () => onPress(movie),
        testID: `movie-card-${movie.id}`,
        children: [
          React.createElement(Text, { key: 'title' }, movie.title.toUpperCase()),
          React.createElement(Text, { key: 'overview' }, movie.overview),
          React.createElement(Text, { key: 'rating' }, movie.vote_average),
        ]
      })
    ),
  };
});

jest.mock('@/hooks', () => ({
  usePopularMovies: jest.fn(),
  useNetworkStatus: jest.fn(() => ({
    isConnected: true,
    isInternetReachable: true,
  })),
  useMovieDetails: jest.fn(),
}));

const mockAxios = new MockAdapter(tmdbAPI);

const mockPopularMoviesResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
    },
  ],
  total_pages: 5,
};

const mockMovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  runtime: 120,
  budget: 1000000,
  revenue: 5000000,
  status: 'Released',
  tagline: 'Test tagline',
  homepage: 'https://test.com',
  imdb_id: 'tt1234567',
  production_companies: [],
};

describe('Movie Flow Integration Tests', () => {
  beforeEach(() => {
    jest.useRealTimers();
    mockAxios.reset();

    const { router } = require('expo-router');
    router.push.mockClear();
    router.back.mockClear();
    router.replace.mockClear();

    const { usePopularMovies, useNetworkStatus, useMovieDetails } = require('@/hooks');

    usePopularMovies.mockReturnValue({
      popularMovies: mockPopularMoviesResponse,
      isLoading: false,
      isLoadingMore: false,
      errorMessage: null,
      refetchPopularMovies: jest.fn(),
      loadMorePopularMovies: jest.fn(),
      hasNextPage: false,
    });

    useNetworkStatus.mockReturnValue({
      isConnected: true,
      isInternetReachable: true,
    });

    useMovieDetails.mockReturnValue({
      movieDetails: mockMovieDetails,
      isLoading: false,
      errorMessage: null,
      refetchMovieDetails: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should display popular movies and navigate to detail screen', async () => {
    mockAxios.onGet('/movie/popular').reply(200, mockPopularMoviesResponse);

    const { unmount } = render(<HomeScreen />);

    try {
      await waitFor(
        () => {
          const movieElement = screen.getByText('Test Movie');
          expect(movieElement).toBeTruthy();
        },
        {
          timeout: 5000,
          interval: 100
        }
      );

      const movieCard = screen.getByTestId('movie-card-1');

      await act(async () => {
        fireEvent.press(movieCard);
      });

      const { router } = require('expo-router');
      expect(router.push).toHaveBeenCalledWith('/1');

    } finally {
      // Ensure proper cleanup
      unmount();
    }
  });

  it('should handle network errors gracefully', async () => {
    const { usePopularMovies } = require('@/hooks');
    usePopularMovies.mockReturnValue({
      popularMovies: null,
      isLoading: false,
      isLoadingMore: false,
      errorMessage: 'Network error occurred',
      refetchPopularMovies: jest.fn(),
      loadMorePopularMovies: jest.fn(),
      hasNextPage: false,
    });
  
    mockAxios.onGet('/movie/popular').reply(500);
  
    const { unmount } = render(<HomeScreen />);
  
    try {
      await waitFor(
        () => {
          expect(screen.getByText(/Error: Network error occurred/)).toBeTruthy();
        },
        { timeout: 5000 }
      );
    } finally {
      unmount();
    }
  });
});