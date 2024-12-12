// // // // // import React, { useState } from 'react';
// // // // // import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, StyleSheet } from 'react-native';
// // // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // // import axios from 'axios';
// // // // // import tw from 'twrnc';

// // // // // const LoginScreen = ({ navigation }) => {
// // // // //   const [email, setEmail] = useState('');
// // // // //   const [password, setPassword] = useState('');
// // // // //   const [loading, setLoading] = useState(false);


  
// // // // //   const handleLogin = async () => {
// // // // //     if (!email || !password) {
// // // // //       Alert.alert('Validation Error', 'Please enter both email and password');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);

// // // // //     try {
// // // // //       const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// // // // //         email,
// // // // //         password,
// // // // //       });

// // // // //       if (response.status === 200) {
// // // // //         const { token } = response.data;
// // // // //         await AsyncStorage.setItem('token', token);
// // // // //         navigation.replace('Home');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Login Error:', error);

// // // // //       // Handle errors (e.g., invalid credentials or server errors)
// // // // //       if (error.response) {
// // // // //         Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// // // // //       } else {
// // // // //         Alert.alert('Error', 'Something went wrong. Please try again.');
// // // // //       }
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
// // // // //       {/* Display image */}
// // // // //       <Image source={require('../../../assets/dinner.jpg')} style={tw`w-90 h-90 mb-6 rounded-[100px]`} />

// // // // //       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

// // // // //       <TextInput
// // // // //         value={email}
// // // // //         onChangeText={setEmail}
// // // // //         placeholder="Email"
// // // // //         keyboardType="email-address"
// // // // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // // // //       />

// // // // //       <TextInput
// // // // //         value={password}
// // // // //         onChangeText={setPassword}
// // // // //         placeholder="Password"
// // // // //         secureTextEntry
// // // // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // // // //       />

// // // // //       <TouchableOpacity
// // // // //         onPress={handleLogin}
// // // // //         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
// // // // //         disabled={loading}
// // // // //       >
// // // // //         <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
// // // // //       </TouchableOpacity>

// // // // //       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

// // // // //       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={tw`mt-6`}>
// // // // //         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //     container:{
// // // // // //         backgroundColor: "#121fff";
// // // // // //     },
// // // // // // });

// // // // // export default LoginScreen;


// // // // import React, { useState } from 'react';
// // // // import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // import axios from 'axios';
// // // // import tw from 'twrnc';

// // // // const LoginScreen = ({ navigation }) => {
// // // //   const [email, setEmail] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const [loading, setLoading] = useState(false);

// // // //   // Predefined admin credentials
// // // //   const adminCredentials = {
// // // //     email: 'admin@admin.com',
// // // //     password: 'admin@123',
// // // //   };

// // // //   const handleLogin = async () => {
// // // //     if (!email || !password) {
// // // //       Alert.alert('Validation Error', 'Please enter both email and password');
// // // //       return;
// // // //     }

// // // //     // Check if the provided credentials are admin credentials
// // // //     if (email === adminCredentials.email && password === adminCredentials.password) {
// // // //       // Navigate to admin dashboard
// // // //       navigation.replace('AdminDashboard');
// // // //       return;
// // // //     }

// // // //     setLoading(true);

// // // //     try {
// // // //       const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// // // //         email,
// // // //         password,
// // // //       });

// // // //       if (response.status === 200) {
// // // //         const { token } = response.data;
// // // //         await AsyncStorage.setItem('token', token);
// // // //         navigation.replace('Home');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Login Error:', error);

// // // //       // Handle errors (e.g., invalid credentials or server errors)
// // // //       if (error.response) {
// // // //         Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// // // //       } else {
// // // //         Alert.alert('Error', 'Something went wrong. Please try again.');
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
// // // //       {/* Display image */}
// // // //       <Image source={require('../../../assets/dinner.jpg')} style={tw`w-90 h-90 mb-6 rounded-[100px]`} />

