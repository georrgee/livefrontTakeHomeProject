import { memo } from 'react';
import Animated from 'react-native-reanimated';
import { useProgressAnimation, useProgressBarTheme } from '@/hooks';
import { ProgressIndicatorProps } from './types';
import { styles } from './styles';
/**
 *  @param { number } scrollX The current scroll position of the list
 *  @param { number } totalItems The total number of items in the list
 *  @param { boolean } isOpened Whether the progress bar is opened
 *  @description **ATOM** component to display a progress bar under the list of movies */
const ProgressIndicator = memo<ProgressIndicatorProps>((props) => {

  const { scrollX, totalItems, isOpened } = props;

  const { progressStyle, containerStyle } = useProgressAnimation(scrollX, totalItems, isOpened);
  const { activeColor } = useProgressBarTheme();

  return (
    <Animated.View style={[styles.progressBarContainer, containerStyle]}>
      <Animated.View
        style={[
          styles.progressBar,
          { backgroundColor: activeColor },
          progressStyle,
        ]}
      />
    </Animated.View>
  );
});

export default ProgressIndicator;