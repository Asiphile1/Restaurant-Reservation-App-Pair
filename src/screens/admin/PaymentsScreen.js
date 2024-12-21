import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  // Dummy data for testing
  const dummyTransactions = [
    {
      _id: '1',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1235',
        date: '2023-10-01T10:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1236',
        name: 'Restaurant A',
      },
      amount: 150.0,
      paymentMethod: 'credit_card',
      status: 'pending',
      transactionId: 'TXN1234567890',
    },
    {
      _id: '2',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1237',
        date: '2023-10-02T12:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1238',
        name: 'Restaurant B',
      },
      amount: 200.0,
      paymentMethod: 'paypal',
      status: 'completed',
      transactionId: 'TXN1234567891',
    },
    {
      _id: '3',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1239',
        date: '2023-10-03T14:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1240',
        name: 'Restaurant C',
      },
      amount: 75.0,
      paymentMethod: 'bank_transfer',
      status: 'failed',
      transactionId: 'TXN1234567892',
    },
    {
      _id: '4',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1241',
        date: '2023-10-04T16:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1242',
        name: 'Restaurant D',
      },
      amount: 300.0,
      paymentMethod: 'paystack',
      status: 'pending',
      transactionId: 'TXN1234567893',
    },
    {
      _id: '5',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1243',
        date: '2023-10-05T18:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1244',
        name: 'Restaurant E',
      },
      amount: 120.0,
      paymentMethod: 'credit_card',
      status: 'completed',
      transactionId: 'TXN1234567894',
    },
    {
      _id: '6',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1245',
        date: '2023-10-06T20:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1246',
        name: 'Restaurant F',
      },
      amount: 90.0,
      paymentMethod: 'paypal',
      status: 'pending',
      transactionId: 'TXN1234567895',
    },
    {
      _id: '7',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1247',
        date: '2023-10-07T22:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1248',
        name: 'Restaurant G',
      },
      amount: 250.0,
      paymentMethod: 'bank_transfer',
      status: 'completed',
      transactionId: 'TXN1234567896',
    },
    {
      _id: '8',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1249',
        date: '2023-10-08T10:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1250',
        name: 'Restaurant H',
      },
      amount: 180.0,
      paymentMethod: 'paystack',
      status: 'failed',
      transactionId: 'TXN1234567897',
    },
    {
      _id: '9',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1251',
        date: '2023-10-09T12:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1252',
        name: 'Restaurant I',
      },
      amount: 100.0,
      paymentMethod: 'credit_card',
      status: 'pending',
      transactionId: 'TXN1234567898',
    },
    {
      _id: '10',
      user: '653f1234567890abcdef1234',
      booking: {
        _id: '653f1234567890abcdef1253',
        date: '2023-10-10T14:00:00Z',
      },
      restaurant: {
        _id: '653f1234567890abcdef1254',
        name: 'Restaurant J',
      },
      amount: 220.0,
      paymentMethod: 'paypal',
      status: 'completed',
      transactionId: 'TXN1234567899',
    },
  ];

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setTransactions(dummyTransactions);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  }, []);

  const totalTransactions = transactions.length;
  const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const handleConfirmPayment = (transaction) => {
    setSelectedTransaction(transaction);
    setConfirmModalVisible(true);
  };

  const handleMarkCompleted = () => {
    const updatedTransactions = transactions.map((item) =>
      item._id === selectedTransaction._id ? { ...item, status: 'completed' } : item
    );
    setTransactions(updatedTransactions);
    setConfirmModalVisible(false);
    setSelectedTransaction({});
    Alert.alert('Success', 'Payment marked as completed!');
  };

  const handleMarkFailed = () => {
    const updatedTransactions = transactions.map((item) =>
      item._id === selectedTransaction._id ? { ...item, status: 'failed' } : item
    );
    setTransactions(updatedTransactions);
    setConfirmModalVisible(false);
    setSelectedTransaction({});
    Alert.alert('Success', 'Payment marked as failed!');
  };

  const renderPaymentItem = ({ item }) => (
    <View style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-gray-800`}>{item.restaurant.name}</Text>
        <Text style={tw`text-gray-600`}>{new Date(item.booking.date).toLocaleDateString()}</Text>
        <Text style={tw`text-gray-600`}>${item.amount}</Text>
      </View>
      <Text
        style={tw`text-sm ${
          item.status === 'completed' ? 'text-green-500' : item.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
        }`}
      >
        {item.status}
      </Text>
      {item.status === 'pending' && (
        <TouchableOpacity onPress={() => handleConfirmPayment(item)}>
          <Ionicons name="checkmark-circle-outline" size={24} color="blue" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
      {loading && (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      )}
      {error && (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-red-500 text-lg`}>{error}</Text>
        </View>
      )}
      {!loading && !error && (
        <>
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Transactions</Text>
            <Text style={tw`text-gray-600`}>{totalTransactions}</Text>
          </View>
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Revenue</Text>
            <Text style={tw`text-gray-600`}>${totalRevenue.toFixed(2)}</Text>
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Recent Transactions</Text>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderPaymentItem}
            />
          </View>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={tw`flex-1 bg-white p-4`}>
          <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Confirm Payment</Text>
          {selectedTransaction && selectedTransaction.booking && (
            <Text style={tw`text-lg text-gray-700 mb-4`}>
              Confirm payment for transaction on {new Date(selectedTransaction.booking.date).toLocaleDateString()} for $
              {selectedTransaction.amount}?
            </Text>
          )}
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              onPress={handleMarkCompleted}
              style={tw`bg-green-500 p-4 rounded-lg w-1/2 mr-2`}
            >
              <Text style={tw`text-white text-center`}>Mark as Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleMarkFailed}
              style={tw`bg-red-500 p-4 rounded-lg w-1/2 ml-2`}
            >
              <Text style={tw`text-white text-center`}>Mark as Failed</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setConfirmModalVisible(false)}
            style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
          >
            <Text style={tw`text-gray-800 text-center`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentsScreen;