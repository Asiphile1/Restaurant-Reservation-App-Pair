import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AnalyticsScreen = () => {
  const [users, setUsers] = useState(0); // State for user count
  const [loading, setLoading] = useState(true); // Loading state
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await axios.get('https://reservationappserver.onrender.com/auth/total-profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data.totalUsers || 16); // Use 16 as fallback if API fails

        setMetrics({
          totalReservations: 120,
          activeUsers: usersResponse.data.totalUsers || 16,
          pendingApprovals: 3,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setUsers(16); // Fallback to 16 users if API fails
        setMetrics({
          totalReservations: 120,
          activeUsers: 16,
          pendingApprovals: 3,
        });
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Example data for charts
  const [reservationTrendsData, setReservationTrendsData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 150, 180, 200, 220, 250],
      },
    ],
  });

  // Example metrics
  const [metrics, setMetrics] = useState({
    totalReservations: 1200,
    activeUsers: 500,
    averageReservationsPerDay: 20,
  });

  // User Activity Data for BarChart
  const userActivityData = {
    labels: ['Users'],
    datasets: [
      {
        data: [users], // Use the fetched or assumed user count
      },
    ],
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg text-gray-600`}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Analytics</Text>

      {/* Key Metrics */}
      <View style={tw`flex-row justify-between mb-6`}>
        {/* Total Reservations */}
        <View style={tw`bg-white p-4 rounded-lg w-1/3 items-center shadow-md`}>
          <Text style={tw`text-lg font-semibold text-blue-600`}>Total Reservations</Text>
          <Text style={tw`text-gray-600 text-lg`}>{metrics.totalReservations}</Text>
        </View>

        {/* Active Users */}
        <View style={tw`bg-white p-4 rounded-lg w-1/3 items-center shadow-md`}>
          <Text style={tw`text-lg font-semibold text-green-600`}>Active Users</Text>
          <Text style={tw`text-gray-600 text-lg`}>{metrics.activeUsers}</Text>
        </View>

        {/* Avg. Reservations/Day */}
        <View style={tw`bg-white p-4 rounded-lg w-1/3 items-center shadow-md`}>
          <Text style={tw`text-lg font-semibold text-yellow-600`}>Avg. Reservations/Day</Text>
          <Text style={tw`text-gray-600 text-lg`}>{metrics.averageReservationsPerDay}</Text>
        </View>
      </View>

      {/* Reservation Trends */}
      <View style={tw`bg-gray-100 p-4 rounded-lg mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}>Reservation Trends</Text>
        <LineChart
          data={reservationTrendsData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              stroke: '#e0e0e0',
              strokeWidth: 1,
            },
          }}
          bezier
          style={tw`rounded-lg`}
        />
      </View>

      {/* User Activity */}
      <View style={tw`bg-gray-100 p-4 rounded-lg mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}>User Activity</Text>
        <BarChart
          data={userActivityData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: '#e0e0e0',
              strokeWidth: 1,
            },
          }}
          style={tw`rounded-lg`}
        />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;