import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

// Screen Imports
import DashboardScreen from '../screens/admin/DashboardScreen';
import AnalyticsScreen from '../screens/admin/AnalyticsScreen';
import ManageSlotsScreen from '../screens/admin/ManageSlotsScreen';
import ProfileScreen from '../screens/admin/ProfileScreen';
import SettingsScreen from '../screens/admin/SettingsScreen';
import AddReservationScreen from '../screens/admin/AddReservationScreen';
import ManageBookingsScreen from '../screens/admin/ManageBookingsScreen';
import PaymentsScreen from '../screens/admin/PaymentsScreen';
import ManageStores from '../screens/admin/ManageStores';
import RestaurantDetailsScreen from '../screens/admin/RestaurantDetailsScreen';
import UsersScreen from '../screens/admin/UsersScreen';
import NotificationsScreen from '../screens/admin/NotificationsScreen';

// Navigation Theme
const navigationTheme = {
  colors: {
    primary: '#4F46E5',
    background: 'white',
    card: 'white',
    text: 'black',
    border: '#E0E0E0',
    notification: 'tomato',
  },
};

// Tab Bar Icons Mapping
const TAB_ICONS = {
  DashboardHome: 'home-outline',
  Analytics: 'stats-chart-outline',
  ManageSlots: 'calendar-outline',
  Notifications: 'notifications-outline', 
  Settings: 'settings-outline',
};

// Dashboard Stack Navigator (for Profile and Settings)
const DashboardStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: navigationTheme.colors.background },
        headerTintColor: navigationTheme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        animation: 'slide_from_right',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        options={{ title: 'Dashboard', headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Application Settings' }}
      />
    </Stack.Navigator>
  );
};

// Dashboard Tab Navigator
const DashboardTabs = () => {
  const Tab = createBottomTabNavigator();
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // State for notification badge

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Notifications') {
            return (
              <View style={{ position: 'relative' }}>
                <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
                {hasNewNotifications && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -3,
                      right: -3,
                      backgroundColor: 'red',
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                )}
              </View>
            );
          }
          return <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: navigationTheme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
      })}
    >
      <Tab.Screen
        name="DashboardHome"
        component={DashboardStack}
        options={{ title: 'Dashboard', headerShown: false }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: 'Analytics Overview', headerShown: true }}
      />
      <Tab.Screen
        name="ManageSlots"
        component={ManageSlotsScreen}
        options={{ title: 'Slot Management' }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default action
            setHasNewNotifications(false); // Clear the notification badge
            navigation.navigate('Notifications'); // Navigate to Notifications
          },
        })}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

// Main Admin Stack Navigator
const AdminStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: navigationTheme.colors.background },
        headerTintColor: navigationTheme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        animation: 'slide_from_right',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddReservation"
        component={AddReservationScreen}
        options={{ title: 'Create a Reservation' }}
      />
      <Stack.Screen
        name="ManageBookings"
        component={ManageBookingsScreen}
        options={{ title: 'Manage Bookings' }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{ title: 'Payment Details' }}
      />
      <Stack.Screen
        name="ManageStores"
        component={ManageStores}
        options={{ title: 'Store Management' }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{ title: 'Restaurant Management' }}
      />
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{ title: 'App Users' }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;