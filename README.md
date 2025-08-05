# QuikMovies - Take Home Project for LiveFront

This is a react native mobile application built with Expo that displays popular movies using The Movie Database (TMDB) API. This app features a modern, animated interface with a carousel-style movie browser and a detailed movie screen

![take-home-project](https://github.com/user-attachments/assets/30036504-f01e-4cda-9c3b-56a56d110c3a)

## 📋 Table of Contents
- [🎯 Project Overview](#-project-overview)
- [🏗️ Architecture & Features](#️-architecture--features)
  - [Screens](#screens)
  - [Key Features](#key-features)
  - [Technical Stack](#technical-stack)
- [🚀 Setup Instructions](#-setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running on Platforms](#running-on-platforms)
- [🧪 Testing](#-testing)
  - [Running Tests](#running-tests)
- [🔧 Third-Party Libraries](#-third-party-libraries)
  - [Core Dependencies](#core-dependencies)
  - [Development Dependencies](#development-dependencies)
- [🌐 API Integration](#-api-integration)
  - [API Features](#api-features)
- [📄 License](#-license)

## 🎯 Project Overview
This is a take-home submission for LiveFront that demonstrates:
- Two-screen architecture : Movie list (carousel) and movie details
- TMDB API integration for fetching popular movies and detailed information
- TypeScript implementation throughout the codebase
- Comprehensive testing with Jest and React Native Testing Library
- Modern UI/UX with animations, gradients, and responsive design
- Network status handling with offline detection and error states

## 🏗️ Architecture & Features
### Screens
1. Home Screen ```app/index.tsx```: Displays a carousel of popular movies
2. Movie Details Screen ```app/[movieId].tsx```: Shows comprehensive movie information including backdrop images, ratings, genres, production companies, and more
### Key Features
- Animated Movie Carousel: Swipeable cards with gesture handling
- Dynamic Theming: Light/dark mode support
- Network Awareness: Offline detection and retry mechanisms
- Image Optimization: Progressive loading with placeholder images
- Responsive Design: Works on both iOS and Android
- Error Handling: Comprehensive error states and user feedback

### Technical Stack
- Framework: React Native with Expo
- Navigation: Expo Router (file-based routing)
- State Management: Custom hooks with React hooks
- Animations: React Native Reanimated
- Networking: Axios with interceptors
- Testing: Jest + React Native Testing Library
- Styling: StyleSheet with theme support
- Icons: Lucide React Native

## 🚀 Setup Instructions
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: ```npm install -g @expo/cli```
- iOS Simulator (using Xcode)
- Android Emulator (using Android Studio)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/georrgee/livefrontTakeHomeProject.git
   cd quikMovies
   ```
2. Install dependencies:
   
   ```
   npm install
   ```
3. Set up environment variables: Create a ```.env``` file in the root directory and add your TMDB API key
   - Note: The TMDB API key will be provided separately and should not be committed to the repository
   ```
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
```
npm start
```
## 🧪 Testing
The project includes comprehensive tests covering components, hooks, and utilities.

### Running Tests
```
# Run all tests in watch mode
npm test

# Run tests with coverage
npm run test:ci

# Run only unit tests
npm run test:unit
```

## 🔧 Third-Party Libraries
### Core Dependencies
- expo: Development platform and build tools
- expo-router: File-based navigation system
- axios: HTTP client for API requests
- react-native-reanimated: High-performance animations
- react-native-gesture-handler: Touch gesture system
- expo-linear-gradient: Gradient backgrounds
- lucide-react-native: Modern icon library
- expo-network: Network connectivity detection
### Development Dependencies
- jest: Testing framework
- @testing-library/react-native: Testing utilities
- typescript: Type safety and development experience
## 🌐 API Integration
The app integrates with The Movie Database (TMDB) API to fetch:

- Popular movies list with pagination
- Detailed movie information (budget, runtime, genres, etc.)
- High-quality movie posters and backdrop images
- Production company information
### API Features
- Request/Response Interceptors: Logging and error handling
- Image URL Construction: Dynamic image sizing
- Error Handling: Network timeouts and API error responses
- Environment Configuration: Secure API key management

## 📄 License
This project is created as a take-home assignment for LiveFront and is not intended for commercial use
