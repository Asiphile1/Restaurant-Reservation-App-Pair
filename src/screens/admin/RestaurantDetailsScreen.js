import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params ?? {};
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const token = useSelector((state) => state.auth.token);

  const fetchReservations = async (showLoadingIndicator = true) => {
    try {
      if (showLoadingIndicator) setIsLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:4050/restaurants/admin/reservations/${restaurant._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError('Unable to load reservations. Please try again later.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (restaurant?._id) {
      fetchReservations();
    }
  }, [restaurant?._id]);

  const handleReservationAction = async (reservationId, action) => {
    try {
      const response = await fetch(
        `https://reservationappserver.onrender.com/reservations/${reservationId}/${action}`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${action} reservation`);
      }

      setReservations(prev => 
        prev.map(res => 
          res._id === reservationId 
            ? { ...res, status: action === 'confirm' ? 'Confirmed' : 'Rejected' }
            : res
        )
      );

      Alert.alert('Success', `Reservation ${action}ed successfully`);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (!restaurant) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
        <Text style={tw`text-lg text-gray-600`}>Restaurant not found</Text>
      </View>
    );
  }

  const ReservationCard = ({ item }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm`}>
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
          <Text style={tw`text-sm text-gray-600 mt-1`}>
            {format(new Date(item.date), 'MMM dd, yyyy')} at {item.time}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>{item.guests} guests</Text>
          <View style={tw`mt-2`}>
            <Text style={tw`text-sm ${
              item.status === 'Confirmed' ? 'text-green-600' :
              item.status === 'Rejected' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity
            onPress={() => handleReservationAction(item._id, 'confirm')}
            style={tw`p-2`}
            disabled={item.status !== 'Pending'}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={28} 
              color={item.status === 'Pending' ? '#22c55e' : '#d1d5db'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReservationAction(item._id, 'reject')}
            style={tw`p-2`}
            disabled={item.status !== 'Pending'}
          >
            <Ionicons 
              name="close-circle" 
              size={28} 
              color={item.status === 'Pending' ? '#ef4444' : '#d1d5db'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`h-56 relative`}>
        <Image
          source={{ uri: restaurant.image }}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
        <View style={tw`absolute bottom-0 left-0 right-0 p-4 bg-black/30`}>
          <Text style={tw`text-2xl font-bold text-white`}>{restaurant.name}</Text>
          <Text style={tw`text-white text-sm mt-1`}>
            {restaurant.cuisine} • {restaurant.location}
          </Text>
        </View>
      </View>

      <View style={tw`flex-1 px-4`}>
        <View style={tw`flex-row justify-between items-center mt-4 mb-2`}>
          <Text style={tw`text-xl font-semibold text-gray-900`}>Reservations</Text>
          <Text style={tw`text-sm text-gray-600`}>
            Capacity: {restaurant.capacity}
          </Text>
        </View>

        {isLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#1E88E5" />
          </View>
        ) : error ? (
          <View style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`text-gray-600 text-center mb-4`}>{error}</Text>
            <TouchableOpacity
              onPress={() => fetchReservations()}
              style={tw`bg-blue-500 px-6 py-3 rounded-full`}
            >
              <Text style={tw`text-white font-medium`}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={reservations}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <ReservationCard item={item} />}
            contentContainerStyle={tw`py-4`}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true);
                  fetchReservations(false);
                }}
              />
            }
            ListEmptyComponent={
              <View style={tw`flex-1 justify-center items-center py-8`}>
                <Text style={tw`text-gray-600`}>No reservations found</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default RestaurantDetailsScreen;