import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const [myNotifications, setMyNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://reservationappserver.onrender.com/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setMyNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`https://reservationappserver.onrender.com/notifications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }

      // Update the local state to remove the deleted notification
      setMyNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );

      Alert.alert('Success', 'Notification deleted successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNotification(id),
        },
      ]
    );
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationCard}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={24} color="#1E88E5" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.message}</Text>
        <Text style={styles.type}>Type: {item.type}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
        {item.link && (
          <Text style={styles.link}>Link: {item.link}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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

  if (myNotifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notifications found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myNotifications}
        keyExtractor={(item) => item._id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  link: {
    fontSize: 12,
    color: '#1E88E5',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  deleteButton: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default NotificationsScreen;