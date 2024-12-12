import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddReservationScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1); // Add guests state
  const [editingIndex, setEditingIndex] = useState(null);

  const resetForm = () => {
    setName('');
    setDate('');
    setTime('');
    setGuests(1); // Reset guests to 1
    setEditingIndex(null);
  };

  const handleAddOrUpdateReservation = async () => {
    if (!name || !date || !time || !guests) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const reservationData = {
      user: '60f1b2b5a3c1d2e3f4g5h6i7', // Replace with actual user ID
      restaurant: '60f1b2b5a3c1d2e3f4g5h6i8', // Replace with actual restaurant ID
      date: new Date(date).toISOString(),
      time,
      guests,
      status: 'confirmed',
    };

    try {
      if (editingIndex !== null) {
        // Update existing reservation (not implemented in backend yet)
        const updatedReservations = reservations.map((reservation, index) =>
          index === editingIndex ? { name, date, time, guests } : reservation
        );
        setReservations(updatedReservations);
        Alert.alert('Success', 'Reservation updated successfully!');
      } else {
        // Add new reservation
        const response = await fetch('https://reservationappserver.onrender.com/restaurant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });

        if (response.ok) {
          const newReservation = await response.json();
          setReservations([...reservations, newReservation]);
          Alert.alert('Success', 'Reservation added successfully!');
        } else {
          Alert.alert('Error', 'Failed to add reservation. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error adding/updating reservation:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }

    resetForm();
  };

  const handleEditReservation = (index) => {
    const reservation = reservations[index];
    setName(reservation.name);
    setDate(reservation.date);
    setTime(reservation.time);
    setGuests(reservation.guests);
    setEditingIndex(index);
  };

  const handleDeleteReservation = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this reservation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReservations = reservations.filter(
              (_, i) => i !== index
            );
            setReservations(updatedReservations);
            Alert.alert('Success', 'Reservation deleted successfully!');
          },
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>

      <ScrollView style={tw`p-4`}>
        <Text style={tw`text-xl font-semibold mb-4 text-gray-800`}>
          {editingIndex !== null ? 'Edit Reservation' : 'Add a New Reservation'}
        </Text>

        {/* Name Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`mb-2 font-medium text-gray-700`}>Customer Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter customer's name"
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
          />
        </View>

        {/* Date Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`mb-2 font-medium text-gray-700`}>Reservation Date</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
          />
        </View>

        {/* Time Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`mb-2 font-medium text-gray-700`}>Reservation Time</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="HH:MM"
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
          />
        </View>

        {/* Guests Input */}
        <View style={tw`mb-6`}>
          <Text style={tw`mb-2 font-medium text-gray-700`}>Number of Guests</Text>
          <TextInput
            value={guests.toString()}
            onChangeText={(text) => setGuests(parseInt(text) || 1)}
            placeholder="1"
            keyboardType="numeric"
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
          />
        </View>

        {/* Add/Update Reservation Button */}
        <TouchableOpacity
          onPress={handleAddOrUpdateReservation}
          style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
        >
          <Text style={tw`text-white text-center font-medium`}>
            {editingIndex !== null ? 'Update Reservation' : 'Add Reservation'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Reservations List */}
      <View style={tw`flex-1 p-4`}>
        <FlatList
          data={reservations}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={tw`flex-row items-center justify-between p-4 mb-2 bg-white border border-gray-300 rounded-lg`}
            >
              <View>
                <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
                <Text style={tw`text-sm text-gray-500`}>
                  {item.date} at {item.time} for {item.guests} guests
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  onPress={() => handleEditReservation(index)}
                  style={tw`mr-4`}
                >
                  <Ionicons name="create-outline" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteReservation(index)}>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AddReservationScreen;