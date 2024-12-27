import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentCard = ({ payment, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Payment',
      'Are you sure you want to delete this payment record?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => onDelete(payment._id),
          style: 'destructive'
        },
      ]
    );
  };

  return (
    <View style={tw`bg-white rounded-xl mb-4 p-4 shadow-sm border border-gray-100`}>
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>
            {payment.restaurant?.name || 'Unknown Restaurant'}
          </Text>
          <Text style={tw`text-sm text-gray-500 mt-1`}>
            {new Date(payment.booking?.date).toLocaleDateString()}
          </Text>
          <Text style={tw`text-lg font-bold mt-2 text-gray-900`}>
            ${payment.amount?.toFixed(2) || '0.00'}
          </Text>
          <Text style={tw`${getStatusColor(payment.status)} text-sm mt-1 font-medium`}>
            {payment.status}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={handleDelete}
          style={tw`p-2`}
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PaymentsScreen = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reservationappserver.onrender.com/payment/admin/payments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paymentId) => {
    console.log('Deleting payment:', paymentId);
    if (!paymentId) return;
  
    const deleteBooking = async () => {
      setIsLoading(true);
      try {
        const { isConnected } = await NetInfo.fetch();
        if (!isConnected) throw new Error('offline');
  
        await axios.delete(
          `https://reservationappserver.onrender.com/payment/admin/payments/${paymentId}`
        );
  
        setPayments(prev => prev.filter(payment => payment._id !== paymentId));
        Alert.alert('Success', 'Booking deleted');
  
      } catch (err) {
        const errors = {
          offline: 'Please check your connection',
          404: 'Booking not found',
          403: 'Permission denied',
          401: 'Please login again',
          ECONNABORTED: 'Request timed out'
        };
  
        Alert.alert('Error', errors[err.response?.status || err.code || err.message] || 'Failed to delete');
        console.error('Delete failed:', err);
      }
      setIsLoading(false);
    };
  
    Alert.alert(
      'Delete Booking',
      'This action cannot be undone',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteBooking }
      ]
    );
  };

  const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center p-4`}>
        <Text style={tw`text-red-500 text-center`}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-4`}>
        {/* Stats Cards */}
        <View style={tw`flex-row mb-6`}>
          <View style={tw`flex-1 bg-white p-4 rounded-xl mr-2 shadow-sm border border-gray-100`}>
            <Text style={tw`text-sm text-gray-600`}>Total Transactions</Text>
            <Text style={tw`text-xl font-bold text-gray-900 mt-1`}>{payments.length}</Text>
          </View>
          <View style={tw`flex-1 bg-white p-4 rounded-xl ml-2 shadow-sm border border-gray-100`}>
            <Text style={tw`text-sm text-gray-600`}>Total Revenue</Text>
            <Text style={tw`text-xl font-bold text-gray-900 mt-1`}>${totalRevenue.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payments List */}
        <FlatList
          data={payments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <PaymentCard payment={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={
            <Text style={tw`text-gray-500 text-center mt-4`}>No payments available</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentsScreen;