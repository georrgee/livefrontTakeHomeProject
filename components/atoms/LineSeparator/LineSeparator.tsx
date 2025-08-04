import React from 'react';
import { View } from '../Themed';
import { styles } from './styles';

const LineSeparator: React.FC = () => {
  return (
    <View 
      style={styles.separator} 
      lightColor='#eee' 
      darkColor='rgba(255,255,255,0.1)' />
  )
};

export default LineSeparator;