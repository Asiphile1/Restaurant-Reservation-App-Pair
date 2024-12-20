// import React, { useState, useCallback, useMemo } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
// } from 'react-native';
// import tw from 'twrnc';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { selectUser, selectIsAuthenticated, selectLoading } from '../../state/slices/authSlice';

// // Validation Utilities
// const ValidationUtils = {
//   validateDate: (dateString) => {
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!regex.test(dateString)) return false;

//     const date = new Date(dateString);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     return date instanceof Date && !isNaN(date) && date >= today;
//   },

//   validateTime: (timeString) => {
//     const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
//     return regex.test(timeString);
//   },

//   sanitizeRestaurantName: (name) => {
//     return name.trim().replace(/\s+/g, ' ');
//   },
// };

// const AddReservationScreen = ({ navigation, route }) => {
//   // Defensive initialization of restaurants
//   const restaurants = useMemo(() => {
//     const routeRestaurants = route.params?.restaurants;
//     return Array.isArray(routeRestaurants) ? routeRestaurants : [];
//   }, [route.params]);

//   // Form state
//   const [formState, setFormState] = useState({
//     restaurantName: '',
//     selectedDate: '',
//     selectedTime: '',
//     guests: '1',
//   });

//   const [validationErrors, setValidationErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Redux state
//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const isUserLoading = useSelector(selectLoading);

//   // Update form state with validation
//   const updateFormState = useCallback(
//     (key, value) => {
//       setFormState((prev) => ({ ...prev, [key]: value }));

//       // Clear specific field error when user starts typing
//       if (validationErrors[key]) {
//         setValidationErrors((prev) => {
//           const updated = { ...prev };
//           delete updated[key];
//           return updated;
//         });
//       }
//     },
//     [validationErrors]
//   );

//   // Validate the entire form
//   const validateForm = useCallback(() => {
//     const errors = {};
//     const { restaurantName, selectedDate, selectedTime, guests } = formState;

//     if (!restaurantName || restaurantName.trim().length < 2) {
//       errors.restaurantName = 'Please enter a valid restaurant name';
//     }

//     if (!selectedDate || !ValidationUtils.validateDate(selectedDate)) {
//       errors.selectedDate = 'Please enter a valid future date (YYYY-MM-DD)';
//     }

//     if (!selectedTime || !ValidationUtils.validateTime(selectedTime)) {
//       errors.selectedTime = 'Please enter a valid time (HH:MM)';
//     }

//     if (!guests || isNaN(guests) || guests < 1 || guests > 20) {
//       errors.guests = 'Number of guests must be between 1 and 20';
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [formState]);

//   // Reset form to initial state
//   const resetForm = useCallback(() => {
//     setFormState({
//       restaurantName: '',
//       selectedDate: '',
//       selectedTime: '',
//       guests: '1',
//     });
//     setValidationErrors({});
//   }, []);

//   // Handle reservation creation
//   const handleAddReservation = useCallback(async () => {
//     Keyboard.dismiss();

//     if (!isAuthenticated) {
//       Alert.alert('Authentication Required', 'Please log in to make a reservation.');
//       return;
//     }

//     if (isUserLoading) {
//       Alert.alert('Loading', 'Please wait while we fetch your profile.');
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const { restaurantName, selectedDate, selectedTime, guests } = formState;

//     const sanitizedName = ValidationUtils.sanitizeRestaurantName(restaurantName);
//     const restaurant = restaurants.find(
//       (r) => ValidationUtils.sanitizeRestaurantName(r.name) === sanitizedName
//     );

//     if (!restaurant) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         restaurantName: 'Restaurant not found. Please choose from available restaurants.',
//       }));
//       return;
//     }

//     const reservationData = {
//       user: user._id,
//       restaurant: restaurant._id,
//       date: new Date(selectedDate).toISOString(),
//       time: selectedTime,
//       guests: parseInt(guests, 10),
//       status: 'confirmed',
//     };

//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         `http://localhost:4050/restaurants/${restaurant._id}/reservations`,
//         reservationData
//       );

//       if (response.status === 201) {
//         Alert.alert(
//           'Reservation Successful',
//           'Your reservation has been created.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 resetForm();
//                 navigation.goBack();
//               },
//             },
//           ]
//         );
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || 'Failed to create reservation. Please try again.';
//       Alert.alert('Reservation Error', errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [formState, isAuthenticated, user, restaurants, navigation, resetForm, validateForm, isUserLoading]);

//   // Render input field with validation error handling
//   const renderInput = (label, key, placeholderText, keyboardType = 'default', maxLength) => (
//     <View style={tw`mb-4`}>
//       <Text style={tw`mb-2 text-gray-700`}>{label}</Text>
//       <TextInput
//         value={formState[key].toString()}
//         onChangeText={(text) => updateFormState(key, text)}
//         placeholder={placeholderText}
//         keyboardType={keyboardType}
//         maxLength={maxLength}
//         style={[
//           tw`p-3 border rounded-lg bg-white`,
//           validationErrors[key] ? tw`border-red-500` : tw`border-gray-300`,
//         ]}
//       />
//       {validationErrors[key] && (
//         <Text style={tw`text-red-500 mt-1 text-xs`}>{validationErrors[key]}</Text>
//       )}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={tw`flex-1`}
//     >
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={tw`p-4`}
//       >
//         <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Create Reservation</Text>

//         {renderInput('Restaurant Name', 'restaurantName', 'Enter restaurant name', 'default')}

//         {renderInput('Date (YYYY-MM-DD)', 'selectedDate', 'YYYY-MM-DD', 'numeric', 10)}

//         {renderInput('Time (HH:MM)', 'selectedTime', 'HH:MM', 'numeric', 5)}

