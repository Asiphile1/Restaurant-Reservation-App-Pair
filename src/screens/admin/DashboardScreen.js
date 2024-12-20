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
import axios from 'axios';
import { useSelector } from 'react-redux';

const DashboardScreen = ({ navigation }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await axios.get('https://reservationappserver.onrender.com/auth/total-profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data.totalUsers);
        
        setMetrics({
          totalReservations: 120,
          activeUsers: usersResponse.data.totalUsers,
          pendingApprovals: 3,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const statsCards = [
    {
      title: 'Total Reservations',
      value: metrics?.totalReservations || 140,
      icon: 'calendar-outline',
    },
    {
      title: 'Pending Approvals',
      value: metrics?.pendingApprovals || 0,
      icon: 'time-outline',
    },
  ];

  const quickActions = [
    {
      title: 'Analytics',
      icon: 'analytics-outline',
      route: 'Analytics',
      description: 'View detailed reports',
    },
    {
      title: 'Manage Slots',
      icon: 'calendar-outline',
      route: 'ManageSlots',
      description: 'Schedule management',
    },
    {
      title: 'Users',
      icon: 'people-outline',
      route: 'Users',
      description: `Manage ${metrics?.activeUsers || 0} users`,
    },
    {
      title: 'Bookings',
      icon: 'book-outline',
      route: 'ManageBookings',
      description: 'Review reservations',
    },
    {
      title: 'Stores',
      icon: 'storefront-outline',
      route: 'ManageStores',
      description: 'Manage locations',
    },
    {
      title: 'Payments',
      icon: 'cash-outline',
      route: 'Payments',
      description: 'Transaction history',
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-gray-50 justify-center items-center`}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={tw`mt-4 text-gray-600 font-medium`}>Loading Dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1  bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      {/* Header */}
      <View style={tw`flex-row justify-between items-center p-4 pt-10 bg-white shadow-sm`}>
        <View>
          <Text style={tw`text-2xl font-bold text-gray-900`}>Dashboard</Text>
          <Text style={tw`text-sm text-gray-600`}>Welcome back, Admin</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={tw`w-12 h-12 bg-gray-100 rounded-full justify-center items-center`}
        >
          <Ionicons name="person-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={tw`flex-row flex-wrap justify-between px-4 py-6`}>
          {statsCards.map((stat, index) => (
            <View
              key={index}
              style={tw`bg-white p-4 rounded-xl mb-4 w-[48%] shadow-sm`}
            >
              <View style={tw`bg-indigo-50 w-10 h-10 rounded-full items-center justify-center mb-4`}>
                <Ionicons name={stat.icon} size={24} color="#4F46E5" />
              </View>
              <Text style={tw`text-2xl font-bold text-gray-900`}>{stat.value}</Text>
              <Text style={tw`text-gray-600 text-sm mt-1`}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions Grid */}
        <View style={tw`px-4 mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>Quick Actions</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.route)}
                style={tw`bg-white p-4 rounded-xl mb-4 w-[48%] shadow-sm border border-gray-100`}
              >
                <View style={tw`bg-indigo-50 w-10 h-10 rounded-full items-center justify-center mb-3`}>
                  <Ionicons name={action.icon} size={24} color="#4F46E5" />
                </View>
                <Text style={tw`text-gray-900 font-medium mb-1`}>{action.title}</Text>
                <Text style={tw`text-gray-500 text-xs`}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={tw`mx-4 mb-6 bg-white rounded-xl p-4 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>Recent Activity</Text>
          <View style={tw`space-y-4`}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 rounded-full bg-indigo-500 mr-4`} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-900 font-medium`}>New booking received</Text>
                  <Text style={tw`text-gray-500 text-sm`}>2 minutes ago</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;