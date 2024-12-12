import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { LineChart, BarChart } from 'react-native-chart-kit';

const AnalyticsScreen = () => {
  // Example data for charts
  const [reservationTrendsData, setReservationTrendsData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 150, 180, 200, 220, 250],
      },
    ],
  });

  const [userActivityData, setUserActivityData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [50, 60, 70, 80, 90, 100, 110],
      },
    ],
  });

  // Example metrics
  const [metrics, setMetrics] = useState({
    totalReservations: 1200,
    activeUsers: 500,
    averageReservationsPerDay: 20,
  });

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Analytics</Text>

      {/* Key Metrics */}
      <View style={tw`flex-row justify-between mb-4`}>
        <View style={tw`bg-blue-100 p-4 rounded-lg w-1/3 items-center`}>
          <Text style={tw`text-lg font-semibold text-blue-600`}>Total Reservations</Text>
          <Text style={tw`text-gray-600`}>{metrics.totalReservations}</Text>
        </View>
        <View style={tw`bg-green-100 p-4 rounded-lg w-1/3 items-center`}>
          <Text style={tw`text-lg font-semibold text-green-600`}>Active Users</Text>
          <Text style={tw`text-gray-600`}>{metrics.activeUsers}</Text>
        </View>
        <View style={tw`bg-yellow-100 p-4 rounded-lg w-1/3 items-center`}>
          <Text style={tw`text-lg font-semibold text-yellow-600`}>Avg. Reservations/Day</Text>
          <Text style={tw`text-gray-600`}>{metrics.averageReservationsPerDay}</Text>
        </View>
      </View>

      {/* Reservation Trends */}
      <View style={tw`bg-blue-100 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-blue-600`}>Reservation Trends</Text>
        <LineChart
          data={reservationTrendsData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={tw`rounded-lg`}
        />
      </View>

      {/* User Activity */}
      <View style={tw`bg-green-100 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-green-600`}>User Activity</Text>
        <BarChart
          data={userActivityData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#00e676',
            backgroundGradientFrom: '#69f0ae',
            backgroundGradientTo: '#b2ff59',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={tw`rounded-lg`}
        />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;