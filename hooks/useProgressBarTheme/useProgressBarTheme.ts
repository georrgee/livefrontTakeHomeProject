import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export const useProgressBarTheme = () => {

  const colorScheme = useColorScheme();

  return {
    activeColor: Colors[colorScheme ?? 'light'].progressBar,
    inactiveColor: '#818080',
  };
};