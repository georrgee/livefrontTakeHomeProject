import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from 'expo-router';

const RootLayoutNavigation: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Quik Movies',
              headerLargeTitleStyle: { fontFamily: 'Lexend', fontWeight: '700' },
              headerShown: true,
              headerLargeTitle: true,
              headerTransparent: true
            }}
          />
          <Stack.Screen name="[movieId]" options={{ title: 'Movie Details', headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayoutNavigation;