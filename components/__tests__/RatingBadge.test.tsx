import React from 'react';
import { render } from '@testing-library/react-native';
import { RatingBadge } from '../atoms';

describe('RatingBadge Atom Component', () => {

  it('renders the rating correctly', () => {
    const { getByText } = render(<RatingBadge rating={7.5} />);
    expect(getByText('7.5')).toBeTruthy();
  });

  it('checks if the rating is formatted to one decimal place', () => {
    const { getByText } = render(<RatingBadge rating={8} />);
    expect(getByText('8.0')).toBeTruthy();
  });

  it('checks if the rating is rounded to one decimal place', () => {
    const { getByText } = render(<RatingBadge rating={6.789} />);
    expect(getByText('6.8')).toBeTruthy();
  });

  it('checks if the rating is zero', () => {
    const { getByText } = render(<RatingBadge rating={0} />);
    expect(getByText('0.0')).toBeTruthy();
  });

  it('checks if the rating is maximum', () => {
    const { getByText } = render(<RatingBadge rating={10} />);
    expect(getByText('10.0')).toBeTruthy();
  });
});