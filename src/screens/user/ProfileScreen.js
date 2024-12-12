import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/slices/authSlice';  // Assuming logout action

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');  // Navigate to login on logout
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Profile</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
