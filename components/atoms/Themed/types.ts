import { Text as DefaultText, View as DefaultView } from 'react-native';
import Colors from '@/constants/Colors';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export type ThemeColorProps = {
  light?: string;
  dark?: string;
};