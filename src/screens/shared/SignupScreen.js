// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import tw from 'twrnc';
// import { useDispatch, useSelector } from 'react-redux';
// import { signup } from '../../state/slices/authSlice';

// const ValidationUtils = {
//   validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase()),
//   validatePhone: (phone) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.replace(/[\s()-]/g, '')),
//   validatePassword: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
//   sanitizeInput: (input) => input.replace(/[<>]/g, ''), // No trimming here
// };

// const SignupScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     fullNames: '',
//     phone: '',
//     address: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = useCallback(
//     (name, value) => {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: name === 'email' || name === 'phone' ? value.trim() : value, // Allow spaces for other fields
//       }));

//       if (errors[name]) {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[name];
//           return newErrors;
//         });
//       }
//     },
//     [errors]
//   );

//   const validateForm = useCallback(() => {
//     const sanitizedData = { ...formData };
//     sanitizedData.email = ValidationUtils.sanitizeInput(sanitizedData.email);
//     sanitizedData.phone = ValidationUtils.sanitizeInput(sanitizedData.phone);

//     const newErrors = {};

//     Object.keys(sanitizedData).forEach((key) => {
//       if (!sanitizedData[key].trim()) {
//         newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
//       }
//     });

//     if (sanitizedData.email && !ValidationUtils.validateEmail(sanitizedData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (sanitizedData.phone && !ValidationUtils.validatePhone(sanitizedData.phone)) {
//       newErrors.phone = 'Invalid phone number format';
//     }

//     if (sanitizedData.password && !ValidationUtils.validatePassword(sanitizedData.password)) {
//       newErrors.password = 'Password must be strong (8+ chars, uppercase, number, special char)';
//     }

//     if (sanitizedData.password !== sanitizedData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const handleSignup = useCallback(async () => {
//     if (!validateForm()) {
//       Alert.alert('Validation Error', 'Please correct the highlighted errors.');
//       return;
//     }

//     console.log('Form Data:', formData);

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       await dispatch(signup({ ...submitData, url: 'https://reservationappserver.onrender.com/auth/register' })).unwrap();
//       Alert.alert('Success', 'Account created successfully!', [
//         { text: 'OK', onPress: () => navigation.replace('Login') },
//       ]);
//     } catch (err) {
//       console.error('Signup error:', err);
//       Alert.alert('Error', err.message || 'Registration failed. Please try again.');
//     }
//   }, [formData, dispatch, navigation, validateForm]);

//   const getInputStyle = (fieldName) => [
//     tw`w-full p-4 mb-2 border rounded-md`,
//     errors[fieldName] ? tw`border-red-500` : tw`border-gray-300`,
//   ];

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={tw`flex-grow px-6 justify-center`} keyboardShouldPersistTaps="handled">
//           <Text style={tw`text-3xl font-bold text-center mb-6`}>Create Account</Text>

//           {['Full Names', 'phone', 'address', 'email'].map((field) => (
//             <React.Fragment key={field}>
//               <TextInput
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChangeText={(text) => handleChange(field, text)}
//                 style={getInputStyle(field)}
//                 editable={!loading}
//                 keyboardType={field === 'email' ? 'email-address' : 'default'}
//               />
//               {errors[field] && <Text style={tw`text-red-500`}>{errors[field]}</Text>}
//             </React.Fragment>
//           ))}

//           <TextInput
//             placeholder="Password"
//             value={formData.password}
//             onChangeText={(text) => handleChange('password', text)}
//             secureTextEntry={!showPassword}
//             style={getInputStyle('password')}
//             editable={!loading}
//           />
//           {errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}

//           <TextInput
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChangeText={(text) => handleChange('confirmPassword', text)}
//             secureTextEntry={!showPassword}
//             style={getInputStyle('confirmPassword')}
//             editable={!loading}
//           />
//           {errors.confirmPassword && <Text style={tw`text-red-500`}>{errors.confirmPassword}</Text>}

//           {loading ? (
//             <ActivityIndicator size="large" color="#4CAF50" style={tw`mt-4`} />
//           ) : (
//             <TouchableOpacity onPress={handleSignup} style={tw`w-full bg-green-500 p-4 rounded-md mt-4`}>
//               <Text style={tw`text-white text-center font-bold`}>Sign Up</Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity onPress={() => navigation.replace('Login')} style={tw`mt-4`}>
//             <Text style={tw`text-center text-blue-600`}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignupScreen;


import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../state/slices/authSlice'; // Import the signup thunk from your Redux slice

const ValidationUtils = {
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase()),
  validatePhone: (phone) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.replace(/[\s()-]/g, '')),
  validatePassword: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
  sanitizeInput: (input) => input.replace(/[<>]/g, ''), // No trimming here
};

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Access loading and error from Redux state

  const [formData, setFormData] = useState({
    fullNames: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(
    (name, value) => {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'email' || name === 'phone' ? value.trim() : value, // Allow spaces for other fields
      }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const sanitizedData = { ...formData };
    sanitizedData.email = ValidationUtils.sanitizeInput(sanitizedData.email);
    sanitizedData.phone = ValidationUtils.sanitizeInput(sanitizedData.phone);

    const newErrors = {};

    Object.keys(sanitizedData).forEach((key) => {
      if (!sanitizedData[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (sanitizedData.email && !ValidationUtils.validateEmail(sanitizedData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (sanitizedData.phone && !ValidationUtils.validatePhone(sanitizedData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (sanitizedData.password && !ValidationUtils.validatePassword(sanitizedData.password)) {
      newErrors.password = 'Password must be strong (8+ chars, uppercase, number, special char)';
    }

    if (sanitizedData.password !== sanitizedData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignup = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the highlighted errors.');
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      await dispatch(signup({ ...submitData })).unwrap(); // Dispatch the signup thunk
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (err) {
      console.error('Signup error:', err);
      Alert.alert('Error', err.message || 'Registration failed. Please try again.');
    }
  }, [formData, dispatch, navigation, validateForm]);

  const getInputStyle = (fieldName) => [
    tw`w-full p-4 mb-2 border rounded-md`,
    errors[fieldName] ? tw`border-red-500` : tw`border-gray-300`,
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={tw`flex-grow px-6 justify-center`} keyboardShouldPersistTaps="handled">
          <Text style={tw`text-3xl font-bold text-center mb-6`}>Create Account</Text>

          {['fullNames', 'phone', 'address', 'email'].map((field) => (
            <React.Fragment key={field}>
              <TextInput
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChangeText={(text) => handleChange(field, text)}
                style={getInputStyle(field)}
                editable={!loading}
                keyboardType={field === 'email' ? 'email-address' : 'default'}
              />
              {errors[field] && <Text style={tw`text-red-500`}>{errors[field]}</Text>}
            </React.Fragment>
          ))}

          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!showPassword}
            style={getInputStyle('password')}
            editable={!loading}
          />
          {errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}

          <TextInput
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry={!showPassword}
            style={getInputStyle('confirmPassword')}
            editable={!loading}
          />
          {errors.confirmPassword && <Text style={tw`text-red-500`}>{errors.confirmPassword}</Text>}

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={tw`mt-4`} />
          ) : (
            <TouchableOpacity onPress={handleSignup} style={tw`w-full bg-green-500 p-4 rounded-md mt-4`}>
              <Text style={tw`text-white text-center font-bold`}>Sign Up</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.replace('Login')} style={tw`mt-4`}>
            <Text style={tw`text-center text-blue-600`}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;