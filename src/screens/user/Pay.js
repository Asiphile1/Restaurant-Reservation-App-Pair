// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// // import axios from 'axios';
// // import PaystackWebView from 'react-native-paystack-webview';

// // const Pay = ({ route, navigation }) => {
// //   // Extract paymentData and token from route params
// //   const { paymentData, token } = route.params;

// //   // State to track payment success
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);

// //   // Paystack public key (replace with your actual public key)
// //   const PAYSTACK_PUBLIC_KEY = 'pk_test_17302dd9e2e7cefbd79e9509b2b217dc5428c2d2';

// //   // Handle payment success
// //   const handlePaymentSuccess = async (response) => {
// //     try {
// //       // Log the Paystack response
// //       console.log('Paystack Response:', response);

// //       // Prepare payment data to send to the backend
// //       const backendPaymentData = {
// //         ...paymentData,
// //         transactionId: response.transactionRef, // Use Paystack's transaction reference
// //       };

//     //   // Send payment data to the backend
//     //   const backendResponse = await axios.post(
//     //     'http://192.168.18.2:4050/payment/pay',
//     //     backendPaymentData,
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`, // Use the token for authentication
//     //       },
//     //     }
//     //   );

// //       // Log the backend response
// //       console.log('Backend Response:', backendResponse.data);

// //       // Handle successful backend response
// //       if (backendResponse.status === 200) {
// //         setPaymentSuccess(true);
// //         Alert.alert(
// //           'Payment Successful',
// //           'Your reservation is confirmed!',
// //           [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
// //         );
// //       } else {
// //         Alert.alert('Error', 'Payment failed. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Backend Payment Error:', error);
// //       Alert.alert('Error', 'Payment failed. Please try again.');
// //     }
// //   };

// //   // Handle payment cancel
// //   const handlePaymentCancel = () => {
// //     Alert.alert('Payment Cancelled', 'You cancelled the payment process.');
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Complete Payment</Text>

// //       {/* Paystack Payment Integration */}
// //       <PaystackWebView
// //         paystackKey={PAYSTACK_PUBLIC_KEY}
// //         amount={paymentData.amount * 100} // Convert to kobo
// //         billingEmail="asiphilexoli@gmail.com" // Replace with user's email
// //         billingName="Asiphile" // Replace with user's name
// //         currency="ZAR"
// //         onCancel={handlePaymentCancel}
// //         onSuccess={handlePaymentSuccess}
// //         autoStart={true}
// //       />

// //       {/* Payment Success Message */}
// //       {paymentSuccess && (
// //         <View style={styles.successContainer}>
// //           <Text style={styles.successMessage}>Payment Successful!</Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // // Styles
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#F7F9FC',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     color: '#333',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   successContainer: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   successMessage: {
// //     fontSize: 18,
// //     color: '#4CAF50',
// //     fontWeight: '600',
// //   },
// // });

// // export default Pay;

// import React, { useRef } from 'react';
// import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
// import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
// // import { EXPO_PAYSTACK_KEY } from "@env"
// import axios from 'axios';


//       // Send payment data to the backend
//     //   const backendResponse = await axios.post(
//     //     'http://192.168.18.2:4050/payment/pay',
//     //     backendPaymentData,
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`, // Use the token for authentication
//     //       },
//     //     }
//     //   );

//       const EXPO_PAYSTACK_KEY = 'pk_test_17302dd9e2e7cefbd79e9509b2b217dc5428c2d2'
// const Pay = ({ amount }) => {
//   const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

//   return (
//     <View style={{flex: 1}}>
//       <Paystack
//         paystackKey={EXPO_PAYSTACK_KEY}
//         billingEmail="asiphilexoli@gmail.com"
//         billingName='Xoli'
//         currency="ZAR"
//         amount={Number(amount) / 100}
//         onCancel={(e) => {
//             console.log(e)
//         }}
//         onSuccess={(res) => {
//             console.log(res)
//         }}
//         ref={paystackWebViewRef}
//       />

//         <View style={styles.payWrapper}>
//         <TouchableOpacity style={styles.payButton} onPress={()=> paystackWebViewRef.current.startTransaction()}>
//           <Text style={styles.buttonText}>{'Pay'}</Text>
//         </TouchableOpacity>
//         </View>
//       </View>
//   );
// }
// const styles = StyleSheet.create({
//     payButton:{
//         width: 300,
//         height: 60,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'green',
//         borderRadius: 10,
//     },
//     buttonText:{
//         // textAlign: 'center',
//         // fontSize: 16,
//         color: '#fff',
        
//     },
//     payWrapper:{
//         width: '100%'
//     }

// })
// export default Pay;

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Paystack, paystackProps } from 'react-native-paystack-webview';

const Pay = ({ route, navigation }) => {
  // Extract paymentData and token from route params
  const { paymentData, token } = route.params;

  // State to track payment success
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Paystack public key (replace with your actual public key)
  const PAYSTACK_PUBLIC_KEY = 'pk_test_17302dd9e2e7cefbd79e9509b2b217dc5428c2d2';

  // Reference for Paystack WebView
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  // Handle payment success
  const handlePaymentSuccess = async (response) => {
    try {
      // Log the Paystack response
      console.log('Paystack Response:', response);

      // Prepare payment data to send to the backend
      const backendPaymentData = {
        ...paymentData,
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
    <View style={styles.container}>
      <Text style={styles.title}>Complete Payment</Text>

      {/* Paystack Payment Integration */}
      <Paystack
        paystackKey={PAYSTACK_PUBLIC_KEY}
        amount={paymentData.amount * 100} // Convert to kobo
        billingEmail="asiphilexoli@gmail.com" // Replace with user's email
        billingName="Asiphile" // Replace with user's name
        currency="ZAR"
        onCancel={handlePaymentCancel}
        onSuccess={handlePaymentSuccess}
        ref={paystackWebViewRef}
      />

      {/* Payment Success Message */}
      {paymentSuccess && (
        <View style={styles.successContainer}>
          <Text style={styles.successMessage}>Payment Successful!</Text>
        </View>
      )}

      {/* Pay Button */}
      <View style={styles.payWrapper}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => paystackWebViewRef.current.startTransaction()}
        >
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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
  payWrapper: {
    width: '100%',
    marginTop: 20,
  },
  payButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Pay;