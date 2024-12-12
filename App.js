// // // import { StatusBar } from 'expo-status-bar';
// // // import { Text, View } from 'react-native';
// // // // import "./global.css"; // Ensure the global CSS is loaded
// // // import 'nativewind';

// // // export default function App() {
// // //   return (
// // //     // <View className="flex-1 justify-center items-center bg-red-600">
// // //     //   <Text className="">Open up App.js to start working on your app!</Text>
// // //     //   <StatusBar style="auto" />
// // //     // </View>

// // //     <View className="bg-blue-500 p-10">
// // //   <Text className="text-white">Hello World!</Text>
// // // </View>

// // //   );
// // // }


// // import { StatusBar } from 'expo-status-bar';
// // import { Text, View } from 'react-native';
// // import 'nativewind';
// // import './global.css'

// // export default function App() {
// //     return (
// //         <View className="flex-1 justify-center items-center bg-blue-500">
// //             <Text className="text-red-600 text-lg">Hello, Tailwind CSS!</Text>
// //             <Text className="text-red-600 text-lg">Hello, Tailwind CSS!</Text>
// //             <StatusBar style="auto" />
// //         </View>
// //     );
// // }

// import { Provider } from 'react-redux';
// import React from 'react';
// import store from './src/state/store';
// import './src/styles/global.css'

// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return(
//     <Provider store={store}>
//     <AppNavigator />
//   </Provider>
//   );
// };

// export default App;


import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import store from './src/state/store';
import './src/styles/global.css';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer> {/* Wrap AppNavigator with NavigationContainer */}
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;