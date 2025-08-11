import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View, useThemeColor } from '@/components/atoms';
import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';

/** @description mocks the useColorScheme hook */
const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;

/** @description mocks the Colors constant */
jest.mock('../../constants/Colors', () => ({
  light: {
    text: '#000000',
    background: '#ffffff',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
  },
}));

describe('Test Suites for all Themed Components: Text, View, useThemeColor', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue('light');
  });

  describe('Test suite: useThemeColor', () => {
    it('returns the light color from props when provided', () => {
      const { result } = renderHook(() => useThemeColor({ light: '#ff0000' }, 'text'));
      expect(result.current).toBe('#ff0000');
    });

    it('returns the default light color when props color not provided', () => {
      const { result } = renderHook(() => useThemeColor({}, 'text'));
      expect(result.current).toBe('#000000');
    });
  });

  /**@description Test suite for the Text Atom Component */
  describe('Text Atom Component', () => {
    it(`renders the text component with its theme color`, () => {
      const { getByText } = render(<Text>Text Atom Component Test</Text>);
      expect(getByText('Text Atom Component Test')).toBeTruthy();
    });

    it('checks if custom light color is applied', () => {
      const { getByText } = render(<Text lightColor="#ff0000">Custom Color Text</Text>);

      const textElement = getByText('Custom Color Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([{ color: '#ff0000' }])
      );
    });
  });

  /**@description Test suite for the View Atom Component */
  describe('View Atom Component', () => {
    it('renders the view component with its theme background color', () => {
      const { getByTestId } = render(<View testID="themed-view">Content</View>);
      expect(getByTestId('themed-view')).toBeTruthy();
    });

    it('renders the view component with custom background color', () => {
      const { getByTestId } = render(<View testID="themed-view" lightColor="#ff0000">Content</View>);
      const viewElement = getByTestId('themed-view');
      expect(viewElement.props.style).toEqual(
        expect.arrayContaining([{ backgroundColor: '#ff0000' }])
      );
    });
  });
});