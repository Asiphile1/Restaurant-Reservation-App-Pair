import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import tw from 'twrnc';

const ManageSlotsScreen = () => {
  // Example slots data
  const [slots, setSlots] = useState([
    { id: 1, time: '10:00 AM', status: 'available' },
    { id: 2, time: '12:00 PM', status: 'available' },
    { id: 3, time: '02:00 PM', status: 'available' },
  ]);

  // State for adding a new slot
  const [newSlotTime, setNewSlotTime] = useState('');

  // Function to handle adding a new slot
  const handleAddSlot = () => {
    if (!newSlotTime) {
      Alert.alert('Error', 'Please enter a valid slot time.');
      return;
    }

    const newSlot = {
      id: slots.length + 1,
      time: newSlotTime,
      status: 'available',
    };

    setSlots([...slots, newSlot]);
    setNewSlotTime('');
    Alert.alert('Success', 'New slot added successfully!');
  };

  // Function to handle slot actions (e.g., mark as booked)
  const handleSlotAction = (id, action) => {
    const updatedSlots = slots.map((slot) =>
      slot.id === id ? { ...slot, status: action } : slot
    );
    setSlots(updatedSlots);
    Alert.alert('Success', `Slot marked as ${action}!`);
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Manage Slots</Text>

      {/* Slot List */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Available Slots</Text>
        {slots.map((slot) => (
          <View key={slot.id} style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
            <Text style={tw`text-gray-800`}>{slot.time}</Text>
            <View style={tw`flex-row`}>
              {slot.status === 'available' && (
                <TouchableOpacity
                  onPress={() => handleSlotAction(slot.id, 'booked')}
                  style={tw`bg-yellow-500 p-2 rounded-lg mr-2`}
                >
                  <Text style={tw`text-white`}>Mark as Booked</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => handleSlotAction(slot.id, 'unavailable')}
                style={tw`bg-red-500 p-2 rounded-lg`}
              >
                <Text style={tw`text-white`}>Mark as Unavailable</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Add New Slot */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Add New Slot</Text>
        <TextInput
          value={newSlotTime}
          onChangeText={setNewSlotTime}
          placeholder="Enter slot time (e.g., 10:00 AM)"
          style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white mb-2`}
        />
        <TouchableOpacity
          onPress={handleAddSlot}
          style={tw`bg-blue-500 p-4 rounded-lg`}
        >
          <Text style={tw`text-white text-center`}>Add New Slot</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ManageSlotsScreen;