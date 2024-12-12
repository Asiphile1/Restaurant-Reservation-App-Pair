import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectToken } from '../../state/slices/authSlice'; // Import logout action
import * as ImagePicker from 'react-native-image-picker'; // Import image picker

const ProfileScreen = ({ navigation }) => {
  // State to manage profile data, loading, and error states
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [editModalVisible, setEditModalVisible] = useState(false); // State for edit modal visibility
  const [editedProfile, setEditedProfile] = useState({
    fullNames: '',
    phone: '',
    address: '',
  }); // State for edited profile data

  // Extract the token from the Redux store
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  // Function to fetch profile data
  const fetchProfile = async (retries = 3) => {
    try {
      // Include the token in the request headers
      const response = await axios.get('https://reservationappserver.onrender.com/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      });

      // Set profile data from API response
      setProfile(response.data);
      setProfilePicture(response.data.profilePicture); // Set profile picture if available
      setEditedProfile({
        fullNames: response.data.fullNames,
        phone: response.data.phone,
        address: response.data.address,
      }); // Set initial edited profile data
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching profile:', err);

      // Retry fetching if there are retries left
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        fetchProfile(retries - 1);
        return;
      }

      // Set error state if all retries fail
      setError('Failed to load profile data');
      Alert.alert('Error', 'Unable to load profile data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setError('No authentication token found. Please log in.');
      setLoading(false);
    }
  }, [token]); // Re-fetch if the token changes

  // Function to handle image selection
  const handleSelectProfilePicture = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfilePicture(source); // Set the selected image as the profile picture
        uploadProfilePicture(response.assets[0]); // Upload the image to the server
      }
    });
  };

  // Function to upload profile picture to the server
  const uploadProfilePicture = async (image) => {
    const formData = new FormData();
    formData.append('profilePicture', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || 'profilePicture.jpg',
    });

    try {
      const response = await axios.put(
        'https://reservationappserver.onrender.com/auth/profile/picture',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert('Success', 'Profile picture updated successfully!');
      setProfile({ ...profile, profilePicture: response.data.profilePicture });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', 'Failed to upload profile picture. Please try again later.');
    }
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    if (!editedProfile.fullNames || !editedProfile.phone || !editedProfile.address) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(
        'https://reservationappserver.onrender.com/auth/profile',
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Profile updated successfully!');
      setProfile(response.data.user);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout()); // Dispatch the logout action
            navigation.replace('Login'); // Navigate to the login screen
          },
        },
      ]
    );
  };

  // Loading state: Show a spinner
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={tw`mt-4 text-gray-600`}>Loading profile data...</Text>
      </View>
    );
  }

  // Error state: Show an error message and a retry button
  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg text-red-500`}>{error}</Text>
        <Text style={tw`mt-4 text-gray-600`}>Please try again later.</Text>
        <Button title="Retry" onPress={fetchProfile} />
      </View>
    );
  }

  // Success state: Display the profile data
  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row items-center mb-6`}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleSelectProfilePicture}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture.uri || profilePicture }}
              style={tw`w-20 h-20 rounded-full mr-4`}
            />
          ) : (
            <View style={tw`w-20 h-20 rounded-full bg-gray-300 mr-4 items-center justify-center`}>
              <Text style={tw`text-4xl text-white`}>{profile.fullNames.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={tw`text-2xl font-bold text-gray-800`}>{profile.fullNames}</Text>
          <Text style={tw`text-gray-600`}>{profile.email}</Text>
        </View>
      </View>

      {/* Profile Details Section */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Profile Details</Text>
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-gray-600`}>
            <Text style={tw`font-semibold text-gray-700`}>Name: </Text>
            {profile.fullNames}
          </Text>
        </View>
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-gray-600`}>
            <Text style={tw`font-semibold text-gray-700`}>Email: </Text>
            {profile.email}
          </Text>
        </View>
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-gray-600`}>
            <Text style={tw`font-semibold text-gray-700`}>Phone: </Text>
            {profile.phone}
          </Text>
        </View>
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-gray-600`}>
            <Text style={tw`font-semibold text-gray-700`}>Address: </Text>
            {profile.address}
          </Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <View style={tw`mb-4`}>
        <Button title="Edit Profile" onPress={() => setEditModalVisible(true)} color="#3498db" />
      </View>

      {/* Logout Button */}
      <View style={tw`mt-6`}>
        <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={tw`flex-1 bg-white p-4`}>
          <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Edit Profile</Text>

          {/* Full Names Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>Full Names</Text>
            <TextInput
              value={editedProfile.fullNames}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, fullNames: text })}
              placeholder="Enter your full names"
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* Phone Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>Phone</Text>
            <TextInput
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="Enter your phone number"
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* Address Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>Address</Text>
            <TextInput
              value={editedProfile.address}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
              placeholder="Enter your address"
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleUpdateProfile}
            style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
          >
            <Text style={tw`text-white text-center font-medium`}>Save</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => setEditModalVisible(false)}
            style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
          >
            <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;