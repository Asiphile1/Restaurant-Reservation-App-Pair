import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params || {}; // Ensure restaurant is not undefined
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservations for the selected restaurant
  useEffect(() => {
    if (restaurant) {
      fetchReservations();
    }
  }, [restaurant]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `https://reservationappserver.onrender.com/restaurants/reservations?restaurantId=${restaurant._id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
        
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      Alert.alert('Error', 'Failed to fetch reservations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `https://reservationappserver.onrender.com/reservations/${reservationId}/confirm`,
        {
          method: 'PUT',
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Reservation confirmed!');
        fetchReservations(); // Refresh reservations after confirmation
      } else {
        Alert.alert('Error', 'Failed to confirm reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming reservation:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleRejectReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `https://reservationappserver.onrender.com/reservations/${reservationId}/reject`,
        {
          method: 'PUT',
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Reservation rejected!');
        fetchReservations(); // Refresh reservations after rejection
      } else {
        Alert.alert('Error', 'Failed to reject reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting reservation:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  if (!restaurant) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-gray-600`}>Restaurant not found.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      {/* Restaurant Details */}
      <View style={tw`mb-4`}>
        <Image
          source={{ uri: restaurant.image }}
          style={tw`w-full h-48 rounded-lg`}
          resizeMode="cover"
        />
        <Text style={tw`text-2xl font-bold mt-4`}>{restaurant.name}</Text>
        <Text style={tw`text-gray-600`}>{restaurant.location}</Text>
        <Text style={tw`text-gray-600`}>Cuisine: {restaurant.cuisine}</Text>
        <Text style={tw`text-gray-600`}>Capacity: {restaurant.capacity}</Text>
      </View>

      {/* Reservations List */}
      <Text style={tw`text-xl font-semibold mb-4`}>Reservations</Text>
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text style={tw`text-gray-600 mt-4`}>Loading reservations...</Text>
        </View>
      ) : (
        reservations ? 
        <FlatList
          data={reservations}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center justify-between p-4 mb-2 bg-white border border-gray-300 rounded-lg`}>
              <View>
                <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
                <Text style={tw`text-sm text-gray-500`}>
                  {item.date} at {item.time} for {item.guests} guests
                </Text>
                <Text style={tw`text-sm text-gray-500`}>Status: {item.status}</Text>
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  onPress={() => handleConfirmReservation(item._id)}
                  style={tw`mr-4`}
                >
                  <Ionicons name="checkmark-circle-outline" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRejectReservation(item._id)}>
                  <Ionicons name="close-circle-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        :
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text style={tw`text-gray-600 mt-4`}>No Reservations Found!</Text>
        </View>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;