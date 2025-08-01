import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { styles } from './styles';
import { PosterImageProps } from './types';
/** 
 * @param { string | undefined } uri - The URI of the movie poster image
 * @param { StyleProp<ImageStyle>} style - The style of the movie poster image
 * @description **ATOM** component for displaying a movie poster image */

const PosterImage: React.FC<PosterImageProps> = ({ uri, style }) => {

  if (!uri) {
    return (
      <View style={[styles.placeHolder, style]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  };

  return (
    <Image 
      accessibilityLabel={'Movie Poster'}
      source={{ uri }} 
      style={[style, { resizeMode: 'cover' }]} />
  )
};

export default PosterImage;