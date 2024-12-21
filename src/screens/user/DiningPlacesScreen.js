import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DiningPlacesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const diningPlaces = [
    {
      id: '1',
      name: 'The Gourmet Kitchen',
      cuisine: 'Italian',
      rating: 4.5,
      image: 'https://example.com/gourmet-kitchen.jpg',
      categories: ['Italian', 'Casual'],
    },
    {
      id: '2',
      name: 'Sushi Paradise',
      cuisine: 'Japanese',
      rating: 4.8,
      image: 'https://example.com/sushi-paradise.jpg',
      categories: ['Japanese', 'Fine Dining'],
    },
    {
      id: '3',
      name: 'The Italian Bistro',
      cuisine: 'Italian',
      rating: 4.2,
      image: 'https://example.com/italian-bistro.jpg',
      categories: ['Italian', 'Casual'],
    },
    {
      id: '4',
      name: 'Burger Joint',
      cuisine: 'American',
      rating: 4.0,
      image: 'https://example.com/burger-joint.jpg',
      categories: ['American', 'Fast Food'],
    },
  ];

  const categories = ['Italian', 'Japanese', 'American', 'Casual', 'Fine Dining'];

  const filteredDiningPlaces = diningPlaces.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || place.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const renderDiningPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.diningPlaceCard}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>Image</Text>
      </View>
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
      {/* Header */}
      <Text style={styles.header}>Dining Places</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dining places..."
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
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dining Places List */}
      <FlatList
        data={filteredDiningPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderDiningPlace}
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  },
  categoryChip: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: '#1E88E5',
  },
  categoryText: {
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  diningPlaceCard: {
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
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    color: '#777',
    fontSize: 12,
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
});

export default DiningPlacesScreen;