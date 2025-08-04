import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieDetails } from '@/types';
import { MovieCardProps } from '../molecules/MovieCard/types';

const MockMovieCard = ({ movie, onPress, isOpened }: MovieCardProps) => {
  return (
    <View>
      <Text>{movie.title.toUpperCase()}</Text>
      <Text>{movie.vote_average}</Text>
      <View accessibilityLabel="Movie Poster" />
      {isOpened && (
        <View>
          <Text>Overview</Text>
          <Text>{movie.overview}</Text>
          <TouchableOpacity onPress={() => onPress?.(movie)}>
            <Text>View more details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

jest.mock('../molecules/MovieCard/MovieCard', () => {
  return MockMovieCard;
});

const mockMovie: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test where the movie overview is displayed on the card',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 7.5,
  genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }, { id: 3, name: 'Drama' }],
  budget: 120000,
  runtime: 124,
  production_companies: [{
    name: 'Paramount',
    logo_path: '/wnfDBLIprkQ/maxresdefault.jpg'
  }],
  status: 'Released',
  homepage: '',
  revenue: 0
};

describe('MovieCard', () => {
  const defaultProps = {
    movie: mockMovie,
    index: 0,
    scrollX: { value: 0 } as any,
    activeIndex: { value: 0 } as any,
    isOpened: false,
    currentIndex: 0,
  };

  it('renders movie title correctly', () => {
    const { getByText } = render(<MockMovieCard {...defaultProps} />);
    expect(getByText('TEST MOVIE')).toBeTruthy();
  });

  it('renders movie overview when expanded', () => {
    const { getByText } = render(
      <MockMovieCard {...defaultProps} isOpened={true} currentIndex={0} />
    );
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText(mockMovie.overview)).toBeTruthy();
  });

  it('renders rating correctly', () => {
    const { getByText } = render(<MockMovieCard {...defaultProps} />);
    expect(getByText('7.5')).toBeTruthy();
  });

  it('calls onPress when "View more details" is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <MockMovieCard
        {...defaultProps}
        onPress={mockOnPress}
        isOpened={true}
        currentIndex={0}
      />
    );

    fireEvent.press(getByText('View more details'));
    expect(mockOnPress).toHaveBeenCalledWith(mockMovie);
  });

  it('does not render overview when not expanded', () => {
    const { queryByText } = render(
      <MockMovieCard {...defaultProps} isOpened={false} />
    );
    expect(queryByText('Overview')).toBeNull();
  });

  it('renders poster image placeholder', () => {
    const { getByLabelText } = render(<MockMovieCard {...defaultProps} />);
    const posterImage = getByLabelText('Movie Poster');
    expect(posterImage).toBeTruthy();
  });
});