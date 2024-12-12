import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';

const ManageBookingsScreen = () => {
  // Example bookings data
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Booking 1', time: '10:00 AM', status: 'pending' },
    { id: 2, name: 'Booking 2', time: '12:00 PM', status: 'pending' },
    { id: 3, name: 'Booking 3', time: '02:00 PM', status: 'pending' },
  ]);

  // Function to handle booking actions (Accept/Deny)
  const handleBookingAction = (id, action) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: action } : booking
    );
    setBookings(updatedBookings);
    Alert.alert('Success', `Booking ${action === 'accepted' ? 'accepted' : 'denied'} successfully!`);
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Manage Bookings</Text>

      {bookings.map((booking) => (
        <View key={booking.id} style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>{booking.name}</Text>
          <Text style={tw`text-sm text-gray-600 mb-2`}>{booking.time}</Text>

          {/* Actions (Accept/Deny) */}
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              onPress={() => handleBookingAction(booking.id, 'accepted')}
              style={tw`bg-green-500 p-2 rounded-lg mr-2`}
            >
              <Text style={tw`text-white`}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBookingAction(booking.id, 'denied')}
              style={tw`bg-red-500 p-2 rounded-lg`}
            >
              <Text style={tw`text-white`}>Deny</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ManageBookingsScreen;