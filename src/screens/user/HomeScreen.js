import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';

// Restaurant Detail Modal Component
const RestaurantDetailModal = ({ restaurant, visible, onClose, onReserve, navigation }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
  
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      // You can send the token to your server to store it and use it to send notifications
    };
  
    registerForPushNotificationsAsync();
  
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
  
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (!restaurant) {
    return null;
  }

  const handleReservation = () => {
    navigation.navigate('ReservationsScreen', {
      restaurantName: restaurant.name,
      time: selectedTime,
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Image
            source={{ uri: restaurant.image }}
            style={styles.modalImage}
            resizeMode="cover"
          />

          <Text style={styles.modalTitle}>{restaurant.name}</Text>
          <Text style={styles.modalSubtitle}>{restaurant.location}</Text>

          <Text style={styles.descriptionText}>{restaurant.description}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="pricetag" size={20} color="#777" />
              <Text style={styles.detailText}>
                Price: {restaurant.averagePrice}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.detailText}>
                {restaurant.averageRating} ({restaurant.totalReviews} reviews)
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="restaurant" size={20} color="#777" />
              <Text style={styles.detailText}>
                Available Tables: {restaurant.capacity}
              </Text>
            </View>
          </View>

          <View style={styles.timeSlotsContainer}>
            {restaurant.reservationSlots?.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  slot.available && styles.availableTimeSlot,
                  selectedTime === slot.time && styles.selectedTimeSlot,
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text style={styles.timeSlotText}>{slot.time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReservation}
          >
            <Text style={styles.reserveButtonText}>Reserve Table</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// HomeScreen Component
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // New notifications state

  const username = useSelector(state => state.auth.user.fullNames);
  const categories = ['Seafood', 'Romantic', 'Fast Food', 'Casual', 'Innovative'];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://reservationappserver.onrender.com/restaurants');
        setRestaurants(response.data.restaurants || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        (restaurant.categories &&
          restaurant.categories.some(
            (category) => category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
          ));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, restaurants]);

  const handleRestaurantPress = (restaurant) => {
    if (!restaurant) {
      console.error('Selected restaurant is undefined');
      return;
    }
    setSelectedRestaurant(restaurant);
    setIsDetailModalVisible(true);
  };

  const handleReservation = (reservationDetails) => {
    Alert.alert(
      'Reservation Confirmed',
      `You've reserved a table at ${reservationDetails.restaurantName} for ${reservationDetails.time}`,
      [{ text: 'OK' }]
    );
  };

  const handleNotificationPress = () => {
    setHasNewNotifications(false); // Clear the notification indicator
    navigation.navigate('Notifications');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#444" />
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
      <LinearGradient
        colors={['#444', '#444']}
        style={styles.header}
      >
        <StatusBar barStyle="light-content" backgroundColor="#444" />
        <View>
        <Text style={styles.WelcomeText}>Home</Text>
        <Text style={styles.headerTitle}>Welcome Back, {username || 'Guest'}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={handleNotificationPress}
          >
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            {hasNewNotifications && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#777"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cuisine..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Restaurants List */}
      <ScrollView contentContainerStyle={styles.restaurantsContainer}>
        {filteredRestaurants.length === 0 ? (
          <Text style={styles.noResultsText}>No restaurants found.</Text>
        ) : (
          filteredRestaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantCard}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                <View style={styles.restaurantTags}>
                  {restaurant.tags?.map((tag, index) => (
                    <Text key={index} style={styles.tagBadge}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {restaurant.averageRating} ({restaurant.totalReviews})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          visible={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
          onReserve={handleReservation}
          navigation={navigation}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  WelcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    padding: 10,
    position: 'relative',
  },
  settingsIcon: {
    padding: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 4,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  categoriesContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  categoryChip: {
    backgroundColor: '#444',
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedCategoryChip: {
    backgroundColor: '#4F46E599',
  },
  categoryText: {
    color: '#fff',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  restaurantsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  restaurantInfo: {
    flex: 1,
    padding: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantCuisine: {
    color: '#777',
  },
  restaurantTags: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tagBadge: {
    backgroundColor: '#444',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 5,
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00000099',
    borderRadius: 50,
    padding: 5,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  modalSubtitle: {
    color: '#777',
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 10,
    color: '#333',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlot: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  availableTimeSlot: {
    backgroundColor: '#C8E6C9',
  },
  selectedTimeSlot: {
    backgroundColor: '#444',
  },
  timeSlotText: {
    color: '#333',
  },
  reserveButton: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
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
  noResultsText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
});

export default HomeScreen;