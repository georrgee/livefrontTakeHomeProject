import { memo } from 'react';
import Animated, { FadeInDown, FadeOutDown, SharedValue } from 'react-native-reanimated';
import { ProgressIndicator } from '@/components/atoms';
import { MoviePaginationProps } from './types';
import { styles } from './styles';
import { PAGINATION_CONSTANTS } from '@/constants';

/** @description A molecule component for the movie pagination */
export const MoviePagination = memo<MoviePaginationProps>((props) => {

  const { data, scrollX, isOpened = false } = props;
  const totalItems = data.length;

  if (totalItems <= 1) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(PAGINATION_CONSTANTS.ANIMATION_DURATION.FADE_IN)}
      exiting={FadeOutDown.duration(PAGINATION_CONSTANTS.ANIMATION_DURATION.FADE_OUT)}
      style={styles.container}>
      <ProgressIndicator
        scrollX={scrollX}
        totalItems={totalItems}
        isOpened={isOpened} />
    </Animated.View>
  );
});

export default MoviePagination;