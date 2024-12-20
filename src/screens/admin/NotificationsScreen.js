import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const [myNotifications, setMyNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form state for creating a new notification
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [expiry, setExpiry] = useState('');

  // Fetch notifications on component mount
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

  // Function to send a new notification
  const sendNotification = async () => {
    const notification = {
      user,
      message,
      type,
      link,
      expiry,
    };

    try {
      const response = await fetch('https://reservationappserver.onrender.com/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (response.ok) {
        // Refresh notifications after sending a new one
        fetchNotifications();
        setModalVisible(false);
        Alert.alert('Success', 'Notification sent successfully!');
      } else {
        Alert.alert('Error', 'Failed to send notification.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred: ' + error.message);
    }
  };

  // Function to fetch notifications (used after sending a new notification)
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
    }
  };

  // Render each notification in the list
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Button to open the modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Notification</Text>
      </TouchableOpacity>

      {/* List of notifications */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E88E5" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={myNotifications}
          keyExtractor={(item) => item._id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal for creating a new notification */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Create New Notification</Text>
          <TextInput
            style={styles.input}
            value={user}
            onChangeText={setUser}
            placeholder="User ID"
          />
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Message"
          />
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Type"
          />
          <TextInput
            style={styles.input}
            value={link}
            onChangeText={setLink}
            placeholder="Link"
          />
          <TextInput
            style={styles.input}
            value={expiry}
            onChangeText={setExpiry}
            placeholder="Expiry (YYYY-MM-DD)"
          />
          <Button title="Send Notification" onPress={sendNotification} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default NotificationsScreen;