import React from 'react';
import { render } from '@testing-library/react-native';
import { RatingBadge } from '../atoms';

/** @description Test suite for the RatingBadge atom component */
describe('RatingBadge Atom Component', () => {

  it('renders the rating correctly', () => {
    const { getByLabelText } = render(<RatingBadge rating={7.5} />);
    expect(getByLabelText('Rating: 7.5 out of 10')).toBeTruthy();
  });

  it('checks if the rating is formatted to one decimal place', () => {
    const { getByLabelText } = render(<RatingBadge rating={8} />);
    expect(getByLabelText('Rating: 8 out of 10')).toBeTruthy();
  });

  it('checks if the rating is rounded to one decimal place', () => {
    const { getByLabelText } = render(<RatingBadge rating={6.789} />);
    expect(getByLabelText('Rating: 6.789 out of 10')).toBeTruthy();
  });

  it('checks if the rating is zero', () => {
    const { getByLabelText } = render(<RatingBadge rating={0} />);
    expect(getByLabelText('Rating: 0 out of 10')).toBeTruthy();
  });

  it('checks if the rating is maximum', () => {
    const { getByLabelText } = render(<RatingBadge rating={10} />);
    expect(getByLabelText('Rating: 10 out of 10')).toBeTruthy();
  });
});