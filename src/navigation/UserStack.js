import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from '../screens/user/HomeScreen';
import ReservationScreen from '../screens/user/ReservationScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import ReservationsScreen from '../screens/user/ReservationScreen';
import BookingsScreen from '../screens/user/BookingsScreen';
import PaymentScreen from '../screens/user/PaymentScreen';
import Pay from '../screens/user/Pay';
import NotificationsScreen from '../screens/user/NotificationsScreen';
import FavoritesScreen from '../screens/user/FavoritesScreen'; // New screen
import SettingsScreen from '../screens/user/SettingsScreen';

// Initialize Tab and Stack Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Icon Map for Tabs
const ICON_MAP = {
  HomeTab: 'home-outline',
  ManageBookingsScreen: 'calendar-outline',
  ProfileTab: 'person-outline',
  Favorites: 'heart-outline', // New icon for Favorites
};

// Reusable function for rendering tab icons
const renderTabIcon = (routeName, color, size) => (
  <Ionicons name={ICON_MAP[routeName]} size={size} color={color} />
);

// HomeStack Component (for HomeScreen and related screens)
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ReservationsScreen"
      component={ReservationsScreen}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="Pay"
      component={Pay}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ headerTitle: 'Notifications' }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerTitle: 'Settings' }}
    />
  </Stack.Navigator>
);

// UserStack Component
const UserStack = () => (
  <Tab.Navigator
    initialRouteName="HomeTab" // Default initial screen
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => renderTabIcon(route.name, color, size),
      tabBarActiveTintColor: '#4F46E5', // Highlighted color for active tab
      tabBarInactiveTintColor: 'gray', // Color for inactive tabs
      tabBarStyle: {
        elevation: 5, // Adds shadow on Android
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: -2 }, // Shadow positioning
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: '#fff', // Tab bar background color
      },
      headerShown: false, // Hides headers for tab screens
    })}
  >
    {/* Home Tab */}
    <Tab.Screen
      name="HomeTab"
      component={HomeStack} // Use the HomeStack instead of HomeScreen
      options={{
        tabBarLabel: 'Home',
      }}
    />

    {/* Manage Bookings Tab */}
    <Tab.Screen
      name="ManageBookingsScreen"
      component={BookingsScreen}
      options={{
        tabBarLabel: 'Booking',
      }}
    />

    {/* Favorites Tab */}
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen} // New screen
      options={{
        tabBarLabel: 'Favorites',
      }}
    />

    {/* Profile Tab */}
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

export default UserStack;