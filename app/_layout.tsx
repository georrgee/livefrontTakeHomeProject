import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Lexend: require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
}
