// // // // import React from 'react';
// // // // import { NavigationContainer } from '@react-navigation/native';
// // // // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // // // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // // // import { TouchableOpacity } from 'react-native';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // // // Import all screens
// // // // import SplashScreen from '../screens/SplashScreen';
// // // // import LoginScreen from '../screens/shared/LoginScreen';
// // // // import SignupScreen from '../screens/shared/SignupScreen';
// // // // import HomeScreen from '../screens/user/HomeScreen';
// // // // import ReservationScreen from '../screens/user/ReservationScreen';
// // // // import ProfileScreen from '../screens/user/ProfileScreen';

// // // // // Create navigators
// // // // const Stack = createNativeStackNavigator();
// // // // const Tab = createBottomTabNavigator();

// // // // // Bottom Tab Navigator
// // // // const BottomTabNavigator = () => (
// // // //   <Tab.Navigator
// // // //     initialRouteName="HomeTab"
// // // //     screenOptions={{
// // // //       tabBarActiveTintColor: 'tomato',
// // // //       tabBarInactiveTintColor: 'gray',
// // // //       headerShown: false,
// // // //     }}
// // // //   >
// // // //     <Tab.Screen
// // // //       name="HomeTab"
// // // //       component={HomeScreen}
// // // //       options={{
// // // //         tabBarLabel: 'Home',
// // // //         tabBarIcon: ({ color, size }) => (
// // // //           <Ionicons name="home-outline" size={size} color={color} />
// // // //         ),
// // // //       }}
// // // //     />
// // // //     <Tab.Screen
// // // //       name="ReservationTab"
// // // //       component={ReservationScreen}
// // // //       options={{
// // // //         tabBarLabel: 'Reservation',
// // // //         tabBarIcon: ({ color, size }) => (
// // // //           <Ionicons name="calendar-outline" size={size} color={color} />
// // // //         ),
// // // //       }}
// // // //     />
// // // //   </Tab.Navigator>
// // // // );

// // // // // Main App Navigator
// // // // const AppNavigator = () => (
// // // //   <NavigationContainer>
// // // //     <Stack.Navigator 
// // // //       initialRouteName="Splash"
// // // //       screenOptions={{
// // // //         headerBackTitle: 'Back',
// // // //       }}
// // // //     >
// // // //       {/* Splash Screen */}
// // // //       <Stack.Screen 
// // // //         name="Splash" 
// // // //         component={SplashScreen} 
// // // //         options={{ headerShown: false }} 
// // // //       />

// // // //       {/* Authentication Screens */}
// // // //       <Stack.Screen 
// // // //         name="Login" 
// // // //         component={LoginScreen} 
// // // //         options={{ 
// // // //           title: 'Sign In',
// // // //           headerShown: false 
// // // //         }} 
// // // //       />
// // // //       <Stack.Screen 
// // // //         name="SignUp" 
// // // //         component={SignupScreen} 
// // // //         options={{ title: 'Create Account' }} 
// // // //       />

// // // //       {/* Main Authenticated Flow */}
// // // //       <Stack.Screen
// // // //         name="Home"
// // // //         component={BottomTabNavigator}
// // // //         options={{
// // // //           headerShown: false,
// // // //         }}
// // // //       />

// // // //       {/* Profile Screen */}
// // // //       <Stack.Screen 
// // // //         name="Profile" 
// // // //         component={ProfileScreen} 
// // // //         options={({ navigation }) => ({
// // // //           title: 'My Profile',
// // // //           headerRight: () => (
// // // //             <TouchableOpacity
// // // //               onPress={() => {
// // // //                 // Add any additional profile actions
// // // //                 console.log('Profile options');
// // // //               }}
// // // //               style={{ paddingRight: 10 }}
// // // //             >
// // // //               <Ionicons name="ellipsis-horizontal" size={24} color="black" />
// // // //             </TouchableOpacity>
// // // //           ),
// // // //         })}
// // // //       />
// // // //     </Stack.Navigator>
// // // //   </NavigationContainer>
// // // // );

