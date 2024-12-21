import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Animated,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/slices/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Text input state
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, formOpacity]);

  const handleTextChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    const { email, password } = credentials;
    
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await dispatch(login({ email, password })).unwrap();
      if (response?.token) {
        navigation.replace(response.user.role === 'admin' ? 'AdminStack' : 'UserStack');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    }
  };

  return (
    <LinearGradient colors={['#444', '#444']} style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1 justify-center items-center px-4`}>
        <StatusBar barStyle="light-content" backgroundColor="#444" />

        <Animated.View style={[
          tw`items-center`,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={tw`text-6xl mb-2`}>🍽️</Text>
          <Text style={tw`text-white text-3xl font-bold tracking-wider mb-2`}>
            ZestyReserve
          </Text>
          <Text style={tw`text-white/80 text-sm mb-8`}>
            Smart Booking Solution ✨
          </Text>
        </Animated.View>

        <Animated.View style={[tw`w-full`, { opacity: formOpacity }]}>
          <View style={tw`w-full mb-4`}>
            <TextInput
              value={credentials.email}
              onChangeText={(text) => handleTextChange('email', text)}
              placeholder="Email 📧"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="email-address"
              style={tw`w-full p-4 border border-white/30 rounded-xl text-white bg-white/10`}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={tw`w-full mb-4`}>
            <TextInput
              value={credentials.password}
              onChangeText={(text) => handleTextChange('password', text)}
              placeholder="Password 🔐"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              secureTextEntry
              style={tw`w-full p-4 border border-white/30 rounded-xl text-white bg-white/10`}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={tw`w-full p-4 bg-white rounded-xl mb-4`}
            disabled={loading}
          >
            <Text style={tw`text-indigo-600 text-center text-lg font-semibold`}>
              {loading ? '⌛ Logging in...' : '🚀 Login'}
            </Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color="#ffffff" style={tw`mb-4`} />}
          {error && <Text style={tw`text-red-300 mb-4 text-center`}>❌ {error}</Text>}

          <TouchableOpacity onPress={() => navigation.replace('SignUp')} style={tw`mt-6`}>
            <Text style={tw`text-white/90 text-base text-center`}>
              New here? Sign up ✍️
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;