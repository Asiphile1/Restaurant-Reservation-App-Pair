// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   Button,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
// } from 'react-native';
// import tw from 'twrnc';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, selectToken } from '../../state/slices/authSlice'; // Import logout action
// import * as ImagePicker from 'react-native-image-picker'; // Import image picker

// const ProfileScreen = ({ navigation }) => {
//   // State to manage profile data, loading, and error states
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
//   const [editModalVisible, setEditModalVisible] = useState(false); // State for edit modal visibility
//   const [editedProfile, setEditedProfile] = useState({
//     fullNames: '',
//     phone: '',
//     address: '',
//   }); // State for edited profile data

//   // Extract the token from the Redux store
//   const token = useSelector(selectToken);
//   const dispatch = useDispatch();

//   // Function to fetch profile data
//   const fetchProfile = async (retries = 3) => {
//     try {
//       // Include the token in the request headers
//       const response = await axios.get('https://reservationappserver.onrender.com/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add the token to the headers
//         },
//       });

//       // Set profile data from API response
//       setProfile(response.data);
//       setProfilePicture(response.data.profilePicture); // Set profile picture if available
//       setEditedProfile({
//         fullNames: response.data.fullNames,
//         phone: response.data.phone,
//         address: response.data.address,
//       }); // Set initial edited profile data
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       console.error('Error fetching profile:', err);

//       // Retry fetching if there are retries left
//       if (retries > 0) {
//         console.log(`Retrying... (${retries} attempts left)`);
//         fetchProfile(retries - 1);
//         return;
//       }

//       // Set error state if all retries fail
//       setError('Failed to load profile data');
//       Alert.alert('Error', 'Unable to load profile data. Please try again later.');
//     } finally {
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   // Fetch profile data when the component mounts
//   useEffect(() => {
//     if (token) {
//       fetchProfile();
//     } else {
//       setError('No authentication token found. Please log in.');
//       setLoading(false);
//     }
//   }, [token]); // Re-fetch if the token changes

//   // Function to handle image selection
//   const handleSelectProfilePicture = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 0.5,
//       includeBase64: true,
//     };

//     ImagePicker.launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         const source = { uri: response.assets[0].uri };
//         setProfilePicture(source); // Set the selected image as the profile picture
//         uploadProfilePicture(response.assets[0]); // Upload the image to the server
//       }
//     });
//   };

//   // Function to upload profile picture to the server
//   const uploadProfilePicture = async (image) => {
//     const formData = new FormData();
//     formData.append('profilePicture', {
//       uri: image.uri,
//       type: image.type,
//       name: image.fileName || 'profilePicture.jpg',
//     });

//     try {
//       const response = await axios.put(
//         'https://reservationappserver.onrender.com/auth/profile/picture',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       Alert.alert('Success', 'Profile picture updated successfully!');
//       setProfile({ ...profile, profilePicture: response.data.profilePicture });
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//       Alert.alert('Error', 'Failed to upload profile picture. Please try again later.');
//     }
//   };

