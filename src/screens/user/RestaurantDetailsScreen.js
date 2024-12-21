import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params; // Get the restaurant data from the route
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example reservation slots (can be fetched from an API)
  const reservationSlots = [
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: false },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
  ];

  // Handle reservation button press
  const handleReservation = () => {
    Alert.alert(
      'Reservation Confirmation',
      `Are you sure you want to reserve a table at ${restaurant.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', `Your reservation at ${restaurant.name} has been confirmed!`);
            navigation.goBack(); // Go back to the previous screen after confirmation
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>

      {/* Restaurant Image */}
      <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />

      {/* Restaurant Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>

      {/* Reservation Slots */}
      <View style={styles.reservationSection}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <FlatList
          data={reservationSlots}
          keyExtractor={(item) => item.time}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                item.available ? styles.availableTimeSlot : styles.unavailableTimeSlot,
              ]}
              onPress={() => item.available && handleReservation()}
              disabled={!item.available}
            >
              <Text style={styles.timeSlotText}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Reserve Button */}
      <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
        <Text style={styles.reserveButtonText}>Reserve Table</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    padding: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cuisine: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 5,
    color: '#777',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 16,
  },
  reservationSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  timeSlot: {
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableTimeSlot: {
    backgroundColor: '#C8E6C9',
  },
  unavailableTimeSlot: {
    backgroundColor: '#FFCDD2',
  },
  timeSlotText: {
    color: '#333',
  },
  reserveButton: {
    backgroundColor: '#1E88E5',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default RestaurantDetailsScreen;