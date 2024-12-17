import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

const ReservationsScreen = ({ route, navigation }) => {
  // Extract the reservation details from the route params
  const {
    restaurantName: initialRestaurantName,
    time: initialTime,
    date: initialDate,
    guests: initialGuests,
    specialRequest: initialSpecialRequest,
    restaurantImage: initialRestaurantImage, // Add restaurant image
  } = route.params || {};

  // State to hold the editable reservation details
  const [reservationDetails, setReservationDetails] = useState({
    restaurantName: initialRestaurantName || '',
    time: initialTime || '',
    date: initialDate || '',
    guests: initialGuests || '',
    specialRequest: initialSpecialRequest || '',
  });

  // State to manage input validation
  const [errors, setErrors] = useState({});

  // State for Date Picker
  // const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State for Time Picker
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setReservationDetails({
      ...reservationDetails,
      [field]: value,
    });

    // Clear errors for the field when the user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  // Function to validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!reservationDetails.restaurantName) {
      newErrors.restaurantName = 'Restaurant name is required.';
    }

    if (!reservationDetails.time) {
      newErrors.time = 'Reservation time is required.';
    }

    if (!reservationDetails.date) {
      newErrors.date = 'Reservation date is required.';
    }

    if (!reservationDetails.guests) {
      newErrors.guests = 'Number of guests is required.';
    } else if (isNaN(reservationDetails.guests) || reservationDetails.guests <= 0) {
      newErrors.guests = 'Please enter a valid number of guests.';
    }

    return newErrors;
  };

  // Function to handle the reservation submission
  const handleReservationSubmit = () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Show confirmation alert
    Alert.alert(
      'Reservation Updated',
      `You've updated your reservation at ${reservationDetails.restaurantName} for ${reservationDetails.date} at ${reservationDetails.time} with ${reservationDetails.guests} guests. Special Request: ${reservationDetails.specialRequest || 'None'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to the previous screen
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setReservationDetails({
      ...reservationDetails,
      date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
    });
    setShow(false);
  };

  // Function to handle time selection
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setReservationDetails({
      ...reservationDetails,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time as HH:MM AM/PM
    });
    setShow(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Restaurant Image */}
      {initialRestaurantImage && (
        <Image
          source={{ uri: initialRestaurantImage }}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.title}>Edit Reservation</Text>

      {/* Restaurant Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={[styles.input, errors.restaurantName && styles.inputError]}
          value={reservationDetails.restaurantName}
          readOnly
          onChangeText={(text) => handleInputChange('restaurantName', text)}
          placeholder="Enter restaurant name"
        />
        {errors.restaurantName ? (
          <Text style={styles.errorText}>{errors.restaurantName}</Text>
        ) : null}
      </View>

      {/* Reservation Date Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reservation Date</Text>
        <TouchableOpacity
          style={[styles.input, errors.date && styles.inputError]}
          onPress={() => setShow(true)}
        >
          <Text>{reservationDetails.date || 'Select a date'}</Text>
        </TouchableOpacity>
        {errors.date ? (
          <Text style={styles.errorText}>{errors.date}</Text>
        ) : null}
      </View>

      {/* Reservation Time Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reservation Time</Text>
        <TouchableOpacity
          style={[styles.input, errors.time && styles.inputError]}
          onPress={() => setShow(true)}
        >
          <Text>{reservationDetails.time || 'Select a time'}</Text>
        </TouchableOpacity>
        {errors.time ? (
          <Text style={styles.errorText}>{errors.time}</Text>
        ) : null}
      </View>

      {/* Number of Guests Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Guests</Text>
        <TextInput
          style={[styles.input, errors.guests && styles.inputError]}
          value={reservationDetails.guests}
          onChangeText={(text) => handleInputChange('guests', text)}
          placeholder="Enter number of guests"
          keyboardType="numeric"
        />
        {errors.guests ? (
          <Text style={styles.errorText}>{errors.guests}</Text>
        ) : null}
      </View>

      {/* Special Request Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Special Request</Text>
        <TextInput
          style={styles.input}
          value={reservationDetails.specialRequest}
          onChangeText={(text) => handleInputChange('specialRequest', text)}
          placeholder="Enter any special requests (optional)"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleReservationSubmit}
      >
        <Text style={styles.submitButtonText}>Update Reservation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E88E5',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReservationsScreen;