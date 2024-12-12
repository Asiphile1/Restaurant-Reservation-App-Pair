import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../state/slices/authSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);  // Using the refactored selector

  useEffect(() => {
    // Dispatch any necessary actions (e.g., fetching user info, etc.)
  }, [dispatch]);

  const handleViewPlaces = () => {
    if (isAuthenticated) {
      // Navigate to the places page or show places to dine
      navigation.navigate('DiningPlaces');
    } else {
      // Show an alert and redirect to login
      Alert.alert(
        "Authentication Required",
        "Please log in to view more details.",
        [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Available Dining Places</Text>
      {isAuthenticated ? (
        <Button title="View Places" onPress={handleViewPlaces} />
      ) : (
        <Text>Please log in to view available places.</Text>
      )}
    </View>
  );
};

export default HomeScreen;
