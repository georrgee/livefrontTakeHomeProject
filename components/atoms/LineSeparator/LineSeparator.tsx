import React from 'react';
import { View } from '../Themed';
import { styles } from './styles';
/** @description **ATOM** component to display a line separator */
const LineSeparator: React.FC = () => {
  return <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
};

export default LineSeparator;