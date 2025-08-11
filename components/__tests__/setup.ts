/** @description Mocks the expo-router library; using to test the app's navigation */
jest.mock('expo-router', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  const mockReplace = jest.fn();
  
  return {
    useRouter: () => ({
      push: mockPush,
      back: mockBack,
      replace: mockReplace,
    }),
    router: {
      push: mockPush,
      back: mockBack,
      replace: mockReplace,
    },
    useLocalSearchParams: () => ({}),
    useFocusEffect: jest.fn((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

/** @description Mocks the expo-linear-gradient library; using to test the gradients */
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

/** @description Mocks the lucide-react-native library; using to test the icons */
jest.mock('lucide-react-native', () => ({
  ChevronLeft: () => 'ChevronLeft',
  RotateCcw: () => 'RotateCcw',
  Star: () => 'Star',
  WifiOff: () => 'WifiOff',
}));

/** @description Mocks the expo-network library; testing connection */
jest.mock('expo-network', () => ({
  getNetworkStateAsync: jest.fn(() => Promise.resolve({ isConnected: true })),
}));


/** @description Mocks the react-native-reanimated library; using to test the animations */
jest.mock('react-native-reanimated', () => {
  const View = 'View';
  const Text = 'Text';
  const Image = 'Image';
  const ScrollView = 'ScrollView';
  const FlatList = 'FlatList';

  return {
    default: {
      View,
      Text,
      Image,
      ScrollView,
      FlatList,
    },
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    useAnimatedGestureHandler: jest.fn(),
    useAnimatedRef: jest.fn(() => ({ current: null })),
    useDerivedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedScrollHandler: jest.fn(() => () => { }),
    useAnimatedProps: jest.fn(() => ({})),
    useAnimatedReaction: jest.fn((prepare, react) => {
      try {
        const preparedValue = prepare();
        if (typeof react === 'function') {
          react(preparedValue);
        }
      } catch (error) {} // this line is to just only ignores errors...
    }),
    withTiming: jest.fn((value) => value),
    withSpring: jest.fn((value) => value),
    withDecay: jest.fn((value) => value),
    withDelay: jest.fn((_, value) => value),
    withRepeat: jest.fn((value) => value),
    withSequence: jest.fn((...values) => values[values.length - 1]),
    cancelAnimation: jest.fn(),
    measure: jest.fn(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      pageX: 0,
      pageY: 0,
    })),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: jest.fn(),
      back: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
    Extrapolate: {
      EXTEND: 'extend',
      CLAMP: 'clamp',
      IDENTITY: 'identity',
    },
    interpolate: jest.fn(),
    Extrapolation: {
      EXTEND: 'extend',
      CLAMP: 'clamp',
      IDENTITY: 'identity',
    },

    runOnJS: jest.fn((fn) => {
      return (...args: any[]) => {
        try {
          return fn(...args);
        } catch (error) {} // this line is to just only ignores errors...
      };
    }),

    LinearTransition: {
      springify: jest.fn(() => ({
        damping: jest.fn().mockReturnThis(),
        stiffness: jest.fn().mockReturnThis(),
      })),
    },

    FadeIn: jest.fn(),
    FadeOut: jest.fn(),
    SlideInUp: jest.fn(),
    SlideOutUp: jest.fn(),
    SlideInDown: jest.fn(),
    SlideOutDown: jest.fn(),
    SlideInLeft: jest.fn(),
    SlideOutLeft: jest.fn(),
    SlideInRight: jest.fn(),
    SlideOutRight: jest.fn(),
    ZoomIn: jest.fn(),
    ZoomOut: jest.fn(),
    BounceIn: jest.fn(),
    BounceOut: jest.fn(),
  };
});

/** @description Mocks the react-native-reanimated/src/specs/NativeReanimatedModule library; using to test the animations */
jest.mock('react-native-reanimated/src/specs/NativeReanimatedModule', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => ({
      installCoreFunctions: jest.fn(),
      makeShareableClone: jest.fn(),
      makeMutable: jest.fn(),
      makeRemote: jest.fn(),
      startMapper: jest.fn(),
      stopMapper: jest.fn(),
      registerEventHandler: jest.fn(),
      unregisterEventHandler: jest.fn(),
      getViewProp: jest.fn(),
      enableLayoutAnimations: jest.fn(),
      registerSensor: jest.fn(),
      unregisterSensor: jest.fn(),
      configureProps: jest.fn(),
      subscribeForKeyboardEvents: jest.fn(),
      unsubscribeFromKeyboardEvents: jest.fn(),
      configureLayoutAnimation: jest.fn(),
      setShouldAnimateExitingForTag: jest.fn(),
    })),
  },
}));

