import React, { useRef, useCallback } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import store from './src/state/store';
import './src/styles/global.css';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

const useRootRefresh = () => {
  const refreshingRef = useRef(false);
  const scrollRef = useRef();

  const resetApp = async () => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;

    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) throw new Error('No internet connection');

      await Promise.all([
        AsyncStorage.clear(),
        store.dispatch({ type: 'RESET_APP_STATE' })
      ]);
      
    } catch (error) {
      Alert.alert('Error', 
        error.message === 'No internet connection' 
          ? 'Please check your connection' 
          : 'Failed to refresh app'
      );
    } finally {
      refreshingRef.current = false;
    }
  };

  return { scrollRef, resetApp };
};

const App = () => {
  const { scrollRef, resetApp } = useRootRefresh();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <View 
            ref={scrollRef}
            style={{ flex: 1, backgroundColor: '#ffffff' }}
            onResponderRelease={({ nativeEvent }) => {
              if (nativeEvent.contentOffset?.y < -50) {
                resetApp();
              }
            }}
          >
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            <AppNavigator />
          </View>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong. Please restart the app.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);