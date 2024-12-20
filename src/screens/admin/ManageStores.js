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
  Platform,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker
import { Picker } from '@react-native-picker/picker'; // Native Picker
import DropdownPicker from 'react-native-dropdown-picker'; // Dropdown for Web

// Conditionally import Picker for native platforms
const CityPicker = Platform.select({
  ios: Picker,
  android: Picker,
  web: DropdownPicker, // Use DropdownPicker for web
});

const ManageStores = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [form, setForm] = useState({
    name: '',
    image: null,
    description: '', // Added description field
    address: '',
    city: '',
    cuisine: '',
    capacity: '',
    phone: '',
    email: '',
    price: { lunch: '', dinner: '' },
    coordinates: {
      type: 'Point',
      coordinates: [0, 0], // Default coordinates
    },
  });

  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);

  // List of cities in Gauteng
  const gautengCities = [
    'Johannesburg',
    'Pretoria',
    'Soweto',
    'Benoni',
    'Vereeniging',
    'Roodepoort',
    'Boksburg',
    'Alberton',
    'Krugersdorp',
    'Randburg',
    'Midrand',
    'Sandton',
    'Germiston',
    'Tembisa',
    'Centurion',
    'Carletonville',
    'Springs',
    'Krugersdorp',
    'Randfontein',
    'Emfuleni',
    'Westonaria',
    'Ekurhuleni',
  ];

  // Request permissions for image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Fetch restaurants data
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('https://reservationappserver.onrender.com/restaurants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // Extract the `restaurants` array from the API response
        setRestaurants(data.restaurants || []);
      } else {
        throw new Error('Failed to fetch restaurants');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      Alert.alert('Error', 'Failed to fetch restaurants. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRestaurants();
  };

  const resetForm = () => {
    setForm({
      name: '',
      image: null,
      description: '',
      address: '',
      city: '',
      cuisine: '',
      capacity: '',
      phone: '',
      email: '',
      price: { lunch: '', dinner: '' },
      coordinates: {
        type: 'Point',
        coordinates: [0, 0],
      },
    });
    setEditingRestaurant(null);
  };

  // Handle adding and updating restaurants
  const handleRestaurantSubmit = async () => {
    const {
      name,
      image,
      description,
      address,
      city,
      cuisine,
      capacity,
      phone,
      email,
      price,
      coordinates,
    } = form;

    // Validate required fields
    if (
      !name ||
      !image ||
      !description ||
      !address ||
      !city ||
      !cuisine ||
      !capacity ||
      !price.lunch ||
      !price.dinner ||
      !phone ||
      !email
    ) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    // Validate price fields
    if (isNaN(price.lunch) || isNaN(price.dinner)) {
      Alert.alert('Error', 'Price fields must be numbers.');
      return;
    }

    // Upload image if it's a local file
    let imageUrl = image ? image.uri : null;
    if (image && image.uri && !image.uri.startsWith('http')) {
      try {
        imageUrl = await uploadImage(image.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image.');
        return;
      }
    }

    const restaurantData = {
      name,
      image: imageUrl,
      description,
      location: `${address}, ${city}`, // Combine address and city into location
      coordinates, // Ensure coordinates are included
      cuisine,
      capacity: parseInt(capacity, 10),
      phone,
      email,
      price: {
        lunch: parseFloat(price.lunch),
        dinner: parseFloat(price.dinner),
      },
      averageRating: 0, // Optional: Add if required
      totalReviews: 0, // Optional: Add if required
      user: token.userId, // Ensure the user ID is included
    };

    // Log the restaurantData object
    console.log('Restaurant Data:', JSON.stringify(restaurantData, null, 2));

    const method = editingRestaurant ? 'PUT' : 'POST';
    const url = editingRestaurant
      ? `https://reservationappserver.onrender.com/restaurants/${editingRestaurant._id}`
      : 'https://reservationappserver.onrender.com/restaurants';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        const updatedRestaurant = await response.json();
        setRestaurants((prevRestaurants) =>
          editingRestaurant
            ? prevRestaurants.map((restaurant) =>
                restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
              )
            : [...prevRestaurants, updatedRestaurant]
        );
        Alert.alert('Success', `Restaurant ${editingRestaurant ? 'updated' : 'added'} successfully!`);
        setModalVisible(false);
        resetForm();
      } else {
        const errorResponse = await response.json();
        console.error('Server Error:', errorResponse);
        Alert.alert('Error', `Failed to save restaurant. Server responded with: ${response.status} - ${JSON.stringify(errorResponse)}`);
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  // Handle image upload
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `image_${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://reservationappserver.onrender.com/restaurant/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  // Handle delete restaurant
  const handleDeleteRestaurant = async (id) => {
    // const { id } = restaurants.body
    console.log('id' , id)
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
                { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
              );

              if (response.ok) {
                setRestaurants((prevRestaurants) =>
                  prevRestaurants.filter((restaurant) => restaurant._id !== id)
                );
                Alert.alert('Success', 'Restaurant deleted successfully!');
              } else {
                throw new Error('Failed to delete restaurant.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'An error occurred. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Render restaurant item
// Render restaurant item
const renderRestaurantItem = ({ item }) => (
  <TouchableOpacity
    style={tw`flex-row p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm`}
    onPress={() => navigation.navigate('RestaurantDetailsScreen', { restaurant: item })} // Pass the restaurant object
  >
    <Image
      source={{ uri: item.image }}
      style={tw`w-24 h-24 rounded-lg mr-4`}
      resizeMode="cover"
    />
    <View style={tw`flex-1`}>
      <Text style={tw`text-lg font-semibold text-gray-800`}>{item.name}</Text>
      <Text style={tw`text-sm text-gray-600`}>{item.location}</Text>
      <Text style={tw`text-sm text-gray-600`}>Cuisine: {item.cuisine}</Text>
      <Text style={tw`text-sm text-gray-600`}>Capacity: {item.capacity}</Text>
    </View>
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
        style={tw`mr-4`}
        onPress={() => {
          setEditingRestaurant(item);
          setForm({
            name: item.name,
            image: { uri: item.image },
            description: item.description || '',
            address: item.location.split(', ')[0],
            city: item.location.split(', ')[1],
            cuisine: item.cuisine,
            capacity: item.capacity.toString(),
            phone: item.phone || '',
            email: item.email || '',
            price: {
              lunch: item.price?.lunch.toString() || '',
              dinner: item.price?.dinner.toString() || '',
            },
            coordinates: item.coordinates || { type: 'Point', coordinates: [0, 0] },
          });
          setModalVisible(true);
        }}
      >
        <Ionicons name="create-outline" size={24} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteRestaurant(item._id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

  // Handle image picker
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setForm((prev) => ({ ...prev, image: { uri: result.uri } }));
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={tw`flex-1 justify-center items-center`} />
      ) : (
        <>
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderRestaurantItem}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />

          {!restaurants.length && (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-lg text-gray-600`}>No restaurants found.</Text>
            </View>
          )}

          <TouchableOpacity
            style={tw`absolute bottom-4 right-4 bg-blue-500 p-4 rounded-full shadow-lg`}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>

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
                {/* Form fields */}
                {/* Name */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Name</Text>
                  <TextInput
                    value={form.name}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
                    placeholder="Enter name"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Image */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Image</Text>
                  <TouchableOpacity onPress={handleImagePicker} style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}>
                    <Text>{form.image ? 'Change Image' : 'Select Image'}</Text>
                  </TouchableOpacity>
                  {form.image && <Image source={form.image} style={tw`w-24 h-24 mt-2`} />}
                </View>

                {/* Description */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Description</Text>
                  <TextInput
                    value={form.description}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, description: value }))}
                    placeholder="Enter description"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Address */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Address</Text>
                  <TextInput
                    value={form.address}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, address: value }))}
                    placeholder="Enter address"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* City */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>City</Text>
                  {Platform.OS !== 'web' ? (
                    <CityPicker
                      selectedValue={form.city}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
                      style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                    >
                      <Picker.Item label="Select a city" value="" />
                      {gautengCities.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                      ))}
                    </CityPicker>
                  ) : (
                    <DropdownPicker
                      open={false}
                      value={form.city}
                      items={gautengCities.map((city) => ({ label: city, value: city }))}
                      setValue={(value) => setForm((prev) => ({ ...prev, city: value }))}
                      style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                    />
                  )}
                </View>

                {/* Cuisine */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Cuisine</Text>
                  <TextInput
                    value={form.cuisine}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, cuisine: value }))}
                    placeholder="Enter cuisine"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Capacity */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Capacity</Text>
                  <TextInput
                    value={form.capacity}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, capacity: value }))}
                    placeholder="Enter capacity"
                    keyboardType="numeric"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Phone */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Phone</Text>
                  <TextInput
                    value={form.phone}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                    placeholder="Enter phone number"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Email */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Email</Text>
                  <TextInput
                    value={form.email}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
                    placeholder="Enter email"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Price - Lunch */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Price - Lunch</Text>
                  <TextInput
                    value={form.price.lunch}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, price: { ...prev.price, lunch: value } }))}
                    placeholder="Enter lunch price"
                    keyboardType="numeric"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                {/* Price - Dinner */}
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-700`}>Price - Dinner</Text>
                  <TextInput
                    value={form.price.dinner}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, price: { ...prev.price, dinner: value } }))}
                    placeholder="Enter dinner price"
                    keyboardType="numeric"
                    style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleRestaurantSubmit}
                  style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
                >
                  <Text style={tw`text-white text-center font-medium`}>
                    {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={tw`bg-gray-300 p-4 rounded-lg shadow-lg mt-4`}
                >
                  <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default ManageStores;