// // // // export default AppNavigator;

// // // import React from 'react';

// // // import { NavigationContainer } from '@react-navigation/native';

// // // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // // import { TouchableOpacity } from 'react-native';

// // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // // Import all screens

// // // // shared screens

// // // import SplashScreen from '../screens/SplashScreen';

// // // import LoginScreen from '../screens/shared/LoginScreen';

// // // import SignupScreen from '../screens/shared/SignupScreen';


// // // // user Screens

// // // import HomeScreen from '../screens/user/HomeScreen';

// // // import ReservationScreen from '../screens/user/ReservationScreen';

// // // import ProfileScreen from '../screens/user/ProfileScreen';

// // // //admin screens

// // // import AnalyticsScreen from '../screens/admin/AnalyticsScreen';
// // // import DashboardScreen from '../screens/admin/DashboardScreen';
// // // import ManageSlotsScreen from '../screens/admin/ManageSlotsScreen';

// // // //navigation 3 files exist, 1. the app navigator: current window
// // // // 2. Admin Stack file
// // // // 2. User Stack file

// // // import AdminStack from './AdminStack';
// // // import UserStack from './UserStack';





// // // // Create navigators

// // // const Stack = createNativeStackNavigator();

// // // const Tab = createBottomTabNavigator();

// // // // Bottom Tab Navigator

// // // const BottomTabNavigator = () => (

// // //   <Tab.Navigator

// // //     initialRouteName="HomeTab"

// // //     screenOptions={{

// // //       tabBarActiveTintColor: 'tomato',

// // //       tabBarInactiveTintColor: 'gray',

// // //       headerShown: false,

// // //     }}

// // //   >

// // //     <Tab.Screen

// // //       name="HomeTab"

// // //       component={HomeScreen}

// // //       options={{

// // //         tabBarLabel: 'Home',

// // //         tabBarIcon: ({ color, size }) => (

// // //           <Ionicons name="home-outline" size={size} color={color} />

// // //         ),

// // //       }}

// // //     />

// // //     <Tab.Screen

// // //       name="ReservationTab"

// // //       component={ReservationScreen}

// // //       options={{

// // //         tabBarLabel: 'Reservation',

// // //         tabBarIcon: ({ color, size }) => (

// // //           <Ionicons name="calendar-outline" size={size} color={color} />

// // //         ),

// // //       }}

// // //     />

// // //   </Tab.Navigator>

// // // );

// // // // Main App Navigator

// // // const AppNavigator = () => (

// // //   <NavigationContainer>

// // //     <Stack.Navigator 

// // //       initialRouteName="Splash"

// // //       screenOptions={{

// // //         headerBackTitle: 'Back',

// // //       }}

// // //     >

// // //       {/* Splash Screen */}

// // //       <Stack.Screen 

// // //         name="Splash" 

// // //         component={SplashScreen} 

// // //         options={{ headerShown: false }} 

// // //       />

// // //       {/* Authentication Screens */}

// // //       <Stack.Screen 

// // //         name="Login" 

// // //         component={LoginScreen} 

// // //         options={{ 

// // //           title: 'Sign In',

// // //           headerShown: false 

// // //         }} 

// // //       />

// // //       <Stack.Screen 

// // //         name="SignUp" 

// // //         component={SignupScreen} 

// // //         options={{ title: 'Create Account' }} 

// // //       />

// // //       {/* Main Authenticated Flow */}

// // //       <Stack.Screen

// // //         name="Home"

// // //         component={BottomTabNavigator}

// // //         options={{

// // //           headerShown: false,

// // //         }}

// // //       />

// // //       {/* Profile Screen */}

// // //       <Stack.Screen 

// // //         name="Profile" 

// // //         component={ProfileScreen} 

// // //         options={({ navigation }) => ({

// // //           title: 'My Profile',

