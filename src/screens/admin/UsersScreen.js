import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const UsersScreen = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://reservationappserver.onrender.com/auth/all-profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state with the fetched users
        setAllUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again.');
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [token]); // Include token in the dependency array

  if (loading) {
    return (
      <LinearGradient colors={['#4338CA', '#4F46E5']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#4338CA', '#4F46E5']} style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.fullNames}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userInfo}>
              <Text style={styles.label}>Phone:</Text> {item.phone}
            </Text>
            <Text style={styles.userInfo}>
              <Text style={styles.label}>Address:</Text> {item.address}
            </Text>
            <Text style={styles.userInfo}>
              <Text style={styles.label}>Role:</Text> {item.role}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4F46E5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default UsersScreen;