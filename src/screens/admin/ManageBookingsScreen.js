// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import tw from 'twrnc';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const ManageBookingsScreen = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         console.log('Token:', token); // Log the token for debugging
//         const response = await axios.get('http://localhost:4050/bookings', { // Use 10.0.2.2 for Android emulator
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data.bookings, 'API response'); // Log the API response for debugging

//         // Ensure bookings is always an array
//         if (Array.isArray(response.data.bookings)) {
//           setBookings(response.data.bookings);
//         } else {
//           console.error('API response is not an array:', response.data, response.data.bookings); // Log detailed error information
//           setBookings([]); // Fallback to an empty array
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error); // Log detailed error information
//         setError('Failed to fetch bookings. Please try again later.');
//       } finally {
//         setLoading(false); // Stop loading regardless of success or failure
//       }
//     };

//     fetchBookings();
//   }, [token]);

//   // Function to handle booking actions (Accept/Deny)
//   const handleBookingAction = (id, action) => {
//     const updatedBookings = bookings.map((booking) =>
//       booking._id === id ? { ...booking, status: action } : booking // Use _id instead of id
//     );
//     setBookings(updatedBookings);
//     Alert.alert('Success', `Booking ${action === 'accepted' ? 'accepted' : 'denied'} successfully!`);
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={tw`mt-2 text-gray-800`}>Loading bookings...</Text>
//       </View>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <Text style={tw`text-red-500 text-lg`}>{error}</Text>
//       </View>
//     );
//   }

//   // Render bookings list
//   return (
//     <ScrollView style={tw`flex-1 bg-white p-4`}>
//       <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Manage Bookings</Text>

//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <View key={booking._id} style={tw`bg-gray-100 p-4 rounded-lg mb-4`}> {/* Use _id instead of id */}
//             <Text style={tw`text-lg font-semibold text-gray-800`}>
//               {booking.restaurant.name} - {booking.date} at {booking.time}
//             </Text>
//             <Text style={tw`text-sm text-gray-600 mb-2`}>
//               Guests: {booking.guests} | Status: {booking.status}
//             </Text>

//             {/* Actions (Accept/Deny) */}
//             <View style={tw`flex-row justify-end`}>
//               <TouchableOpacity
//                 onPress={() => handleBookingAction(booking._id, 'accepted')} // Use _id instead of id
//                 style={tw`bg-green-500 p-2 rounded-lg mr-2`}
//               >
//                 <Text style={tw`text-white`}>Accept</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleBookingAction(booking._id, 'denied')} // Use _id instead of id
//                 style={tw`bg-red-500 p-2 rounded-lg`}
//               >
//                 <Text style={tw`text-white`}>Deny</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))
//       ) : (
//         <Text style={tw`text-gray-600 text-center`}>No bookings available.</Text>
//       )}
//     </ScrollView>
//   );
// };

// export default ManageBookingsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ManageBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        console.log('Token:', token); // Log the token for debugging

        const response = await axios.get('https://reservationappserver.onrender.com/bookings/admin/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Full response:', response); // Log the full response for debugging

        // Ensure bookings is always an array
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
          if (response.data.bookings.length === 0) {
            console.warn('No bookings found in the API response.'); // Log a warning if bookings array is empty
          }
        } else {
          console.error('API response is not an array:', response.data);
          setBookings([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching bookings:', error); // Log detailed error information
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchBookings();
  }, [token]);

  // Function to handle booking actions (Accept/Deny)
  const handleBookingAction = (id, action) => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === id ? { ...booking, status: action } : booking // Use _id instead of id
    );
    setBookings(updatedBookings);
    Alert.alert('Success', `Booking ${action === 'accepted' ? 'accepted' : 'denied'} successfully!`);
  };

  // Render loading state
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-2 text-gray-800`}>Loading bookings...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500 text-lg`}>{error}</Text>
      </View>
    );
  }

  // Render bookings list
  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Manage Bookings</Text>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <View key={booking._id} style={tw`bg-gray-100 p-4 rounded-lg mb-4`}> {/* Use _id instead of id */}
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              {booking.restaurant.name} - {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </Text>
            <Text style={tw`text-sm text-gray-600 mb-2`}>
              Guests: {booking.guests} | Status: {booking.status}
            </Text>

            {/* Actions (Accept/Deny) */}
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => handleBookingAction(booking._id, 'accepted')} // Use _id instead of id
                style={tw`bg-green-500 p-2 rounded-lg mr-2`}
              >
                <Text style={tw`text-white`}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBookingAction(booking._id, 'denied')} // Use _id instead of id
                style={tw`bg-red-500 p-2 rounded-lg`}
              >
                <Text style={tw`text-white`}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={tw`text-gray-600 text-center`}>No bookings available.</Text>
      )}
    </ScrollView>
  );
};

export default ManageBookingsScreen;