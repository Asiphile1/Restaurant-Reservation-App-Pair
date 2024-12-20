// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   FlatList,
// //   TouchableOpacity,
// //   Modal,
// //   Alert,
// // } from 'react-native';
// // import tw from 'twrnc';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const PaymentsScreen = () => {
// //   // Example transactions data
// //   const [transactions, setTransactions] = useState([
// //     { id: 1, date: '2023-10-01', amount: 100, status: 'Pending' },
// //     { id: 2, date: '2023-10-02', amount: 200, status: 'Pending' },
// //     { id: 3, date: '2023-10-03', amount: 300, status: 'Completed' },
// //     { id: 4, date: '2023-10-04', amount: 400, status: 'Failed' },
// //   ]);

// //   // Modal states
// //   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
// //   const [selectedTransaction, setSelectedTransaction] = useState(null);

// //   // Calculate total transactions and revenue
// //   const totalTransactions = transactions.length;
// //   const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

// //   // Handle confirming payment
// //   const handleConfirmPayment = (transaction) => {
// //     setSelectedTransaction(transaction);
// //     setConfirmModalVisible(true);
// //   };

// //   // Handle marking payment as completed
// //   const handleMarkCompleted = () => {
// //     const updatedTransactions = transactions.map((item) =>
// //       item.id === selectedTransaction.id ? { ...item, status: 'Completed' } : item
// //     );
// //     setTransactions(updatedTransactions);
// //     setConfirmModalVisible(false);
// //     setSelectedTransaction(null);
// //     Alert.alert('Success', 'Payment marked as completed!');
// //   };

// //   // Handle marking payment as failed
// //   const handleMarkFailed = () => {
// //     const updatedTransactions = transactions.map((item) =>
// //       item.id === selectedTransaction.id ? { ...item, status: 'Failed' } : item
// //     );
// //     setTransactions(updatedTransactions);
// //     setConfirmModalVisible(false);
// //     setSelectedTransaction(null);
// //     Alert.alert('Success', 'Payment marked as failed!');
// //   };

// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-white p-4`}>
// //       {/* Total Transactions */}
// //       <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
// //         <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Transactions</Text>
// //         <Text style={tw`text-gray-600`}>{totalTransactions}</Text>
// //       </View>

// //       {/* Total Revenue */}
// //       <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
// //         <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Revenue</Text>
// //         <Text style={tw`text-gray-600`}>${totalRevenue}</Text>
// //       </View>

// //       {/* Transaction List */}
// //       <View style={tw`mb-4`}>
// //         <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Recent Transactions</Text>
// //         <FlatList
// //           data={transactions}
// //           keyExtractor={(item) => item.id.toString()}
// //           renderItem={({ item }) => (
// //             <View style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
// //               <View>
// //                 <Text style={tw`text-gray-800`}>{item.date}</Text>
// //                 <Text style={tw`text-gray-600`}>${item.amount}</Text>
// //               </View>
// //               <Text
// //                 style={tw`text-sm ${
// //                   item.status === 'Completed' ? 'text-green-500' : item.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
// //                 }`}
// //               >
// //                 {item.status}
// //               </Text>
// //               {/* Confirm Payment Button */}
// //               {item.status === 'Pending' && (
// //                 <TouchableOpacity onPress={() => handleConfirmPayment(item)}>
// //                   <Ionicons name="checkmark-circle-outline" size={24} color="blue" />
// //                 </TouchableOpacity>
// //               )}
// //             </View>
// //           )}
// //         />
// //       </View>

// //       {/* Confirm Payment Modal */}
// //       <Modal
// //         animationType="slide"
// //         transparent={false}
// //         visible={confirmModalVisible}
// //         onRequestClose={() => setConfirmModalVisible(false)}
// //       >
// //         <View style={tw`flex-1 bg-white p-4`}>
// //           <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Confirm Payment</Text>
// //           <Text style={tw`text-lg text-gray-700 mb-4`}>
// //             Confirm payment for transaction on {selectedTransaction?.date} for ${selectedTransaction?.amount}?
// //           </Text>

