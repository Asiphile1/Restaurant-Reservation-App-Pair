import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ReservationsScreen = ({ route, navigation }) => {
  // Extract the reservation details from the route params
  const {
    restaurantName: initialRestaurantName,
    time: initialTime,
    date: initialDate,
    guests: initialGuests,
    specialRequest: initialSpecialRequest,
    restaurantImage: initialRestaurantImage,
  } = route.params || {};

  // State to hold the editable reservation details
  const [reservationDetails, setReservationDetails] = useState({
    restaurantName: initialRestaurantName || '',
    time: initialTime || '',
    date: initialDate || '',
    guests: initialGuests ? initialGuests.toString() : '', // Ensure guests is a string
    specialRequest: initialSpecialRequest || '',
  });

  // State to manage input validation
  const [errors, setErrors] = useState({});

  // State for Date and Time Pickers
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate || new Date()));
  const [selectedTime, setSelectedTime] = useState(new Date(initialTime || new Date()));

  // useEffect to initialize selectedDate and selectedTime
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
    }
    if (initialTime) {
      setSelectedTime(new Date(initialTime));
    }
  }, []);

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setReservationDetails({
      ...reservationDetails,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };

  // Function to validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!reservationDetails.date) {
      newErrors.date = 'Reservation date is required.';
    }

    if (!reservationDetails.time) {
      newErrors.time = 'Reservation time is required.';
    }

    if (!reservationDetails.guests) {
      newErrors.guests = 'Number of guests is required.';
    } else if (isNaN(reservationDetails.guests) || parseInt(reservationDetails.guests, 10) <= 0) {
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

    // Convert guests to a number
    const guestsNumber = parseInt(reservationDetails.guests, 10);
    const paymentPayload = {
      restaurantName: reservationDetails.restaurantName,
      date: reservationDetails.date,
      time: reservationDetails.time,
      guests: guestsNumber,
      specialRequest: reservationDetails.specialRequest,
    };

    // Navigate to PaymentScreen with the paymentPayload
    navigation.navigate('PaymentScreen', { reservationDetails: paymentPayload });
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setReservationDetails({
      ...reservationDetails,
      date: date.toISOString().split('T')[0],
    });
    setDatePickerVisibility(false);
  };

  // Function to handle time selection
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setReservationDetails({
      ...reservationDetails,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setTimePickerVisibility(false);
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

      <Text style={styles.title}>Custom Reservation</Text>

      {/* Restaurant Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={styles.input}
          value={reservationDetails.restaurantName}
          disabled
          placeholder="Enter restaurant name"
        />
      </View>

      {/* Reservation Date Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reservation Date</Text>
        <TouchableOpacity
          style={[styles.input, errors.date && styles.inputError]}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text>{reservationDetails.date || 'Select a date'}</Text>
        </TouchableOpacity>
        {errors.date && (
          <Text style={styles.errorText}>{errors.date}</Text>
        )}
      </View>

      {/* Reservation Time Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reservation Time</Text>
        <TouchableOpacity
          style={[styles.input, errors.time && styles.inputError]}
          onPress={() => setTimePickerVisibility(true)}
        >
          <Text>{reservationDetails.time || 'Select a time'}</Text>
        </TouchableOpacity>
        {errors.time && (
          <Text style={styles.errorText}>{errors.time}</Text>
        )}
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
        {errors.guests && (
          <Text style={styles.errorText}>{errors.guests}</Text>
        )}
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
        <Text style={styles.submitButtonText}>Make Reservation</Text>
      </TouchableOpacity>

      {/* Date and Time Pickers */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F9F9', // Light background
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 15, // Rounded corners
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark text
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555', // Slightly muted text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', // Light border
    borderRadius: 10, // Rounded corners
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff', // White background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // Shadow for Android
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
    backgroundColor: '#1E88E5', // Primary color
    padding: 15,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReservationsScreen;