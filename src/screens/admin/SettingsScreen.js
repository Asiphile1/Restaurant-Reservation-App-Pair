import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Switch,
  Alert,
  Button,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/slices/authSlice'; // Import logout action

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // State for modal visibility
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Function to handle password change
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    // Simulate API call to change password
    Alert.alert('Success', 'Password changed successfully!');
    setChangePasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
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
            navigation.navigate('Login'); // Navigate to the login screen
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Settings</Text>

        {/* Change Password */}
        <TouchableOpacity
          onPress={() => setChangePasswordModalVisible(true)}
          style={tw`bg-gray-100 p-4 rounded-lg mb-2`}
        >
          <Text style={tw`text-gray-800`}>Change Password</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
          <Text style={tw`text-gray-800`}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor="#f9fafb"
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-red-100 p-4 rounded-lg mb-2`}
        >
          <Text style={tw`text-red-600`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <View style={tw`flex-1 bg-white p-4`}>
          <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Change Password</Text>

          {/* Current Password */}
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>Current Password</Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* New Password */}
          <View style={tw`mb-4`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* Confirm New Password */}
          <View style={tw`mb-6`}>
            <Text style={tw`mb-2 font-medium text-gray-700`}>Confirm New Password</Text>
            <TextInput
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Confirm new password"
              secureTextEntry
              style={tw`w-full p-4 border border-gray-300 rounded-lg text-base bg-white`}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
          >
            <Text style={tw`text-white text-center font-medium`}>Save</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => setChangePasswordModalVisible(false)}
            style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
          >
            <Text style={tw`text-gray-800 text-center font-medium`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;