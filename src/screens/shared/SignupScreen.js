import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard,
  Animated,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../state/slices/authSlice";
import tw from "twrnc";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, formOpacity]);

  const [formData, setFormData] = useState({
    fullNames: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const handleChange = useCallback(
    (name, value) => {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "email" || name === "phone" ? value.trim() : value,
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
    Object.keys(sanitizedData).forEach((key) => {
      sanitizedData[key] = sanitizedData[key].trim();
    });

    const newErrors = {};

    Object.keys(sanitizedData).forEach((key) => {
      if (!sanitizedData[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (
      sanitizedData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)
    ) {
      newErrors.email = "Invalid email format 📧";
    }

    if (sanitizedData.password !== sanitizedData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match 🔐";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignup = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const { confirmPassword, ...submitData } = formData;
      await dispatch(signup({ ...submitData })).unwrap();
      setModalVisible(true); // Show success modal
    } catch (err) {
      console.error("Signup error:", err);
      Alert.alert(
        "Error ❌",
        err.message || "Registration failed. Please try again."
      );
    }
  }, [formData, dispatch, validateForm]);

  return (
    <LinearGradient colors={["#444", "#444"]} style={tw`flex-1 pt-35`}>
      <StatusBar barStyle="light-content" backgroundColor="#444" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={tw`flex-grow px-6 py-8`}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                tw`items-center mb-8`,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={tw`text-6xl mb-2`}>✨</Text>
              <Text style={tw`text-white text-3xl font-bold tracking-wider`}>
                Join ZestyReserve
              </Text>
              <Text style={tw`text-white/80 text-sm`}>
                Create your account 📝
              </Text>
            </Animated.View>

            <Animated.View style={{ opacity: formOpacity }}>
              {/* Input Fields */}
              {Object.keys(formData).map((key) => (
                <View key={key}>
                  <TextInput
                    placeholder={`Enter ${key}`}
                    value={formData[key]}
                    onChangeText={(text) => handleChange(key, text)}
                    style={tw`p-4 mb-2 border rounded-xl bg-gray-800 text-white`}
                  />
                  {errors[key] && (
                    <Text style={tw`text-red-400 text-sm`}>{errors[key]}</Text>
                  )}
                </View>
              ))}
              <TouchableOpacity
                onPress={handleSignup}
                style={tw`bg-white p-4 rounded-xl mt-4`}
              >
                <Text style={tw`text-indigo-600 text-center font-bold`}>
                  Create Account 🚀
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Modal for Success */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/60`}>
          <View style={tw`bg-white p-6 rounded-lg w-80`}>
            <Text style={tw`text-lg font-bold text-center`}>
              🎉 Account Created Successfully!
            </Text>
            <Text style={tw`text-center mt-4`}>
              Your account has been created. Please log in to continue.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.replace("Login");
              }}
              style={tw`mt-6 bg-indigo-600 p-3 rounded-lg`}
            >
              <Text style={tw`text-white text-center font-bold`}>
                Go to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default SignupScreen;

// import React, { useState, useCallback, useEffect, useRef } from "react";
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
//   StatusBar,
//   Keyboard,
//   Animated,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../state/slices/authSlice";
// import tw from "twrnc";

// const ValidationUtils = {
//   validateEmail: (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase()),
//   validatePhone: (phone) =>
//     /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.replace(/[\s()-]/g, "")),
//   validatePassword: (password) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//       password
//     ),
//   sanitizeInput: (input) => input.replace(/[<>]/g, ""),
// };

// const SignupScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const formOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.spring(slideAnim, {
//           toValue: 0,
//           friction: 8,
//           tension: 40,
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(formOpacity, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim, formOpacity]);

//   const [formData, setFormData] = useState({
//     fullNames: "",
//     phone: "",
//     address: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = useCallback(
//     (name, value) => {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: name === "email" || name === "phone" ? value.trim() : value,
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
//     Object.keys(sanitizedData).forEach((key) => {
//       sanitizedData[key] = ValidationUtils.sanitizeInput(sanitizedData[key]);
//     });

//     const newErrors = {};

//     Object.keys(sanitizedData).forEach((key) => {
//       if (!sanitizedData[key].trim()) {
//         newErrors[key] = `${
//           key.charAt(0).toUpperCase() + key.slice(1)
//         } is required`;
//       }
//     });

//     if (
//       sanitizedData.email &&
//       !ValidationUtils.validateEmail(sanitizedData.email)
//     ) {
//       newErrors.email = "Invalid email format 📧";
//     }

//     if (
//       sanitizedData.phone &&
//       !ValidationUtils.validatePhone(sanitizedData.phone)
//     ) {
//       newErrors.phone = "Invalid phone number format 📱";
//     }

//     if (
//       sanitizedData.password &&
//       !ValidationUtils.validatePassword(sanitizedData.password)
//     ) {
//       newErrors.password =
//         "Password must include: 8+ chars, uppercase, number, special character 🔒";
//     }

//     if (sanitizedData.password !== sanitizedData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match 🔐";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const handleSignup = useCallback(async () => {
//     if (!validateForm()) {
//       Alert.alert(
//         "Validation Error",
//         "Please correct the highlighted errors ❌"
//       );
//       return;
//     }

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       await dispatch(signup({ ...submitData })).unwrap();
//       Alert.alert("Success ✨", "Account created successfully!", [
//         { text: "OK", onPress: () => navigation.replace("Login") },
//       ]);
//     } catch (err) {
//       console.error("Signup error:", err);
//       Alert.alert(
//         "Error ❌",
//         err.message || "Registration failed. Please try again."
//       );
//     }
//   }, [formData, dispatch, navigation, validateForm]);

//   const inputFields = [
//     { key: "fullNames", placeholder: "Full Name 👤", icon: "👤" },
//     {
//       key: "phone",
//       placeholder: "Phone Number 📱",
//       icon: "📱",
//       keyboardType: "phone-pad",
//     },
//     { key: "address", placeholder: "Address 📍", icon: "📍" },
//     {
//       key: "email",
//       placeholder: "Email 📧",
//       icon: "📧",
//       keyboardType: "email-address",
//     },
//     { key: "password", placeholder: "Password 🔒", icon: "🔒", secure: true },
//     {
//       key: "confirmPassword",
//       placeholder: "Confirm Password 🔐",
//       icon: "🔐",
//       secure: true,
//     },
//   ];

//   return (
//     <LinearGradient colors={["#444", "#444"]} style={tw`flex-1 pt-35`}>
//       <StatusBar barStyle="light-content" backgroundColor="#444" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={tw`flex-1`}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             contentContainerStyle={tw`flex-grow px-6 py-8`}
//             keyboardShouldPersistTaps="handled"
//           >
//             <Animated.View
//               style={[
//                 tw`items-center mb-8`,
//                 {
//                   opacity: fadeAnim,
//                   transform: [{ translateY: slideAnim }],
//                 },
//               ]}
//             >
//               <Text style={tw`text-6xl mb-2`}>✨</Text>
//               <Text style={tw`text-white text-3xl font-bold tracking-wider`}>
//                 Join ZestyReserve
//               </Text>
//               <Text style={tw`text-white/80 text-sm`}>
//                 Create your account 📝
//               </Text>
//             </Animated.View>

//             <Animated.View style={{ opacity: formOpacity }}>
//               {inputFields.map((field) => (
//                 <View key={field.key}>
//                   <TextInput
//                     placeholder={field.placeholder}
//                     value={formData[field.key]}
//                     onChangeText={(text) => handleChange(field.key, text)}
//                     secureTextEntry={field.secure && !showPassword}
//                     keyboardType={field.keyboardType || "default"}
//                     style={[
//                       tw`w-full p-4 mb-2 border rounded-xl text-white bg-white/10`,
//                       errors[field.key]
//                         ? tw`border-red-300`
//                         : tw`border-white/30`,
//                     ]}
//                     placeholderTextColor="#ffffff80"
//                     editable={!loading}
//                   />
//                   {errors[field.key] && (
//                     <Text style={tw`text-red-300 mb-2 ml-1`}>
//                       {errors[field.key]}
//                     </Text>
//                   )}
//                 </View>
//               ))}

//               {loading ? (
//                 <ActivityIndicator
//                   size="large"
//                   color="#ffffff"
//                   style={tw`mt-4`}
//                 />
//               ) : (
//                 <TouchableOpacity
//                   onPress={handleSignup}
//                   style={tw`w-full bg-white p-4 rounded-xl mt-4`}
//                 >
//                   <Text
//                     style={tw`text-indigo-600 text-center font-bold text-lg`}
//                   >
//                     Create Account 🚀
//                   </Text>
//                 </TouchableOpacity>
//               )}

//               <TouchableOpacity
//                 onPress={() => navigation.replace("Login")}
//                 style={tw`mt-6`}
//               >
//                 <Text style={tw`text-white/90 text-center`}>
//                   Already have an account? Login 👋
//                 </Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };

// export default SignupScreen;
