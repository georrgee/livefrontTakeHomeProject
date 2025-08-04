import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NetworkError } from '../atoms';

describe('NetworkError Atom Component', () => {

  it('renders the component with a default message if no custom message is provided', () => {
    const { getByText } = render(<NetworkError />);
    expect(getByText('No Internet Connection')).toBeTruthy();
    expect(getByText('Please check your internet connection and try again.')).toBeTruthy();
  });

  it('renders the component when there is a custom message', () => {
    const customMessage = 'Custom error message';
    const { getByText } = render(<NetworkError message={customMessage} />);
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('checks if the retry button is rendered when the prop onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(<NetworkError onRetry={mockOnRetry} />);
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('checks if the retry button is not rendered when the prop onRetry is not provided', () => {
    const { queryByText } = render(<NetworkError />);
    expect(queryByText('Try Again')).toBeNull();
  });

  it('calls the onRetry callback function when the user taps the retry button', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(<NetworkError onRetry={mockOnRetry} />);
    fireEvent.press(getByText('Try Again'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('checks if the custom styles are correctly displayed', () => {
    const customStyle = { backgroundColor: 'green' };
    const { getByTestId } = render(<NetworkError style={customStyle} testID="test-network-error-component" />);

    const component = getByTestId('test-network-error-component');
    const styleString = JSON.stringify(component.props.style);
    expect(styleString).toContain('"backgroundColor":"green"');
  });
});