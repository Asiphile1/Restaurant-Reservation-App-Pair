// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // Import User Screens
// import HomeScreen from '../screens/user/HomeScreen';
// import ReservationScreen from '../screens/user/ReservationScreen';
// import ProfileScreen from '../screens/user/ProfileScreen';
// import DiningPlacesScreen from '../screens/user/DiningPlacesScreen';
// import ReservationsScreen from '../screens/user/ReservationScreen';

// // Initialize Tab Navigator
// const Tab = createBottomTabNavigator();

// const Stack = createStackNavigator()
// // add reservtion screen to the stack

// // Icon Map for Tabs
// const ICON_MAP = {
//   HomeTab: 'home-outline',
//   ReservationTab: 'calendar-outline',
//   ProfileTab: 'person-outline',
//   DiningPlaces: 'restaurant-outline', // Updated for dining places
// };

// // Reusable function for rendering tab icons
// const renderTabIcon = (routeName, color, size) => (
//   <Ionicons name={ICON_MAP[routeName]} size={size} color={color} />
// );

// // UserStack Component
// const UserStack = () => (
//   <Tab.Navigator
//     initialRouteName="HomeTab" // Default initial screen
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ color, size }) => renderTabIcon(route.name, color, size),
//       tabBarActiveTintColor: 'tomato', // Highlighted color for active tab
//       tabBarInactiveTintColor: 'gray', // Color for inactive tabs
//       tabBarStyle: {
//         elevation: 5, // Adds shadow on Android
//         shadowColor: '#000', // Shadow color
//         shadowOffset: { width: 0, height: -2 }, // Shadow positioning
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         backgroundColor: '#fff', // Tab bar background color
//       },
//       headerShown: false, // Hides headers for tab screens
//     })}
//   >
//     {/* Home Tab */}
//     <Tab.Screen
//       name="HomeTab"
//       component={HomeScreen}
//       options={{
//         tabBarLabel: 'Home',
//       }}
//     />

//     {/* Reservation Tab */}
//     <Tab.Screen
//       name="ReservationTab"
//       component={ReservationScreen}
//       options={{
//         tabBarLabel: 'Reservation',
//       }}
//     />

//     {/* Profile Tab */}

//     {/* Dining Places Tab */}
//     <Tab.Screen
//       name="DiningPlaces"
//       component={DiningPlacesScreen}
//       options={{
//         tabBarLabel: 'Dining',
//       }}
//     />
//       <Tab.Screen
//         name="ProfileTab"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//         }}
//       />
//   </Tab.Navigator>
// );

// export default UserStack;


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import User Screens
import HomeScreen from '../screens/user/HomeScreen';
import ReservationScreen from '../screens/user/ReservationScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import DiningPlacesScreen from '../screens/user/DiningPlacesScreen';
import ReservationsScreen from '../screens/user/ReservationScreen';
import BookingsScreen from '../screens/user/BookingsScreen';
import PaymentScreen from '../screens/user/PaymentScreen';

// Initialize Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Icon Map for Tabs
const ICON_MAP = {
  HomeTab: 'home-outline',
  ReservationTab: 'calendar-outline',
  ProfileTab: 'person-outline',
  DiningPlaces: 'restaurant-outline', // Updated for dining places
};

// Reusable function for rendering tab icons
const renderTabIcon = (routeName, color, size) => (
  <Ionicons name={ICON_MAP[routeName]} size={size} color={color} />
);

// HomeStack Component (for HomeScreen and ReservationsScreen)
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
      options={{ headerTitle: 'Edit Reservation' }}
    />
    <Stack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
      options={{ headerTitle: 'Make Payment' }}
    />
  </Stack.Navigator>
);

// UserStack Component
const UserStack = () => (
  <Tab.Navigator
    initialRouteName="HomeTab" // Default initial screen
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => renderTabIcon(route.name, color, size),
      tabBarActiveTintColor: 'tomato', // Highlighted color for active tab
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

    {/* Reservation Tab */}
    <Tab.Screen
      name="ManageBookingsScreen"
      component={BookingsScreen}
      options={{
        tabBarLabel: 'Booking',
      }}
    />

    {/* Dining Places Tab */}
    <Tab.Screen
      name="DiningPlaces"
      component={DiningPlacesScreen}
      options={{
        tabBarLabel: 'Dining',
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