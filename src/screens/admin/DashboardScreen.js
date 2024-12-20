import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { StatusBar } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  // Example state for dynamic data
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchMetrics = () => {
      setTimeout(() => {
        setMetrics({
          totalReservations: 120,
          activeUsers: 50,
          pendingApprovals: 3,
        });
        setLoading(false);
      }, 1500); // Simulating API delay
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white justify-center items-center`}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={tw`mt-4 text-gray-600`}>Loading Dashboard...</Text>
      </SafeAreaView>
    );
  }

  // Quick Actions configuration
  const quickActions = [
    { 
      title: 'View Analytics', 
      icon: 'analytics-outline', 
      color: 'bg-gray-800', 
      route: 'Analytics' 
    },
    { 
      title: 'Manage Slots', 
      icon: 'calendar-outline', 
      color: 'bg-gray-700', 
      route: 'ManageSlots' 
    },
    { 
      title: 'Add Reservation', 
      icon: 'add-circle-outline', 
      color: 'bg-gray-600', 
      route: 'AddReservation' 
    },
    { 
      title: 'Manage Bookings', 
      icon: 'book-outline', 
      color: 'bg-gray-500', 
      route: 'ManageBookings' 
    },
    { 
      title: 'Manage Stores', 
      icon: 'storefront-outline', 
      color: 'bg-gray-400', 
      route: 'ManageStores' 
    },
    { 
      title: 'Payments', 
      icon: 'cash-outline', 
      color: 'bg-gray-300', 
      route: 'Payments' 
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      {/* Header Section */}
      <View style={tw`flex-row justify-between items-center p-4 bg-white shadow-sm`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Dashboard</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={tw`p-2 rounded-full`}
        >
          <Ionicons name="person-circle-outline" size={36} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={tw`flex-1`}
      >
        {/* Key Metrics Section */}
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-semibold mb-4 text-gray-800`}>Overview</Text>
          <View style={tw`flex-row justify-between`}>
            {/* Total Reservations */}
            <View style={tw`bg-white p-4 rounded-lg flex-1 items-center shadow-sm`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>{metrics.totalReservations}</Text>
              <Text style={tw`text-sm text-gray-600`}>Reservations</Text>
            </View>
            {/* Active Users */}
            <View style={tw`bg-white p-4 rounded-lg flex-1 items-center shadow-sm`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>{metrics.activeUsers}</Text>
              <Text style={tw`text-sm text-gray-600`}>Active Users</Text>
            </View>
            {/* Pending Approvals */}
            <View style={tw`bg-white p-4 rounded-lg flex-1 items-center shadow-sm`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>{metrics.pendingApprovals}</Text>
              <Text style={tw`text-sm text-gray-600`}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Insights Section */}
        <View style={tw`p-4 bg-white rounded-lg mx-4 my-2 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Insights</Text>
          <Text style={tw`text-sm text-gray-600`}>Placeholder for interactive charts or other insights.</Text>
        </View>

        {/* Quick Actions */}
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-semibold mb-4 text-gray-800`}>Quick Actions</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.route)}
                style={tw`${action.color} p-4 rounded-lg mb-4 w-[48%] flex-row items-center justify-center`}
              >
                <Ionicons 
                  name={action.icon} 
                  size={20} 
                  color="white" 
                  style={tw`mr-2`} 
                />
                <Text style={tw`text-white text-center`}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;