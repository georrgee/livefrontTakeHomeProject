# QuikMovies - Take Home Project for LiveFront

This is a react native mobile application built with Expo that displays popular movies using The Movie Database (TMDB) API. This app features a modern, animated interface with a carousel-style movie browser and a detailed movie screen

## 🎨 Media
![take-home-project](https://github.com/user-attachments/assets/30036504-f01e-4cda-9c3b-56a56d110c3a)

<img width="1527" height="583" alt="Screenshot 2025-08-04 at 11 50 31 PM" src="https://github.com/user-attachments/assets/05b5eb44-3ee5-42e6-8e87-87f23bb4fa44" />

<img width="1458" height="879" alt="Screenshot 2025-08-04 at 11 50 44 PM" src="https://github.com/user-attachments/assets/ef13f996-f04d-4972-83f2-bf9ff20c0fca" />

<img width="1642" height="947" alt="Screenshot 2025-08-04 at 11 51 01 PM" src="https://github.com/user-attachments/assets/048ca3ed-22a4-499d-b64e-965d34cfeead" />


## 📋 Table of Contents
- [🎯 Project Overview](#-project-overview)
- [🏗️ Architecture & Features](#️-architecture--features)
  - [Screens](#screens)
  - [Key Features](#key-features)
  - [Accessibility Features](#accessibility-features)
  - [Technical Stack](#technical-stack)
- [🚀 Setup Instructions](#-setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running on Platforms](#running-on-platforms)
- [🧪 Testing](#-testing)
  - [Test Categories](#test-categories)
  - [Running Tests](#running-tests)
  - [Test Commands](#test-commands)
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

### Accessibility Features
- Semantic Labels: Meaningful accessibility labels and hints for all interactive elements
- Navigation Announcements: Screen reader announcements for navigation and state changes
- Focus Management: Proper focus handling for keyboard and screen reader navigation
- Content Descriptions: Detailed descriptions for movie cards, ratings, and interactive elements
- State Indicators: Clear indication of selected states and loading states

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
   ```bash
   git clone https://github.com/georrgee/livefrontTakeHomeProject.git
   cd quikMovies
   ```
2. Install dependencies:
   
   ```bash
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
### Test Categories
- Unit Tests: Individual component and hook testing
- Integration Tests: End-to-end user flow testing
- Accessibility Tests: Screen reader and accessibility compliance testing
- Service Tests: API and network layer testing

### Running Tests
```bash
# Run all tests in watch mode
npm test
```

### Test Commands
```bash
# Run specific test categories
npm run test:unit              # Run all unit tests
npm run test:integration       # Run integration tests
npm run test:accessibility     # Run accessibility tests
npm run test:hooks             # Run custom hooks tests
npm run test:services          # Run API service tests
```

**Test Coverage Areas:**
- Component rendering and interaction
- Custom hooks functionality
- API service integration
- Accessibility 
- User flow integration 
- Network error handling

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