//   // Function to handle profile update
//   const handleUpdateProfile = async () => {
//     if (!editedProfile.fullNames || !editedProfile.phone || !editedProfile.address) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         'https://reservationappserver.onrender.com/auth/profile',
//         editedProfile,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Alert.alert('Success', 'Profile updated successfully!');
//       setProfile(response.data.user);
//       setEditModalVisible(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to update profile. Please try again later.');
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to log out?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: () => {
//             dispatch(logout()); // Dispatch the logout action
//             navigation.replace('Login'); // Navigate to the login screen
//           },
//         },
//       ]
//     );
//   };

//   // Loading state: Show a spinner
//   if (loading) {
//     return (
//       <View style={tw`flex-1 justify-center items-center bg-white`}>
//         <ActivityIndicator size="large" color="#3498db" />
//         <Text style={tw`mt-4 text-gray-600`}>Loading profile data...</Text>
//       </View>
//     );
//   }

//   // Error state: Show an error message and a retry button
//   if (error) {
//     return (
//       <View style={tw`flex-1 justify-center items-center bg-white`}>
//         <Text style={tw`text-lg text-red-500`}>{error}</Text>
//         <Text style={tw`mt-4 text-gray-600`}>Please try again later.</Text>
//         <Button title="Retry" onPress={fetchProfile} />
//       </View>
//     );
//   }

//   // Success state: Display the profile data
//   return (
//     <ScrollView style={tw`flex-1 bg-white p-4`}>
//       <View style={tw`flex-row items-center mb-6`}>
//         {/* Profile Picture */}
//         <TouchableOpacity onPress={handleSelectProfilePicture}>
//           {profilePicture ? (
//             <Image
//               source={{ uri: profilePicture.uri || profilePicture }}
//               style={tw`w-20 h-20 rounded-full mr-4`}
//             />
//           ) : (
//             <View style={tw`w-20 h-20 rounded-full bg-gray-300 mr-4 items-center justify-center`}>
//               <Text style={tw`text-4xl text-white`}>{profile.fullNames.charAt(0).toUpperCase()}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <View>
//           <Text style={tw`text-2xl font-bold text-gray-800`}>{profile.fullNames}</Text>
//           <Text style={tw`text-gray-600`}>{profile.email}</Text>
//         </View>
//       </View>

//       {/* Profile Details Section */}
//       <View style={tw`mb-4`}>
//         <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Profile Details</Text>
//         <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//           <Text style={tw`text-gray-600`}>
//             <Text style={tw`font-semibold text-gray-700`}>Name: </Text>
//             {profile.fullNames}
//           </Text>
//         </View>
//         <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//           <Text style={tw`text-gray-600`}>
//             <Text style={tw`font-semibold text-gray-700`}>Email: </Text>
//             {profile.email}
//           </Text>
//         </View>
//         <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//           <Text style={tw`text-gray-600`}>
//             <Text style={tw`font-semibold text-gray-700`}>Phone: </Text>
//             {profile.phone}
//           </Text>
//         </View>
//         <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//           <Text style={tw`text-gray-600`}>
//             <Text style={tw`font-semibold text-gray-700`}>Address: </Text>
//             {profile.address}
//           </Text>
//         </View>
//       </View>

//       {/* Edit Profile Button */}
//       <View style={tw`mb-4`}>
//         <Button title="Edit Profile" onPress={() => setEditModalVisible(true)} color="#3498db" />
//       </View>

//       {/* Logout Button */}
//       <View style={tw`mt-6`}>
//         <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
//       </View>

//       {/* Edit Profile Modal */}
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={editModalVisible}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={tw`flex-1 bg-white p-4`}>
//           <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Edit Profile</Text>

//           {/* Full Names Input */}
//           <View style={tw`mb-4`}>
//             <Text style={tw`mb-2 font-medium text-gray-700`}>Full Names</Text>
//             <TextInput
//               value={editedProfile.fullNames}
//               onChangeText={(text) => setEditedProfile({ ...editedProfile, fullNames: text })}
//               placeholder="Enter your full names"
//               style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
//             />
//           </View>

//           {/* Phone Input */}
//           <View style={tw`mb-4`}>
//             <Text style={tw`mb-2 font-medium text-gray-700`}>Phone</Text>
//             <TextInput
//               value={editedProfile.phone}
//               onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
//               placeholder="Enter your phone number"
//               style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
//             />
//           </View>

//           {/* Address Input */}
//           <View style={tw`mb-4`}>
//             <Text style={tw`mb-2 font-medium text-gray-700`}>Address</Text>
//             <TextInput
//               value={editedProfile.address}
//               onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
//               placeholder="Enter your address"
//               style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
//             />
//           </View>

//           {/* Save Button */}
//           <TouchableOpacity
//             onPress={handleUpdateProfile}
//             style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
//           >
//             <Text style={tw`text-white text-center font-medium`}>Save</Text>
//           </TouchableOpacity>

//           {/* Cancel Button */}
//           <TouchableOpacity
//             onPress={() => setEditModalVisible(false)}
//             style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
//           >
//             <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default ProfileScreen;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectToken } from '../../state/slices/authSlice';
import * as ImagePicker from 'react-native-image-picker';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  // State management
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [imageOptionsVisible, setImageOptionsVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullNames: '',
    phone: '',
    address: '',
  });

  // Redux hooks
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  // Fetch profile data
  const fetchProfile = async (retries = 3) => {
    try {
      const response = await axios.get('https://reservationappserver.onrender.com/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      setProfilePicture(response.data.profilePicture);
      setEditedProfile({
        fullNames: response.data.fullNames,
        phone: response.data.phone,
        address: response.data.address,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);

      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        fetchProfile(retries - 1);
        return;
      }

      setError('Failed to load profile data');
      Alert.alert('Error', 'Unable to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Component mount effect
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setError('No authentication token found. Please log in.');
      setLoading(false);
    }
  }, [token]);

  // Image selection handler
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
        setProfilePicture(source);
        uploadProfilePicture(response.assets[0]);
        setImageOptionsVisible(false);
      }
    });
  };

  // Camera photo handler
  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
      cameraType: 'front',
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfilePicture(source);
        uploadProfilePicture(response.assets[0]);
        setImageOptionsVisible(false);
      }
    });
  };

  // Upload profile picture
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

  // Profile update handler
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

  // Logout handler
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
            dispatch(logout());
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  // Image options modal
  const renderImageOptionsModal = () => (
    <Modal
      transparent
      visible={imageOptionsVisible}
      animationType="slide"
      onRequestClose={() => setImageOptionsVisible(false)}
    >
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-6 rounded-t-2xl`}>
          <Text style={tw`text-xl font-bold text-center mb-4`}>Choose Profile Picture</Text>
          <TouchableOpacity 
            onPress={handleSelectProfilePicture} 
            style={tw`flex-row items-center p-4 bg-gray-100 rounded-lg mb-3`}
          >
            <Feather name="image" size={24} color="black" style={tw`mr-3`} />
            <Text style={tw`text-base`}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleTakePhoto} 
            style={tw`flex-row items-center p-4 bg-gray-100 rounded-lg`}
          >
            <Feather name="camera" size={24} color="black" style={tw`mr-3`} />
            <Text style={tw`text-base`}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setImageOptionsVisible(false)} 
            style={tw`mt-4 p-4 bg-red-500 rounded-lg`}
          >
            <Text style={tw`text-white text-center font-bold`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Loading state
  if (loading) {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="white" />
        <Text style={tw`mt-4 text-white`}>Loading profile...</Text>
      </LinearGradient>
    );
  }

  // Error state
  if (error) {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={tw`flex-1 justify-center items-center p-4`}>
        <Text style={tw`text-lg text-white mb-4 text-center`}>{error}</Text>
        <TouchableOpacity 
          onPress={fetchProfile} 
          style={tw`bg-white px-6 py-3 rounded-full`}
        >
          <Text style={tw`text-blue-600 font-bold`}>Retry</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Main profile view
  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ScrollView>
        <LinearGradient 
          colors={['#4c669f', '#3b5998', '#192f6a']} 
          style={tw`pb-8 rounded-b-3xl`}
        >
          <TouchableOpacity 
            onPress={() => setImageOptionsVisible(true)} 
            style={tw`self-center mb-4 relative`}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture.uri || profilePicture }}
                style={tw`w-32 h-32 rounded-full border-4 border-white`}
              />
            ) : (
              <View style={tw`w-32 h-32 rounded-full bg-blue-500 items-center justify-center`}>
                <Text style={tw`text-5xl text-white font-bold`}>
                  {profile.fullNames.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={tw`absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full`}>
              <Feather name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={tw`text-center text-2xl font-bold text-white`}>{profile.fullNames}</Text>
          <Text style={tw`text-center text-white mb-4`}>{profile.email}</Text>
        </LinearGradient>

        <View style={tw`p-4 -mt-8`}>
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-4`}>
            <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>Profile Details</Text>
            {[
              { label: 'Full Name', value: profile.fullNames },
              { label: 'Email', value: profile.email },
              { label: 'Phone', value: profile.phone },
              { label: 'Address', value: profile.address }
            ].map((detail, index) => (
              <View 
                key={index} 
                style={tw`flex-row justify-between py-3 ${index < 3 ? 'border-b border-gray-200' : ''}`}
              >
                <Text style={tw`text-gray-600`}>{detail.label}</Text>
                <Text style={tw`font-bold text-gray-800`}>{detail.value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            onPress={() => setEditModalVisible(true)} 
            style={tw`bg-blue-500 px-6 py-3 rounded-full mb-4`}
          >
            <Text style={tw`text-white text-center font-bold`}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout} 
            style={tw`bg-red-500 px-6 py-3 rounded-full`}
          >
            <Text style={tw`text-white text-center font-bold`}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal (Kept exactly the same as original) */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Edit Profile</Text>

            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Full Names</Text>
              <TextInput
                value={editedProfile.fullNames}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, fullNames: text })}
                placeholder="Enter your full names"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Phone</Text>
              <TextInput
                value={editedProfile.phone}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
                placeholder="Enter your phone number"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`mb-2 font-medium text-gray-700`}>Address</Text>
              <TextInput
                value={editedProfile.address}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
                placeholder="Enter your address"
                style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
              />
            </View>

            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
            >
              <Text style={tw`text-white text-center font-medium`}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
            >
              <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Image Options Modal */}
        {renderImageOptionsModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;