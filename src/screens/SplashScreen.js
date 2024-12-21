import React, { useEffect } from "react";
import { View, Text, Animated, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import tw from 'twrnc';

export default function SplashScreen({ navigation }) {
  // Animation values
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0.3);
  const textOpacity = new Animated.Value(0);
  const textTranslateY = new Animated.Value(20);

  useEffect(() => {
    // Animate logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      // Animate text
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#444', '#444']} // Indigo gradient
      style={tw`flex-1 items-center justify-center`}
    >
      <StatusBar barStyle="light-content" backgroundColor="#444" />
      {/* Background pattern */}
      <View style={[
        tw`absolute w-full h-full opacity-10`,
        {
          backgroundColor: 'transparent',
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '40px 40px',
        }
      ]} />

      {/* Logo container */}
      <Animated.View style={[
        tw`bg-white/20 rounded-3xl p-6 mb-6`,
        {
          transform: [{ scale: logoScale }],
          opacity: logoOpacity,
        }
      ]}>
        <Ionicons 
          name="calendar" 
          size={80} 
          color="#fff"
          style={tw`opacity-90`}
        />
      </Animated.View>

      {/* App name */}
      <Animated.View style={{
        opacity: textOpacity,
        transform: [{ translateY: textTranslateY }]
      }}>
        <Text style={tw`text-white text-3xl font-bold tracking-wider`}>
          ZestyReserve
        </Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.View style={{
        opacity: textOpacity,
        transform: [{ translateY: textTranslateY }]
      }}>
        <Text style={tw`text-white/80 text-sm mt-2 tracking-wide`}>
          Smart Booking Solution
        </Text>
      </Animated.View>

      {/* Loading indicator */}
      <Animated.View style={[
        tw`absolute bottom-12`,
        { opacity: textOpacity }
      ]}>
        <Text style={tw`text-white/60 text-xs tracking-wider`}>
          LOADING...
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}