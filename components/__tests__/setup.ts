import '@testing-library/jest-native/extend-expect';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('lucide-react-native', () => ({
  ChevronLeft: () => 'ChevronLeft',
  RotateCcw: () => 'RotateCcw',
  Star: () => 'Star',
  WifiOff: () => 'WifiOff',
}));

jest.mock('expo-network', () => ({
  getNetworkStateAsync: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

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
    useAnimatedScrollHandler: jest.fn(),
    useAnimatedProps: jest.fn(() => ({})),
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
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
    LinearTransition: jest.fn(),
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

jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  ScrollView: 'ScrollView',
  TouchableOpacity: 'TouchableOpacity',
  ActivityIndicator: 'ActivityIndicator',
  Pressable: 'Pressable',
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

global.console.warn = jest.fn();