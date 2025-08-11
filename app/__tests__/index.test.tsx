import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { AccessibilityInfo, View } from 'react-native';
import HomeScreen from '../index';
import { ACCESSIBILITY_LABELS } from '@/constants';

// Mock MoviesCarousel component with proper React element
const mockOnSelect = jest.fn();
jest.mock('@/components/organisms', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockMoviesCarousel = ({ onSelect }: { onSelect: (movie: any) => void }) => {
    mockOnSelect.mockImplementation(onSelect);
    return React.createElement(View, { testID: 'movies-carousel' }, 'MoviesCarousel');
  };

  return {
    MoviesCarousel: MockMoviesCarousel,
  };
});

describe('HomeScreen', () => {
  let mockRouter: any;

  beforeAll(() => {
    mockRouter = require('expo-router').useRouter();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('movies-carousel')).toBeTruthy();
  });

  it('has correct accessibility label for home screen', () => {
    const { getByLabelText } = render(<HomeScreen />);
    expect(getByLabelText(ACCESSIBILITY_LABELS.NAVIGATION.HOME_SCREEN)).toBeTruthy();
  });

  it('handles movie selection correctly', () => {
    const mockMovie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
    };

    render(<HomeScreen />);

    mockOnSelect(mockMovie);

    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
      ACCESSIBILITY_LABELS.ANNOUNCEMENTS.NAVIGATING(mockMovie.title)
    );

    expect(mockRouter.push).toHaveBeenCalledWith(`/${mockMovie.id}`);
  });

  it('applies correct styles and layout', () => {
    const { getByLabelText } = render(<HomeScreen />);
    const container = getByLabelText(ACCESSIBILITY_LABELS.NAVIGATION.HOME_SCREEN);

    const styles = Array.isArray(container.props.style) ? container.props.style : [container.props.style];
    const hasExpectedStyles = styles.some((style: { flex?: number; alignItems?: string; justifyContent?: string }) =>
      style &&
      style.flex === 1 &&
      style.alignItems === 'center' &&
      style.justifyContent === 'center'
    );

    expect(hasExpectedStyles).toBe(true);
  });

  it('handles carousel ref correctly when null', () => {
    const mockCarouselRef = { current: null };
    jest.spyOn(React, 'useRef').mockReturnValue(mockCarouselRef);

    render(<HomeScreen />);

    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
      ACCESSIBILITY_LABELS.ANNOUNCEMENTS.SCREEN_LOADED
    );
    expect(AccessibilityInfo.setAccessibilityFocus).not.toHaveBeenCalled();
  });
});