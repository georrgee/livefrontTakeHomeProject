import React from 'react';
import { render } from '@testing-library/react-native';
import PosterImage from '../atoms/PosterImage/PosterImage';

describe('PosterImage Atom Component', () => {

  it('renders the image when the uri is provided', () => {

    const testUri = 'https://img.shgstatic.com/clutch-static-prod/og_profile/s3fs-public/logos/livefront.png';
    const { getByLabelText } = render(<PosterImage uri={testUri} />);

    const image = getByLabelText('Movie Poster');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(testUri);
  });

  it('renders loading indicator when uri is NOT provided', () => {
    const { getByTestId } = render(<PosterImage uri={undefined} />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders loading indicator when uri is null', () => {
    const { queryByLabelText } = render(<PosterImage uri={null as any} />);
    expect(queryByLabelText('Movie Poster')).toBeNull();
  });
});