// // // //       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

// // // //       <TextInput
// // // //         value={email}
// // // //         onChangeText={setEmail}
// // // //         placeholder="Email"
// // // //         keyboardType="email-address"
// // // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // // //       />

// // // //       <TextInput
// // // //         value={password}
// // // //         onChangeText={setPassword}
// // // //         placeholder="Password"
// // // //         secureTextEntry
// // // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // // //       />

// // // //       <TouchableOpacity
// // // //         onPress={handleLogin}
// // // //         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
// // // //         disabled={loading}
// // // //       >
// // // //         <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
// // // //       </TouchableOpacity>

// // // //       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

// // // //       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={tw`mt-6`}>
// // // //         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
// // // //       </TouchableOpacity>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default LoginScreen;


// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import axios from 'axios';
// // // import tw from 'twrnc';

// // // const LoginScreen = ({ navigation }) => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   // Predefined admin credentials
// // //   const adminCredentials = {
// // //     email: 'admin@example.com',
// // //     password: 'admin123',
// // //   };

// // //   // const handleLogin = async () => {
// // //   //   if (!email || !password) {
// // //   //     Alert.alert('Validation Error', 'Please enter both email and password');
// // //   //     return;
// // //   //   }

// // //   //   // Check if the provided credentials are admin credentials
// // //   //   if (email === adminCredentials.email && password === adminCredentials.password) {
// // //   //     // Navigate to admin dashboard
// // //   //     navigation.replace('AdminStack');
// // //   //     return;
// // //   //   }

// // //   //   setLoading(true);

// // //   //   try {
// // //   //     const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// // //   //       email,
// // //   //       password,
// // //   //     });

// // //   //     if (response.status === 200) {
// // //   //       const { token } = response.data;
// // //   //       await AsyncStorage.setItem('token', token);
// // //   //       navigation.replace('UserStack');
// // //   //     }
// // //   //   } catch (error) {
// // //   //     console.error('Login Error:', error);

// // //   //     // Handle errors (e.g., invalid credentials or server errors)
// // //   //     if (error.response) {
// // //   //       Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// // //   //     } else {
// // //   //       Alert.alert('Error', 'Something went wrong. Please try again.');
// // //   //     }
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };

// // //   const handleLogin = async () => {
// // //     if (!email || !password) {
// // //       Alert.alert('Validation Error', 'Please enter both email and password');
// // //       return;
// // //     }
  
// // //     setLoading(true);
  
// // //     try {
// // //       const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// // //         email,
// // //         password,
// // //       });
  
// // //       if (response.status === 200) {
// // //         const { token, role } = response.data;
// // //         await AsyncStorage.setItem('token', token);
  
// // //         if (role === 'admin') {
// // //           navigation.replace('AdminStack');
// // //         } else {
// // //           navigation.replace('UserStack');
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Login Error:', error);
  
// // //       // Handle errors (e.g., invalid credentials or server errors)
// // //       if (error.response) {
// // //         Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// // //       } else {
// // //         Alert.alert('Error', 'Something went wrong. Please try again.');
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
// // //       {/* Display image */}
// // //       <Image source={require('../../../assets/dinner.jpg')} style={tw`w-90 h-90 mb-6 rounded-[100px]`} />

// // //       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

// // //       <TextInput
// // //         value={email}
// // //         onChangeText={setEmail}
// // //         placeholder="Email"
// // //         keyboardType="email-address"
// // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // //       />

// // //       <TextInput
// // //         value={password}
// // //         onChangeText={setPassword}
// // //         placeholder="Password"
// // //         secureTextEntry
// // //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// // //       />

// // //       <TouchableOpacity
// // //         onPress={handleLogin}
// // //         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
// // //         disabled={loading}
// // //       >
// // //         <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
// // //       </TouchableOpacity>

// // //       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

// // //       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={tw`mt-6`}>
// // //         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // export default LoginScreen;

// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';
// // import tw from 'twrnc';

// // const LoginScreen = ({ navigation }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   // const handleLogin = async () => {
// //   //   if (!email || !password) {
// //   //     Alert.alert('Validation Error', 'Please enter both email and password');
// //   //     return;
// //   //   }

// //   //   setLoading(true);

// //   //   try {
// //   //     const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// //   //       email,
// //   //       password,
// //   //     });

// //   //     if (response.status === 200) {
// //   //       const { token, role } = response.data;
// //   //       await AsyncStorage.setItem('token', token);

// //   //       if (role === 'admin') {
// //   //         navigation.replace('AdminStack');
// //   //       } else {
// //   //         navigation.replace('UserStack');
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Login Error:', error);
// //   //     Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       Alert.alert('Validation Error', 'Email or Password Incorrect');
// //       return;
// //     }
  
// //     setLoading(true);
  
// //     try {
// //       const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
// //         email,
// //         password,
// //       });
  
// //       if (response.status === 200) {
// //         const { token, role } = response.data;
        
// //         await AsyncStorage.setItem('token', token);
  
// //         if (role === 'admin') {
// //           navigation.navigate('AdminStack'); // Navigate to AdminStack
// //         } else {
// //           navigation.navigate('UserStack'); // Navigate to UserStack
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Login Error:', error);
// //       Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
// //       {/* Display image */}
// //       <Image source={require('../../../assets/dinner.jpg')} style={tw`w-90 h-90 mb-6 rounded-[100px]`} />

// //       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

// //       <TextInput
// //         value={email}
// //         onChangeText={setEmail}
// //         placeholder="Email"
// //         keyboardType="email-address"
// //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// //       />

// //       <TextInput
// //         value={password}
// //         onChangeText={setPassword}
// //         placeholder="Password"
// //         secureTextEntry
// //         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
// //       />

// //       <TouchableOpacity
// //         onPress={handleLogin}
// //         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
// //         disabled={loading}
// //       >
// //         <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
// //       </TouchableOpacity>

// //       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

// //       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={tw`mt-6`}>
// //         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default LoginScreen;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import tw from 'twrnc';

// const LoginScreen = ({ navigation }) => {
  
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('https://reservationappserver.onrender.com/auth/login', {
//         email,
//         password,

//         // role
//       });

//       if (response.status === 200) {
//         const { token, role } = response.data;
//         // console.log('data' , response.data)
//         await AsyncStorage.setItem('token', token);

//         if (email === 'admin@admin.com') {
//           navigation.replace('AdminStack');
//         } else {
//           navigation.replace('UserStack');
//         }
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
//       {/* Display image */}
//       <Image source={require('../../../assets/dinner.jpg')} style={tw`w-90 h-90 mb-6 rounded-[100px]`} />

//       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         keyboardType="email-address"
//         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
//       />

//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
//         disabled={loading}
//       >
//         <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

//       <TouchableOpacity onPress={() => navigation.replace('SignUp')} style={tw`mt-6`}>
//         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/slices/authSlice'; // Import the login thunk from your Redux slice
import tw from 'twrnc';


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Access loading and error from Redux state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await dispatch(login({ email, password })); // Dispatch the login thunk

      if (response.payload) {
        // Navigate based on user role (assuming role is part of the response)
        // const { email } = response.payload.user;
   
        if (email === 'admin@admin.com') {
          navigation.replace('AdminStack');
        } else {
          navigation.replace('UserStack');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <StatusBar s/>
      {/* Display image */}
      <Image
        source={require('../../../assets/dinner.jpg')}
        style={tw`w-90 h-90 mb-6 rounded-[100px]`}
      />

      <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
        disabled={loading}
      >
        <Text style={tw`text-white text-center text-lg`}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

      {error && <Text style={tw`text-red-500 mb-4`}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.replace('SignUp')} style={tw`mt-6`}>
        <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;