//         {renderInput('Number of Guests', 'guests', '1', 'numeric')}

//         <TouchableOpacity
//           onPress={handleAddReservation}
//           disabled={isLoading}
//           style={tw`bg-blue-500 p-4 rounded-lg ${isLoading ? 'opacity-50' : ''}`}
//         >
//           <Text style={tw`text-white text-center font-semibold`}>
//             {isLoading ? 'Creating Reservation...' : 'Add Reservation'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddReservationScreen;

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, selectLoading } from '../../state/slices/authSlice';

// Validation Utilities
const ValidationUtils = {
  validateDate: (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date instanceof Date && !isNaN(date) && date >= today;
  },

  validateTime: (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  },
};

const AddReservationScreen = ({ navigation, route }) => {
  // Defensive initialization of restaurants
  const restaurants = useMemo(() => {
    const routeRestaurants = route.params?.restaurants;
    return Array.isArray(routeRestaurants) ? routeRestaurants : [];
  }, [route.params]);

  // Form state
  const [formState, setFormState] = useState({
    restaurantName: '',
    selectedDate: '',
    selectedTime: '',
    guests: '1',
    category: '', // Add category field
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux state
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isUserLoading = useSelector(selectLoading);

  // Update form state with validation
  const updateFormState = useCallback(
    (key, value) => {
      setFormState((prev) => ({ ...prev, [key]: value }));

      // Clear specific field error when user starts typing
      if (validationErrors[key]) {
        setValidationErrors((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }
    },
    [validationErrors]
  );

  // Validate the entire form
  const validateForm = useCallback(() => {
    const errors = {};
    const { restaurantName, selectedDate, selectedTime, guests, category } = formState;

    if (!restaurantName) {
      errors.restaurantName = 'Please enter a restaurant name';
    }

    if (!selectedDate || !ValidationUtils.validateDate(selectedDate)) {
      errors.selectedDate = 'Please enter a valid future date (YYYY-MM-DD)';
    }

    if (!selectedTime || !ValidationUtils.validateTime(selectedTime)) {
      errors.selectedTime = 'Please enter a valid time (HH:MM)';
    }

    if (!guests || isNaN(guests) || guests < 1 || guests > 20) {
      errors.guests = 'Number of guests must be between 1 and 20';
    }

    if (!category) {
      errors.category = 'Please select a category';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormState({
      restaurantName: '',
      selectedDate: '',
      selectedTime: '',
      guests: '1',
      category: '',
    });
    setValidationErrors({});
  }, []);

  // Handle reservation creation
  const handleAddReservation = useCallback(async () => {
    Keyboard.dismiss();

    if (!isAuthenticated) {
      Alert.alert('Authentication Required', 'Please log in to make a reservation.');
      return;
    }

    if (isUserLoading) {
      Alert.alert('Loading', 'Please wait while we fetch your profile.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const { restaurantName, selectedDate, selectedTime, guests, category } = formState;

    const reservationData = {
      user: user._id,
      restaurant: restaurantName, // Allow any restaurant name
      date: new Date(selectedDate).toISOString(),
      time: selectedTime,
      guests: parseInt(guests, 10),
      category, // Include category in the reservation data
      status: 'confirmed',
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://reservationappserver.onrender.com/reservations`, 
        reservationData
      );

      if (response.status === 201) {
        Alert.alert(
          'Reservation Successful',
          'Your reservation has been created.',
          [
            {
              text: 'OK',
              onPress: () => {
                resetForm();
                navigation.goBack();
              },
            },
          ]
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to create reservation. Please try again.';
      Alert.alert('Reservation Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formState, isAuthenticated, user, navigation, resetForm, validateForm, isUserLoading]);

  // Render input field with validation error handling
  const renderInput = (label, key, placeholderText, keyboardType = 'default', maxLength) => (
    <View style={tw`mb-4`}>
      <Text style={tw`mb-2 text-gray-700`}>{label}</Text>
      <TextInput
        value={formState[key].toString()}
        onChangeText={(text) => updateFormState(key, text)}
        placeholder={placeholderText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={[
          tw`p-3 border rounded-lg bg-white`,
          validationErrors[key] ? tw`border-red-500` : tw`border-gray-300`,
        ]}
      />
      {validationErrors[key] && (
        <Text style={tw`text-red-500 mt-1 text-xs`}>{validationErrors[key]}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`p-4`}
      >
        <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Create Reservation</Text>

        {renderInput('Restaurant Name', 'restaurantName', 'Enter restaurant name', 'default')}

        {renderInput('Date (YYYY-MM-DD)', 'selectedDate', 'YYYY-MM-DD', 'numeric', 10)}

        {renderInput('Time (HH:MM)', 'selectedTime', 'HH:MM', 'numeric', 5)}

        {renderInput('Number of Guests', 'guests', '1', 'numeric')}

        {/* Dropdown for Categories */}
        <View style={tw`mb-4`}>
          <Text style={tw`mb-2 text-gray-700`}>Category</Text>
          <Picker
            selectedValue={formState.category}
            onValueChange={(itemValue) => updateFormState('category', itemValue)}
            style={tw`border rounded-lg bg-white`}
          >
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Italian" value="Italian" />
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Mexican" value="Mexican" />
            <Picker.Item label="Indian" value="Indian" />
            <Picker.Item label="American" value="American" />
          </Picker>
          {validationErrors.category && (
            <Text style={tw`text-red-500 mt-1 text-xs`}>{validationErrors.category}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleAddReservation}
          disabled={isLoading}
          style={tw`bg-blue-500 p-4 rounded-lg ${isLoading ? 'opacity-50' : ''}`}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            {isLoading ? 'Creating Reservation...' : 'Add Reservation'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddReservationScreen;