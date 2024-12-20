// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   Image,
//   StatusBar,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../state/slices/authSlice';
// import tw from 'twrnc';

// const LoginScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   // const handleLogin = async () => {
//   //   if (!email || !password) {
//   //     Alert.alert('Validation Error', 'Please enter both email and password');
//   //     return;
//   //   }
//   //   if (!isValidEmail(email)) {
//   //     Alert.alert('Validation Error', 'Please enter a valid email address');
//   //     return;
//   //   }

//   //   try {
//   //     const response = await dispatch(login({ email, password }));
//   //     if (response.payload) {
//   //       const { role } = response.payload.user; // Assuming role is returned from backend
//   //       if (role === 'admin') {
//   //         navigation.replace('AdminStack');
//   //       } else {
//   //         navigation.replace('UserStack');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Login Error:', error);
//   //     Alert.alert('Login Failed', error.message || 'Invalid credentials');
//   //   }
//   // };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password');
//       return;
//     }

//         if (!isValidEmail(email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email address');
//       return;
//     }
  
//     try {
//       const response = await dispatch(login({ email, password }));
  
//       // Debug response
//       console.log('Login Response:', response.payload);
  
//       if (response.payload?.role) {
//         const { role } = response.payload;
  
//         if (role === 'admin') {
//           navigation.replace('AdminStack');
//         } else {
//           navigation.replace('UserStack');
//         }
//       } else {
//         throw new Error('Invalid response from server.');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Login Failed', error.message || 'Invalid credentials');
//     }
//   };
  

//   return (
//     <SafeAreaView style={tw`flex-1 justify-center items-center bg-white px-4`}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

//       <Image
//         source={require('../../../assets/dinner.jpg')}
//         style={tw`w-90 h-90 mb-6 rounded-[100px]`}
//         accessibilityLabel="App Logo"
//       />

//       <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         keyboardType="email-address"
//         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
//         accessibilityLabel="Email Input"
//       />

//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//         style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
//         accessibilityLabel="Password Input"
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
//         disabled={loading}
//       >
//         <Text style={tw`text-white text-center text-lg`}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="small" color="#0000ff" style={tw`mb-4`} />}

//       {error && <Text style={tw`text-red-500 mb-4`}>{error}</Text>}

//       <TouchableOpacity onPress={() => navigation.replace('SignUp')} style={tw`mt-6`}>
//         <Text style={tw`text-blue-600 text-base`}>No account? Sign up here</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/slices/authSlice';
import tw from 'twrnc';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    try {
      const response = await dispatch(login({ email, password }));

      // Check if the login was successful
      if (response.payload && response.payload.token) {

        
        const { role } = response.payload.user

        // Navigate based on role
        if (role === 'admin') {
          navigation.replace('AdminStack');
        } else {
          navigation.replace('UserStack');
        }
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Image
        source={require('../../../assets/dinner.jpg')}
        style={tw`w-90 h-90 mb-6 rounded-[100px]`}
        accessibilityLabel="App Logo"
      />

      <Text style={tw`text-3xl font-semibold mb-6`}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
        accessibilityLabel="Email Input"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-md text-base`}
        accessibilityLabel="Password Input"
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={tw`w-full p-4 bg-green-600 rounded-md mb-4`}
        disabled={loading}
      >
        <Text style={tw`text-white text-center text-lg`}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
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