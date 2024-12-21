import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookingsScreen = () => {
  const bookings = [
    {
      id: '1',
      restaurantName: 'The Gourmet Kitchen',
      date: '2024-12-15',
      time: '7:00 PM',
      status: 'Confirmed',
    },
    {
      id: '2',
      restaurantName: 'Sushi Paradise',
      date: '2024-12-16',
      time: '6:30 PM',
      status: 'Pending',
    },
    {
      id: '3',
      restaurantName: 'The Italian Bistro',
      date: '2024-12-17',
      time: '8:00 PM',
      status: 'Confirmed',
    },
  ];

  const renderBooking = ({ item }) => (
    <TouchableOpacity style={styles.bookingCard}>
      <View style={styles.iconContainer}>
        <Ionicons name="calendar" size={24} color="#1E88E5" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.dateTime}>
          {item.date} at {item.time}
        </Text>
        <Text style={[styles.status, item.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  confirmed: {
    color: '#4CAF50',
  },
  pending: {
    color: '#FF9800',
  },
});

export default BookingsScreen;