// //           {/* Action Buttons */}
// //           <View style={tw`flex-row justify-between`}>
// //             <TouchableOpacity
// //               onPress={handleMarkCompleted}
// //               style={tw`bg-green-500 p-4 rounded-lg w-1/2 mr-2`}
// //             >
// //               <Text style={tw`text-white text-center`}>Mark as Completed</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               onPress={handleMarkFailed}
// //               style={tw`bg-red-500 p-4 rounded-lg w-1/2 ml-2`}
// //             >
// //               <Text style={tw`text-white text-center`}>Mark as Failed</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* Cancel Button */}
// //           <TouchableOpacity
// //             onPress={() => setConfirmModalVisible(false)}
// //             style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
// //           >
// //             <Text style={tw`text-gray-800 text-center`}>Cancel</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </Modal>
// //     </SafeAreaView>
// //   );
// // };

// // export default PaymentsScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import tw from 'twrnc';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const PaymentsScreen = () => {
//   // State to store payments
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal states
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const token = useSelector(state => state.auth.token)

//   // Fetch payments from the server
//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await axios.get('http://192.168.18.2:4050/payment/pay', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`, // Replace with your auth token
//           },
//         });
//         console.log('token', token)

//         if (response.status === 200) {
//           setTransactions(response.data.payments); // Assuming the server returns an array of payments
//         } else {
//           setError('Failed to fetch payments. Please try again later.');
//         }
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError('There was an issue fetching your payments. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   // Calculate total transactions and revenue
//   const totalTransactions = transactions.length || 0;
//   const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

//   // Handle confirming payment
//   const handleConfirmPayment = (transaction) => {
//     setSelectedTransaction(transaction);
//     setConfirmModalVisible(true);
//   };

//   // Handle marking payment as completed
//   const handleMarkCompleted = () => {
//     const updatedTransactions = transactions.map((item) =>
//       item._id === selectedTransaction._id ? { ...item, status: 'Completed' } : item
//     );
//     setTransactions(updatedTransactions);
//     setConfirmModalVisible(false);
//     setSelectedTransaction(null);
//     Alert.alert('Success', 'Payment marked as completed!');
//   };

//   // Handle marking payment as failed
//   const handleMarkFailed = () => {
//     const updatedTransactions = transactions.map((item) =>
//       item._id === selectedTransaction._id ? { ...item, status: 'Failed' } : item
//     );
//     setTransactions(updatedTransactions);
//     setConfirmModalVisible(false);
//     setSelectedTransaction(null);
//     Alert.alert('Success', 'Payment marked as failed!');
//   };

//   // Render each payment item
//   const renderPaymentItem = ({ item }) => (
//     <View style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
//       <View>
//         <Text style={tw`text-gray-800`}>{item.restaurant.name}</Text>
//         <Text style={tw`text-gray-600`}>{new Date(item.booking.date).toLocaleDateString()}</Text>
//         <Text style={tw`text-gray-600`}>${item.amount}</Text>
//       </View>
//       <Text
//         style={tw`text-sm ${
//           item.status === 'Completed' ? 'text-green-500' : item.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
//         }`}
//       >
//         {item.status}
//       </Text>
//       {/* Confirm Payment Button */}
//       {item.status === 'Pending' && (
//         <TouchableOpacity onPress={() => handleConfirmPayment(item)}>
//           <Ionicons name="checkmark-circle-outline" size={24} color="blue" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white p-4`}>
//       {/* Loading State */}
//       {loading && (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="#1E88E5" />
//         </View>
//       )}

//       {/* Error State */}
//       {error && (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <Text style={tw`text-red-500 text-lg`}>{error}</Text>
//         </View>
//       )}

//       {/* Total Transactions */}
//       {!loading && !error && (
//         <>
//           <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//             <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Transactions</Text>
//             <Text style={tw`text-gray-600`}>{totalTransactions}</Text>
//           </View>

//           {/* Total Revenue */}
//           <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
//             <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Total Revenue</Text>
//             <Text style={tw`text-gray-600`}>${totalRevenue}</Text>
//           </View>

//           {/* Transaction List */}
//           <View style={tw`mb-4`}>
//             <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Recent Transactions</Text>
//             <FlatList
//               data={transactions}
//               keyExtractor={(item) => item._id.toString()}
//               renderItem={renderPaymentItem}
//             />
//           </View>
//         </>
//       )}

//       {/* Confirm Payment Modal */}
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={confirmModalVisible}
//         onRequestClose={() => setConfirmModalVisible(false)}
//       >
//         <View style={tw`flex-1 bg-white p-4`}>
//           <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Confirm Payment</Text>
//           <Text style={tw`text-lg text-gray-700 mb-4`}>
//             Confirm payment for transaction on {selectedTransaction?.booking.date} for ${selectedTransaction?.amount}?
//           </Text>

//           {/* Action Buttons */}
//           <View style={tw`flex-row justify-between`}>
//             <TouchableOpacity
//               onPress={handleMarkCompleted}
//               style={tw`bg-green-500 p-4 rounded-lg w-1/2 mr-2`}
//             >
//               <Text style={tw`text-white text-center`}>Mark as Completed</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={handleMarkFailed}
//               style={tw`bg-red-500 p-4 rounded-lg w-1/2 ml-2`}
//             >
//               <Text style={tw`text-white text-center`}>Mark as Failed</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Cancel Button */}
//           <TouchableOpacity
//             onPress={() => setConfirmModalVisible(false)}
//             style={tw`bg-gray-300 p-4 rounded-lg mt-4`}
//           >
//             <Text style={tw`text-gray-800 text-center`}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default PaymentsScreen;

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
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://192.168.18.2:4050/payment/pay', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('token', token);

        if (response.status === 200 && Array.isArray(response.data.payments)) {
          setTransactions(response.data.payments);
        } else {
          setTransactions([]);
          // setError('Failed to fetch payments. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        setTransactions([]);
        setError('There was an issue fetching your payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalTransactions = Array.isArray(transactions) ? transactions.length : 0;
  const totalRevenue = Array.isArray(transactions)
    ? transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    : 0;

  const handleConfirmPayment = (transaction) => {
    setSelectedTransaction(transaction);
    setConfirmModalVisible(true);
  };

  const handleMarkCompleted = () => {
    const updatedTransactions = transactions.map((item) =>
      item._id === selectedTransaction._id ? { ...item, status: 'Completed' } : item
    );
    setTransactions(updatedTransactions);
    setConfirmModalVisible(false);
    setSelectedTransaction({});
    Alert.alert('Success', 'Payment marked as completed!');
  };

  const handleMarkFailed = () => {
    const updatedTransactions = transactions.map((item) =>
      item._id === selectedTransaction._id ? { ...item, status: 'Failed' } : item
    );
    setTransactions(updatedTransactions);
    setConfirmModalVisible(false);
    setSelectedTransaction({});
    Alert.alert('Success', 'Payment marked as failed!');
  };

  const renderPaymentItem = ({ item }) => (
    <View style={tw`bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-gray-800`}>{item.restaurant?.name}</Text>
        <Text style={tw`text-gray-600`}>{new Date(item.booking?.date).toLocaleDateString()}</Text>
        <Text style={tw`text-gray-600`}>${item.amount}</Text>
      </View>
      <Text
        style={tw`text-sm ${
          item.status === 'Completed' ? 'text-green-500' : item.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
        }`}
      >
        {item.status}
      </Text>
      {item.status === 'Pending' && (
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
            <Text style={tw`text-gray-600`}>${totalRevenue}</Text>
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
              Confirm payment for transaction on {selectedTransaction.booking.date} for ${selectedTransaction.amount}?
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