/** @description Mocks the react-native-reanimated/src/specs/NativeWorkletsModule library; using to test the animations */
jest.mock('react-native-reanimated/src/specs/NativeWorkletsModule', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => ({
      installTurboModule: jest.fn(),
      makeShareableClone: jest.fn(),
      scheduleOnUI: jest.fn(),
      executeOnUIRuntimeSync: jest.fn(),
      createWorkletRuntime: jest.fn(),
      scheduleOnRuntime: jest.fn(),
    })),
  },
}));

/** @description Mocks the react-native library; using to test the app's UI */
jest.mock('react-native', () => ({
  AccessibilityInfo: {
    announceForAccessibility: jest.fn(),
    setAccessibilityFocus: jest.fn(),
    isScreenReaderEnabled: jest.fn(() => Promise.resolve(false)),
    isReduceMotionEnabled: jest.fn(() => Promise.resolve(false)),
    isHighContrastEnabled: jest.fn(() => Promise.resolve(false)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  Linking: {
    openURL: jest.fn(),
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    getInitialURL: jest.fn(() => Promise.resolve(null)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  ScrollView: 'ScrollView',
  TouchableOpacity: 'TouchableOpacity',
  ActivityIndicator: 'ActivityIndicator',
  Pressable: 'Pressable',
  StatusBar: 'StatusBar', // Add StatusBar mock
  useColorScheme: jest.fn(() => 'light'),

  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios || obj.default),
    Version: '14.0',
  },

  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667, scale: 2, fontScale: 1 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },

  StyleSheet: {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style),
    hairlineWidth: 1,
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
}));

/** @description Mocks the react-native-gesture-handler library; using to test the gestures (swiping, tapping, etc.) */
jest.mock('react-native-gesture-handler', () => ({
  Gesture: {
    Tap: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      runOnJS: jest.fn().mockReturnThis(),
    })),
    Pan: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      runOnJS: jest.fn().mockReturnThis(),
    })),
    Fling: jest.fn(() => ({
      direction: jest.fn().mockReturnThis(),
      onStart: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      runOnJS: jest.fn().mockReturnThis(),
    })),
    Exclusive: jest.fn((...gestures) => ({
      onStart: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      runOnJS: jest.fn().mockReturnThis(),
      gestures,
    })),
  },
  Directions: {
    RIGHT: 1,
    LEFT: 2,
    UP: 4,
    DOWN: 8,
  },
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
  GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  gestureHandlerRootHOC: (component: any) => component,
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
}));

/** @description Mocks the react-native-safe-area-context library; using to test the safe area insets (padding) */
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaFrame: jest.fn(() => ({
    x: 0,
    y: 0,
    width: 375,
    height: 812,
  })),
  withSafeAreaInsets: jest.fn((component) => component),
}));

/** @description Mocks the @/components/organisms library; using to test the MoviesCarousel component */
jest.mock('@/components/organisms', () => {
  const React = require('react');

  const MockMoviesCarousel = ({ onSelect }: { onSelect?: (movie: any) => void }) => {

    const { usePopularMovies } = require('@/hooks');
    const mockHookData = usePopularMovies();
    
    const mockMovie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/test-backdrop.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
    };

    const { ACCESSIBILITY_LABELS } = require('@/constants');

    if (mockHookData.errorMessage) {
      return React.createElement('View', {
        testID: 'movies-carousel',
        children: React.createElement('Text', {}, `Error: ${mockHookData.errorMessage}`)
      });
    }

    return React.createElement('View', {
      testID: 'movies-carousel',
      accessibilityRole: 'list',
      accessibilityLabel: ACCESSIBILITY_LABELS.CONTENT.MOVIE_CAROUSEL(1),
      children: [
        React.createElement('Text', { key: 'title' }, mockMovie.title),
        React.createElement('TouchableOpacity', {
          key: 'card',
          testID: `movie-card-${mockMovie.id}`,
          accessibilityRole: 'button',
          accessibilityLabel: ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_BUTTON(mockMovie.title),
          accessibilityHint: ACCESSIBILITY_LABELS.MOVIE_CARD.CARD_HINT(mockMovie.vote_average, true),
          accessible: true,
          onPress: () => onSelect?.(mockMovie),
        })
      ]
    });
  };

  return {
    MoviesCarousel: MockMoviesCarousel,
  };
});

global.console.warn = jest.fn();
global.console.error = jest.fn();

/** @description Clean global test setup */
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllTimers();
});