// // //           headerRight: () => (

// // //             <TouchableOpacity

// // //               onPress={() => {

// // //                 // Add any additional profile actions

// // //                 console.log('Profile options');

// // //               }}

// // //               style={{ paddingRight: 10 }}

// // //             >

// // //               <Ionicons name="ellipsis-horizontal" size={24} color="black" />

// // //             </TouchableOpacity>

// // //           ),

// // //         })}

// // //       />

// // //     </Stack.Navigator>

// // //   </NavigationContainer>

// // // );

// // // export default AppNavigator;

// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // // Import all screens
// // import SplashScreen from '../screens/SplashScreen';
// // import LoginScreen from '../screens/shared/LoginScreen';
// // import SignupScreen from '../screens/shared/SignupScreen';

// // // Import Admin and User Stacks
// // import AdminStack from './AdminStack';
// // import UserStack from './UserStack';

// // // Create navigators
// // const Stack = createNativeStackNavigator();

// // // Main App Navigator
// // const AppNavigator = () => (
// //   <NavigationContainer>
// //     <Stack.Navigator
// //       initialRouteName="Splash"
// //       screenOptions={{
// //         headerBackTitle: 'Back',
// //       }}
// //     >
// //       {/* Splash Screen */}
// //       <Stack.Screen
// //         name="Splash"
// //         component={SplashScreen}
// //         options={{ headerShown: false }}
// //       />

// //       {/* Authentication Screens */}
// //       <Stack.Screen
// //   name="Login"
// //   component={LoginScreen}
// //   options={{
// //     title: 'Sign In',
// //     headerShown: false, // Keep the header hidden
// //     gestureEnabled: false, // Disable swipe gestures to go back
// //   }}
// // />

// //       <Stack.Screen
// //         name="SignUp"
// //         component={SignupScreen}
// //         options={{ title: 'Create Account',
// //           headerShown: false
// //          }}
// //       />

// //       {/* Admin Stack */}
// //       <Stack.Screen
// //         name="AdminStack"
// //         component={AdminStack}
// //         options={{ headerShown: false }}
// //       />

// //       {/* User Stack */}
// //       <Stack.Screen
// //         name="UserStack"
// //         component={UserStack}
// //         options={{ headerShown: false }}
// //       />
// //     </Stack.Navigator>
// //   </NavigationContainer>
// // );

// // export default AppNavigator;

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import Admin Screens
// import DashboardScreen from '../screens/admin/DashboardScreen';
// import AnalyticsScreen from '../screens/admin/AnalyticsScreen';
// import ManageSlotsScreen from '../screens/admin/ManageSlotsScreen';

// const Stack = createNativeStackNavigator();

// const AdminStack = () => (
//   <Stack.Navigator
//     initialRouteName="Dashboard"
//     screenOptions={{
//       headerBackTitle: 'Back',
//     }}
//   >
//     <Stack.Screen
//       name="Dashboard"
//       component={DashboardScreen}
//       options={{ title: 'Dashboard' }}
//     />
//     <Stack.Screen
//       name="Analytics"
//       component={AnalyticsScreen}
//       options={{ title: 'Analytics' }}
//     />
//     <Stack.Screen
//       name="ManageSlots"
//       component={ManageSlotsScreen}
//       options={{ title: 'Manage Slots' }}
//     />
//   </Stack.Navigator>
// );

// export default AdminStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/shared/LoginScreen';
import SignupScreen from '../screens/shared/SignupScreen';
import AdminStack from './AdminStack';
import UserStack from './UserStack';
import DashboardScreen from '../screens/admin/DashboardScreen';
import HomeScreen from '../screens/user/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerBackTitle: 'Back',
    }}
  >
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: 'Sign In', headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignupScreen}
      options={{ title: 'Create Account' }}
    />
    <Stack.Screen
      name="AdminStack"
      component={AdminStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserStack"
      component={UserStack}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);

export default AppNavigator;