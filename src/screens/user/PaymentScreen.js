import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { CreditCard, Calendar, Clock, Users, MessageSquare } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {
  // State to track payment process
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Safely extract reservation details
  const reservationDetails = route?.params?.reservationDetails || {};

  // Validate and sanitize reservation details
  const safeReservationDetails = {
    restaurantName: reservationDetails.restaurantName || 'Unknown Restaurant',
    date: reservationDetails.date || '',
    time: reservationDetails.time || '',
    guests: parseInt(reservationDetails.guests || '1', 10),
    specialRequest: reservationDetails.specialRequest || '',
  };

  // Get the user ID and token from Redux state
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  // Paystack public key (replace with your actual public key)
  const PAYSTACK_PUBLIC_KEY = 'pk_test_17302dd9e2e7cefbd79e9509b2b217dc5428c2d2';

  // Reference for Paystack WebView
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  // Dynamic Fee Calculation with safety checks
  const calculateReservationFee = useCallback(() => {
    const BASE_FEE = 200; // Base reservation fee
    const GUEST_MULTIPLIER = 50; // Additional fee per guest
    const guests = Math.max(1, safeReservationDetails.guests); // Ensure at least 1 guest

    return BASE_FEE + guests * GUEST_MULTIPLIER;
  }, [safeReservationDetails.guests]);

  // Validate details before payment
  useEffect(() => {
    if (!safeReservationDetails.restaurantName) {
      Alert.alert(
        'Invalid Reservation',
        'Please check your reservation details and try again.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [safeReservationDetails.restaurantName, navigation]);

  // Handle payment success
  const handlePaymentSuccess = async (response) => {
    try {
      // Log the Paystack response
      console.log('Paystack Response:', response);

      // Prepare payment data to send to the backend
      const backendPaymentData = {
        user: userId, // Use the user ID from Redux
        booking: '614c3f5d7a3d7a0012345679', // Replace with actual booking ID
        restaurant: '614c3f5d7a3d7a001234567a', // Replace with actual restaurant ID
        amount: calculateReservationFee(),
        paymentMethod: 'paystack', // Replace with actual payment method
        transactionId: response.transactionRef, // Use Paystack's transaction reference
      };

      // Send payment data to the backend
      const backendResponse = await axios.post(
        'http://192.168.18.2:4050/payment/pay',
        backendPaymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authentication
          },
        }
      );

      // Log the backend response
      console.log('Backend Response:', backendResponse.data);

      // Handle successful backend response
      if (backendResponse.status === 200) {
        setPaymentSuccess(true);
        Alert.alert(
          'Payment Successful',
          'Your reservation is confirmed!',
          [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
        );
      } else {
        Alert.alert('Error', 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Backend Payment Error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  };

  // Handle payment cancel
  const handlePaymentCancel = () => {
    Alert.alert('Payment Cancelled', 'You cancelled the payment process.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reservation Payment</Text>
        </View>

        {/* Reservation Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.restaurantName}>{safeReservationDetails.restaurantName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Calendar color="#1E88E5" size={24} />
            <Text style={styles.detailText}>{safeReservationDetails.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Clock color="#4CAF50" size={24} />
            <Text style={styles.detailText}>{safeReservationDetails.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Users color="#FF9800" size={24} />
            <Text style={styles.detailText}>{safeReservationDetails.guests} Guests</Text>
          </View>

          {safeReservationDetails.specialRequest && (
            <View style={styles.detailRow}>
              <MessageSquare color="#9C27B0" size={24} />
              <Text style={styles.detailText}>{safeReservationDetails.specialRequest}</Text>
            </View>
          )}
        </View>

        {/* Payment Summary */}
        <View style={styles.paymentSummary}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Reservation Fee</Text>
            <Text style={styles.paymentAmount}>R{calculateReservationFee().toFixed(2)}</Text>
          </View>
        </View>

        {/* Paystack Payment Integration */}
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          amount={calculateReservationFee()}
          billingEmail="asiphilexoli@gmail.com" // Replace with user's email
          billingName="Asiphile" // Replace with user's name
          currency="ZAR"
          onCancel={handlePaymentCancel}
          onSuccess={handlePaymentSuccess}
          ref={paystackWebViewRef}
        />

        {/* Payment Button */}
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => paystackWebViewRef.current.startTransaction()}
        >
          <CreditCard color="white" size={24} />
          <Text style={styles.paymentButtonText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Payment Success Message */}
        {paymentSuccess && (
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>Payment Successful!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  summaryHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E88E5',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 5,
  },
  detailText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
  },
  paymentSummary: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#333',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5',
  },
  paymentButton: {
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 10,
  },
  successContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default PaymentScreen;