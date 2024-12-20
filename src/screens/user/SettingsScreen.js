import React, { useState, useEffect } from 'react';
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
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      pushEnabled: true,
      emailEnabled: true,
      reservationReminders: true,
      marketingEmails: false,
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
    },
    privacy: {
      showProfile: true,
      showHistory: true,
    },
    language: 'English',
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Image picker
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setIsLoading(true);
        // Simulate upload delay
        setTimeout(() => {
          setProfileImage(result.assets[0].uri);
          setIsLoading(false);
          Alert.alert('Success', 'Profile photo updated successfully!');
        }, 1000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile photo');
    }
  };

  // Handle settings changes
  const updateSetting = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      }
    }));
  };


  // Handle password change
  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setChangePasswordModalVisible(false);
      setPasswordForm({ current: '', new: '', confirm: '' });
      Alert.alert('Success', 'Password updated successfully!');
    }, 1000);
  };

  // Settings sections renderer
  const renderSettingsSection = (title, children) => (
    <View style={tw`mb-6`}>
      <Text style={tw`text-lg font-semibold mb-3 text-gray-800 px-4`}>{title}</Text>
      <View style={tw`bg-white rounded-xl shadow-sm`}>
        {children}
      </View>
    </View>
  );

  // Settings item renderer
  const renderSettingsItem = ({ icon, title, value, onPress, showArrow = true, isSwitch = false }) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center justify-between p-4 border-b border-gray-100`}
    >
      <View style={tw`flex-row items-center flex-1`}>
        <Icon name={icon} size={24} style={tw`text-gray-600 mr-3`} />
        <Text style={tw`text-gray-800 flex-1`}>{title}</Text>
      </View>
      <View style={tw`flex-row items-center`}>
        {isSwitch ? (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor="#ffffff"
            ios_backgroundColor="#d1d5db"
          />
        ) : (
          <>
            <Text style={tw`text-gray-500 mr-2`}>{value}</Text>
            {showArrow && <Icon name="chevron-right" size={20} style={tw`text-gray-400`} />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ScrollView contentContainerStyle={tw`pb-8`}>

        {/* Account Settings */}
        {renderSettingsSection((
          <>
            {renderSettingsItem({
              icon: 'lock',
              title: 'Change Password',
              onPress: () => setChangePasswordModalVisible(true),
            })}
            {renderSettingsItem({
              icon: 'shield-account',
              title: 'Privacy',
              value: settings.privacy.showProfile ? 'Public' : 'Private',
              onPress: () => updateSetting('privacy', 'showProfile', !settings.privacy.showProfile),
            })}
            {renderSettingsItem({
              icon: 'history',
              title: 'Show Reservation History',
              value: settings.privacy.showHistory,
              isSwitch: true,
              onPress: () => updateSetting('privacy', 'showHistory', !settings.privacy.showHistory),
            })}
          </>
        ))}

        {/* Notifications */}
        {renderSettingsSection('Notifications', (
          <>
            {renderSettingsItem({
              icon: 'bell',
              title: 'Push Notifications',
              value: settings.notifications.pushEnabled,
              isSwitch: true,
              onPress: () => updateSetting('notifications', 'pushEnabled', !settings.notifications.pushEnabled),
            })}
            {renderSettingsItem({
              icon: 'email',
              title: 'Email Notifications',
              value: settings.notifications.emailEnabled,
              isSwitch: true,
              onPress: () => updateSetting('notifications', 'emailEnabled', !settings.notifications.emailEnabled),
            })}
            {renderSettingsItem({
              icon: 'clock',
              title: 'Reservation Reminders',
              value: settings.notifications.reservationReminders,
              isSwitch: true,
              onPress: () => updateSetting('notifications', 'reservationReminders', !settings.notifications.reservationReminders),
            })}
          </>
        ))}

        {/* Appearance */}
        {renderSettingsSection('Appearance', (
          <>
            {renderSettingsItem({
              icon: 'theme-light-dark',
              title: 'Dark Mode',
              value: settings.appearance.darkMode,
              isSwitch: true,
              onPress: () => updateSetting('appearance', 'darkMode', !settings.appearance.darkMode),
            })}
            {renderSettingsItem({
              icon: 'format-size',
              title: 'Font Size',
              value: settings.appearance.fontSize,
              onPress: () => {
                const sizes = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(settings.appearance.fontSize);
                const nextSize = sizes[(currentIndex + 1) % sizes.length];
                updateSetting('appearance', 'fontSize', nextSize);
              },
            })}
          </>
        ))}

        {/* Support & About */}
        {renderSettingsSection('Support & About', (
          <>
            {renderSettingsItem({
              icon: 'help-circle',
              title: 'Help Center',
              onPress: () => navigation.navigate('HelpCenter'),
            })}
            {renderSettingsItem({
              icon: 'information',
              title: 'About',
              onPress: () => navigation.navigate('About'),
            })}
            {renderSettingsItem({
              icon: 'file-document',
              title: 'Terms of Service',
              onPress: () => navigation.navigate('Terms'),
            })}
            {renderSettingsItem({
              icon: 'shield-check',
              title: 'Privacy Policy',
              onPress: () => navigation.navigate('Privacy'),
            })}
          </>
        ))}

        {/* Logout
        <TouchableOpacity
          onPress={() => Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => dispatch({ type: 'LOGOUT' }) }
            ]
          )}
          style={tw`mx-4 mt-4`}
        >
          <Text style={tw`text-red-500 text-center font-medium text-lg`}>Logout</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Edit Profile Modal
      <Modal
        animationType="slide"
        transparent={false}
        visible={editProfileModalVisible}
        onRequestClose={() => setEditProfileModalVisible(false)}
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          <View style={tw`p-4 border-b border-gray-200 flex-row justify-between items-center`}>
            <TouchableOpacity onPress={() => setEditProfileModalVisible(false)}>
              <Text style={tw`text-gray-500`}>Cancel</Text>
            </TouchableOpacity>
            <Text style={tw`text-lg font-semibold`}>Edit Profile</Text>
            <TouchableOpacity onPress={handleUpdateProfile}>
              <Text style={tw`text-blue-500 font-medium`}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={tw`p-4`}>
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Full Name</Text>
              <TextInput
                value={profile.fullName}
                onChangeText={(text) => setProfile(prev => ({ ...prev, fullName: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Enter your full name"
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Email</Text>
              <TextInput
                value={profile.email}
                onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Phone</Text>
              <TextInput
                value={profile.phone}
                onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Bio</Text>
              <TextInput
                value={profile.bio}
                onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={4}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal> */}

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          <View style={tw`p-4 border-b border-gray-200 flex-row justify-between items-center`}>
            <TouchableOpacity onPress={() => setChangePasswordModalVisible(false)}>
              <Text style={tw`text-gray-500`}>Cancel</Text>
            </TouchableOpacity>
            <Text style={tw`text-lg font-semibold`}>Change Password</Text>
            <TouchableOpacity onPress={handleChangePassword}>
              <Text style={tw`text-blue-500 font-medium`}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={tw`p-4`}>
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Current Password</Text>
              <TextInput
                value={passwordForm.current}
                onChangeText={(text) => setPasswordForm(prev => ({ ...prev, current: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Enter current password"
                secureTextEntry
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>New Password</Text>
              <TextInput
                value={passwordForm.new}
                onChangeText={(text) => setPasswordForm(prev => ({ ...prev, new: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Enter new password"
                secureTextEntry
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 mb-2`}>Confirm New Password</Text>
              <TextInput
                value={passwordForm.confirm}
                onChangeText={(text) => setPasswordForm(prev => ({ ...prev, confirm: text }))}
                style={tw`bg-gray-100 p-4 rounded-lg`}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={tw`absolute inset-0 bg-black bg-opacity-50 items-center justify-center`}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
                  