import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageStores = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  // State for new/edit restaurant form
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [capacity, setCapacity] = useState('');

  // Fetch restaurants from the backend
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('https://reservationappserver.onrender.com/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      } else {
        console.error('Failed to fetch restaurants:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchRestaurants();
  };

  // Handle adding a new restaurant
  const handleAddRestaurant = async () => {
    if (!name || !image || !location || !cuisine || !capacity) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newRestaurant = {
      name,
      image,
      location,
      cuisine,
      capacity: parseInt(capacity, 10),
      availableSlots: [],
      averageRating: 0,
      totalReviews: 0,
    };

    try {
      const response = await fetch('https://reservationappserver.onrender.com/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRestaurant),
      });

      if (response.ok) {
        const createdRestaurant = await response.json();
        setRestaurants([...restaurants, createdRestaurant]);
        Alert.alert('Success', 'Restaurant added successfully!');
        setModalVisible(false);
        resetForm();
      } else {
        Alert.alert('Error', 'Failed to add restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  // Handle updating an existing restaurant
  const handleUpdateRestaurant = async () => {
    if (!name || !image || !location || !cuisine || !capacity) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const updatedRestaurant = {
      name,
      image,
      location,
      cuisine,
      capacity: parseInt(capacity, 10),
    };

    try {
      const response = await fetch(
        `https://reservationappserver.onrender.com/restaurants/${editingRestaurant._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRestaurant),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setRestaurants(
          restaurants.map((restaurant) =>
            restaurant._id === updatedData._id ? updatedData : restaurant
          )
        );
        Alert.alert('Success', 'Restaurant updated successfully!');
        setModalVisible(false);
        resetForm();
      } else {
        Alert.alert('Error', 'Failed to update restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  // Handle deleting a restaurant
  const handleDeleteRestaurant = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this restaurant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://reservationappserver.onrender.com/restaurants/${id}`,
                {
                  method: 'DELETE',
                }
              );

              if (response.ok) {
                setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
                Alert.alert('Success', 'Restaurant deleted successfully!');
              } else {
                Alert.alert('Error', 'Failed to delete restaurant. Please try again.');
              }
            } catch (error) {
              console.error('Error deleting restaurant:', error);
              Alert.alert('Error', 'An error occurred. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setImage('');
    setLocation('');
    setCuisine('');
    setCapacity('');
    setEditingRestaurant(null);
  };

  // Render each restaurant item
  const renderRestaurantItem = ({ item }) => (
    <View style={tw`flex-row p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm`}>
      {/* Restaurant Image */}
      <Image
        source={{ uri: item.image }}
        style={tw`w-24 h-24 rounded-lg mr-4`}
        resizeMode="cover"
      />

      {/* Restaurant Details */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold text-gray-800`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.location}</Text>
        <Text style={tw`text-sm text-gray-600`}>Cuisine: {item.cuisine}</Text>
        <Text style={tw`text-sm text-gray-600`}>Capacity: {item.capacity}</Text>
        <Text style={tw`text-sm text-gray-600`}>
          Average Rating: {item.averageRating} ({item.totalReviews} reviews)
        </Text>
      </View>

      {/* Edit and Delete Buttons */}
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          style={tw`mr-4`}
          onPress={() => {
            setEditingRestaurant(item);
            setName(item.name);
            setImage(item.image);
            setLocation(item.location);
            setCuisine(item.cuisine);
            setCapacity(item.capacity.toString());
            setModalVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteRestaurant(item._id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>

      {/* Loading Indicator */}
      {loading && (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Restaurant List */}
      {!loading && (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderRestaurantItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* No Data Message */}
      {!loading && restaurants.length === 0 && (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-lg text-gray-600`}>No restaurants found.</Text>
        </View>
      )}

      {/* Floating Button to Add Restaurant */}
      <TouchableOpacity
        style={tw`absolute bottom-4 right-4 bg-blue-500 p-4 rounded-full shadow-lg`}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Adding/Editing Restaurant */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-white p-4`}>
          <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>
            {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </Text>

          <ScrollView>
            {/* Name Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter restaurant name"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            {/* Image URL Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Image URL</Text>
              <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="Enter image URL"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            {/* Location Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Location</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            {/* Cuisine Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Cuisine</Text>
              <TextInput
                value={cuisine}
                onChangeText={setCuisine}
                placeholder="Enter cuisine type"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            {/* Capacity Input */}
            <View style={tw`mb-6`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Capacity</Text>
              <TextInput
                value={capacity}
                onChangeText={(text) => setCapacity(text)}
                placeholder="Enter capacity"
                keyboardType="numeric"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            {/* Add/Update Restaurant Button */}
            <TouchableOpacity
              onPress={editingRestaurant ? handleUpdateRestaurant : handleAddRestaurant}
              style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
            >
              <Text style={tw`text-white text-center font-medium`}>
                {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`bg-gray-300 p-4 rounded-lg shadow-lg mt-4`}
            >
              <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ManageStores;