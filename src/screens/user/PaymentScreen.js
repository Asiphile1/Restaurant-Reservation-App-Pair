// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import PaystackWebView from 'react-native-paystack-webview'; // Correct import

// const PaymentScreen = ({ route, navigation }) => {
//   // Extract reservation details from the route params
//   const { reservationDetails } = route.params;

//   // State to manage payment status
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [showPaystackModal, setShowPaystackModal] = useState(false); // State to control Paystack modal visibility

//   // Paystack public key (replace with your actual public key)
//   const PAYSTACK_PUBLIC_KEY = 'pk_test_17302dd9e2e7cefbd79e9509b2b217dc5428c2d2'; // Use your Paystack public key

//   // Function to handle payment submission
//   const handlePaymentSubmit = () => {
//     // Trigger Paystack payment modal
//     setShowPaystackModal(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payment Details</Text>

//       {/* Display Reservation Summary */}
//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryText}>
//           <Text style={styles.boldText}>Restaurant:</Text>{' '}
//           {reservationDetails.restaurantName}
//         </Text>
//         <Text style={styles.summaryText}>
//           <Text style={styles.boldText}>Date:</Text> {reservationDetails.date}
//         </Text>
//         <Text style={styles.summaryText}>
//           <Text style={styles.boldText}>Time:</Text> {reservationDetails.time}
//         </Text>
//         <Text style={styles.summaryText}>
//           <Text style={styles.boldText}>Guests:</Text> {reservationDetails.guests}
//         </Text>
//         {reservationDetails.specialRequest && (
//           <Text style={styles.summaryText}>
//             <Text style={styles.boldText}>Special Request:</Text>{' '}
//             {reservationDetails.specialRequest}
//           </Text>
//         )}
//       </View>

//       {/* Paystack Payment Integration */}
//       {showPaystackModal && (
//         <PaystackWebView
//           paystackKey={PAYSTACK_PUBLIC_KEY}
//           amount={20000} // Amount in kobo (e.g., 20000 = ₦200)
//           billingEmail="asiphilexoli@gmail.com" // Customer's email
//           billingName="Asiphile Xoli" // Customer's name
//           activityIndicatorColor="green"
//           currency="ZAR" // Currency (e.g., ZAR for South African Rand)
//           onCancel={(e) => {
//             setShowPaystackModal(false); // Hide Paystack modal
//             Alert.alert('Payment Cancelled', 'You cancelled the payment.');
//           }}
//           onSuccess={(res) => {
//             setShowPaystackModal(false); // Hide Paystack modal
//             setPaymentSuccess(true);
//             Alert.alert('Payment Successful', 'Your payment was successful!');
//             navigation.navigate('HomeScreen', {
//               message: 'Payment successful! Your reservation is confirmed.',
//             });
//           }}
//           autoStart={true} // Automatically start payment when modal is shown
//         />
//       )}

//       {/* Payment Button */}
//       <TouchableOpacity
//         style={styles.paymentButton}
//         onPress={handlePaymentSubmit}
//       >
//         <Text style={styles.paymentButtonText}>Confirm Payment</Text>
//       </TouchableOpacity>

//       {/* Payment Success Message */}
//       {paymentSuccess && (
//         <Text style={styles.successMessage}>
//           Payment successful! Your reservation is confirmed.
//         </Text>
//       )}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   summaryText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   paymentButton: {
//     backgroundColor: '#1E88E5',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   paymentButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   successMessage: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'green',
//     textAlign: 'center',
//   },
// });

// export default PaymentScreen;

import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Platform 
} from 'react-native';
import PaystackWebView from 'react-native-paystack-webview';

const PaymentScreen = ({ route, navigation }) => {
  // Extract reservation details from the route params
  const { reservationDetails } = route.params;

  // State management
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);

  // Configuration
  const PAYSTACK_PUBLIC_KEY = Platform.select({
    ios: process.env.IOS_PAYSTACK_PUBLIC_KEY,
    android: process.env.ANDROID_PAYSTACK_PUBLIC_KEY,
    default: 'pk_test_placeholder_key'
  });

  // Dynamic Fee Calculation
  const calculateReservationFee = useCallback(() => {
    const BASE_FEE = 200; // Base reservation fee
    const GUEST_MULTIPLIER = 50; // Additional fee per guest

    const totalFee = BASE_FEE + (reservationDetails.guests * GUEST_MULTIPLIER);
    return totalFee * 100; // Convert to kobo
  }, [reservationDetails.guests]);

  // Payment Submission Handler
  const handlePaymentSubmit = () => {
    // Validate reservation details before payment
    if (!reservationDetails.restaurantName) {
      Alert.alert('Error', 'Invalid reservation details');
      return;
    }

    setShowPaystackModal(true);
  };

  // Success Handler
  const handlePaymentSuccess = (res) => {
    setShowPaystackModal(false);
    setPaymentSuccess(true);

    // Log transaction details (you might want to send this to your backend)
    console.log('Transaction Reference:', res.transactionRef);

    Alert.alert(
      'Payment Successful', 
      'Your reservation is confirmed!',
      [{ 
        text: 'OK', 
        onPress: () => navigation.navigate('HomeScreen', {
          message: 'Payment successful! Your reservation is confirmed.'
        }) 
      }]
    );
  };

  // Cancel Handler
  const handlePaymentCancel = () => {
    setShowPaystackModal(false);
    Alert.alert(
      'Payment Cancelled', 
      'You cancelled the payment process.',
      [{ text: 'OK' }]
    );
  };

  // Error Handler
  const handlePaymentError = (error) => {
    setShowPaystackModal(false);
    console.error('Payment Error:', error);
    Alert.alert(
      'Payment Failed', 
      'There was an issue processing your payment. Please try again.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* Reservation Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>Restaurant:</Text>{' '}
          {reservationDetails.restaurantName}
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>Date:</Text> {reservationDetails.date}
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>Time:</Text> {reservationDetails.time}
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>Guests:</Text> {reservationDetails.guests}
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>Total Fee:</Text> R{calculateReservationFee() / 100}
        </Text>
        {reservationDetails.specialRequest && (
          <Text style={styles.summaryText}>
            <Text style={styles.boldText}>Special Request:</Text>{' '}
            {reservationDetails.specialRequest}
          </Text>
        )}
      </View>

      {/* Paystack Payment Integration */}
      {showPaystackModal && (
        <PaystackWebView
          paystackKey={PAYSTACK_PUBLIC_KEY}
          amount={calculateReservationFee()} 
          billingEmail="user@example.com" // Replace with actual user email
          billingName="User Name" // Replace with actual user name
          activityIndicatorColor="green"
          currency="ZAR"
          onCancel={handlePaymentCancel}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          autoStart={true}
        />
      )}

      {/* Payment Button */}
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={handlePaymentSubmit}
      >
        <Text style={styles.paymentButtonText}>
          Confirm Payment (R{calculateReservationFee() / 100})
        </Text>
      </TouchableOpacity>

      {/* Payment Success Message */}
      {paymentSuccess && (
        <Text style={styles.successMessage}>
          Payment successful! Your reservation is confirmed.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
});

export default PaymentScreen;