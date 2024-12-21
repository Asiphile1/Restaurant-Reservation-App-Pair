import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Example data for favorites (replace with actual data from your state or API)
  useEffect(() => {
    setFavorites([
      {
        id: '1',
        name: 'The Gourmet Kitchen',
        cuisine: 'Italian',
        rating: 4.5,
        image: 'https://example.com/gourmet-kitchen.jpg',
        description: 'A cozy Italian restaurant with a wide variety of pasta and pizza options.',
      },
      {
        id: '2',
        name: 'Sushi Paradise',
        cuisine: 'Japanese',
        rating: 4.8,
        image: 'https://example.com/sushi-paradise.jpg',
        description: 'A premium sushi restaurant offering fresh and authentic Japanese cuisine.',
      },
      {
        id: '3',
        name: 'Burger Joint',
        cuisine: 'American',
        rating: 4.0,
        image: 'https://example.com/burger-joint.jpg',
        description: 'A casual burger place with a variety of mouth-watering burgers and fries.',
      },
    ]);
  }, []);

  // Function to remove a favorite
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
    setModalVisible(false);
    Alert.alert('Success', 'Restaurant removed from favorites!');
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => {
        setSelectedRestaurant(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.cuisine}>{item.cuisine}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet. Add some restaurants to your favorites!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal for Restaurant Details and Actions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedRestaurant?.name}</Text>
            <Image
              source={{ uri: selectedRestaurant?.image }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <Text style={styles.modalDescription}>{selectedRestaurant?.description}</Text>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.removeButton]}
                onPress={() => removeFavorite(selectedRestaurant?.id)}
              >
                <Text style={styles.buttonText}>Remove from Favorites</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cuisine: {
    fontSize: 14,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  removeButton: {
    backgroundColor: '#FF5252',
  },
  closeButton: {
    backgroundColor: '#1E88E5',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;