import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import store from './src/state/store';
import './src/styles/global.css';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  };

  const resetReduxStore = () => {
    try {
      // Dispatch a reset action to all reducers
      store.dispatch({ type: 'RESET_APP_STATE' });
      console.log('Redux store successfully reset');
    } catch (error) {
      console.error('Error resetting Redux store:', error);
      throw error;
    }
  };

  const checkNetworkConnection = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No internet connection');
      }
      return true;
    } catch (error) {
      console.error('Network connection error:', error);
      throw error;
    }
  };

  const reloadAppData = async () => {
    try {
      // Add your API calls here to refresh data
      // Example:
      // await Promise.all([
      //   fetchUserProfile(),
      //   fetchSettings(),
      //   fetchNotifications(),
      // ]);
      console.log('App data successfully reloaded');
    } catch (error) {
      console.error('Error reloading app data:', error);
      throw error;
    }
  };

  const resetNavigation = (navigation) => {
    try {
      // Reset to initial route
      navigation?.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      console.log('Navigation successfully reset');
    } catch (error) {
      console.error('Error resetting navigation:', error);
      throw error;
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Check network connection first
      await checkNetworkConnection();

      // Perform all refresh operations
      await Promise.all([
        clearAsyncStorage(),
        reloadAppData(),
      ]);

      // Reset Redux store
      resetReduxStore();



    } catch (error) {
      // Handle different types of errors
      let errorMessage = 'An unexpected error occurred';
      
      if (error.message === 'No internet connection') {
        errorMessage = 'Please check your internet connection and try again';
      } else if (error.message.includes('AsyncStorage')) {
        errorMessage = 'Error clearing app data. Please try again';
      }

      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }],
        { cancelable: false }
      );

    } finally {
      // Ensure refreshing state is reset
      setRefreshing(false);
    }
  }, []);

  // Custom refresh control colors and configuration
  const refreshControlConfig = {
    refreshing: refreshing,
    onRefresh: onRefresh,
    colors: ['#2196F3'], // Android
    tintColor: '#2196F3', // iOS
    title: 'Pull to refresh...', // iOS
    titleColor: '#2196F3', // iOS
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <ScrollView
            contentContainerStyle={{ 
              flex: 1,
              backgroundColor: '#ffffff' 
            }}
            refreshControl={
              <RefreshControl {...refreshControlConfig} />
            }
            showsVerticalScrollIndicator={false}
            bounces={true}
            alwaysBounceVertical={true}
            overScrollMode="always"
          >
            <StatusBar 
              style={'dark'} 
              backgroundColor={'transparent'}
              translucent={true}
            />
            <AppNavigator />
          </ScrollView>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

// Add Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
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

// Wrap the App component with ErrorBoundary
const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;