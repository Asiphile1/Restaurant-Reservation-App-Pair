// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import jwtDecode from 'jwt-decode';

// // const BASE_URL = "http://localhost:4050/auth";

// // // Initial state
// // const initialState = {
// //   isAuthenticated: false,
// //   user: null,
// //   loading: false,
// //   error: null,
// //   token: null,
// // };

// // // Helper function to get token from localStorage safely
// // const getTokenFromStorage = () => {
// //   if (typeof window !== 'undefined') {
// //     return localStorage.getItem('token');
// //   }
// //   return null;
// // };

// // // Helper function to check if a token is expired
// // const isTokenExpired = (token) => {
// //   try {
// //     const decoded = jwtDecode(token);
// //     return decoded.exp * 1000 < Date.now(); // Token expiry check
// //   } catch {
// //     return true; // If decoding fails, assume token is invalid
// //   }
// // };

// // // Async thunk for login
// // export const login = createAsyncThunk(
// //   'auth/login',
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(`${BASE_URL}/login`, { email, password });
// //       const { token } = response.data;

// //       if (typeof window !== 'undefined') {
// //         localStorage.setItem('token', token); // Store token in localStorage
// //       }

// //       return response.data; // Expect { user, token } from backend
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Async thunk for signup
// // export const signup = createAsyncThunk(
// //   'auth/signup',
// //   async (userData, { rejectWithValue }) => {
// //     try {
// //       const { email, password, fullNames, phone, address } = userData;
// //       if (!email || !password || !fullNames || !phone || !address) {
// //         throw new Error('All fields are required.');
// //       }

// //       const response = await axios.post(`${BASE_URL}/register`, userData);
// //       return response.data; // Expect { user, token } from backend
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Async thunk for fetching user profile
// // export const fetchUserProfile = createAsyncThunk(
// //   'auth/fetchUserProfile',
// //   async (_, { rejectWithValue, getState }) => {
// //     try {
// //       const token = getState().auth.token || getTokenFromStorage();
// //       if (!token || isTokenExpired(token)) {
// //         throw new Error('Authentication token is missing or expired.');
// //       }

// //       const response = await axios.get(`${BASE_URL}/profile`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       return response.data; // Expect user profile data from backend
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Async thunk for updating user profile
// // export const updateUserProfile = createAsyncThunk(
// //   'auth/updateUserProfile',
// //   async (profileData, { rejectWithValue, getState }) => {
// //     try {
// //       const token = getState().auth.token || getTokenFromStorage();
// //       if (!token || isTokenExpired(token)) {
// //         throw new Error('Authentication token is missing or expired.');
// //       }

// //       const response = await axios.put(`${BASE_URL}/profile`, profileData, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       return response.data; // Expect updated profile data
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Auth slice
// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     logout: (state) => {
// //       if (typeof window !== 'undefined') {
// //         localStorage.removeItem('token'); // Clear token from storage
// //       }
// //       state.isAuthenticated = false;
// //       state.user = null;
// //       state.token = null;
// //       state.error = null;
// //     },
// //     clearError: (state) => {
// //       state.error = null; // Clear error
// //     },
// //     restoreLogin: (state) => {
// //       const token = getTokenFromStorage();
// //       if (token && !isTokenExpired(token)) {
// //         state.token = token;
// //         state.isAuthenticated = true;
// //       } else {
// //         state.token = null;
// //         state.isAuthenticated = false;
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Login
// //       .addCase(login.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(login.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.isAuthenticated = true;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;
// //       })
// //       .addCase(login.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // Signup
// //       .addCase(signup.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(signup.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.isAuthenticated = true;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;
// //       })
// //       .addCase(signup.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // Fetch user profile
// //       .addCase(fetchUserProfile.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchUserProfile.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = { ...state.user, ...action.payload };
// //       })
// //       .addCase(fetchUserProfile.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // Update user profile
// //       .addCase(updateUserProfile.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(updateUserProfile.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = { ...state.user, ...action.payload };
// //       })
// //       .addCase(updateUserProfile.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // // Export actions
// // export const { logout, clearError, restoreLogin } = authSlice.actions;

// // // Selectors
// // export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// // export const selectUser = (state) => state.auth.user;
// // export const selectLoading = (state) => state.auth.loading;
// // export const selectError = (state) => state.auth.error;
// // export const selectToken = (state) => state.auth.token;

// // // Export reducer
// // export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// const BASE_URL = "https://reservationappserver.onrender.com/auth";

// // Initial state
// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   loading: false,
//   error: null,
//   token: null,
// };

// // Helper function to get token from localStorage safely
// const getTokenFromStorage = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('token');
//   }
//   return null;
// };

// // Helper function to check if a token is expired
// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.exp * 1000 < Date.now(); // Token expiry check
//   } catch {
//     return true; // If decoding fails, assume token is invalid
//   }
// };

// // Async thunk for login
// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/login`, { email, password });
//       const { token, user } = response.data; // Extract token and user from response

//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', token); // Store token in localStorage
//       }

//       return { token, user }; // Return token and user
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Async thunk for signup
// export const signup = createAsyncThunk(
//   'auth/signup',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { email, password, fullNames, phone, address } = userData;
//       if (!email || !password || !fullNames || !phone || !address) {
//         throw new Error('All fields are required.');
//       }

//       const response = await axios.post(`${BASE_URL}/register`, userData);
//       const { token, user } = response.data; // Extract token and user from response

//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', token); // Store token in localStorage
//       }

//       return { token, user }; // Return token and user
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Async thunk for fetching user profile
// export const fetchUserProfile = createAsyncThunk(
//   'auth/fetchUserProfile',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const token = getState().auth.token || getTokenFromStorage();
//       if (!token || isTokenExpired(token)) {
//         throw new Error('Authentication token is missing or expired.');
//       }

//       const response = await axios.get(`${BASE_URL}/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data; // Expect user profile data from backend
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Async thunk for updating user profile
// export const updateUserProfile = createAsyncThunk(
//   'auth/updateUserProfile',
//   async (profileData, { rejectWithValue, getState }) => {
//     try {
//       const token = getState().auth.token || getTokenFromStorage();
//       if (!token || isTokenExpired(token)) {
//         throw new Error('Authentication token is missing or expired.');
//       }

//       const response = await axios.put(`${BASE_URL}/profile`, profileData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data; // Expect updated profile data
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token'); // Clear token from storage
//       }
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null; // Clear error
//     },
//     restoreLogin: (state) => {
//       const token = getTokenFromStorage();
//       if (token && !isTokenExpired(token)) {
//         state.token = token;
//         state.isAuthenticated = true;
//       } else {
//         state.token = null;
//         state.isAuthenticated = false;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Signup
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch user profile
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = { ...state.user, ...action.payload };
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update user profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = { ...state.user, ...action.payload };
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions
// export const { logout, clearError, restoreLogin } = authSlice.actions;

// // Selectors
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectUser = (state) => state.auth.user;
// export const selectLoading = (state) => state.auth.loading;
// export const selectError = (state) => state.auth.error;
// export const selectToken = (state) => state.auth.token;

// // Export reducer
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const BASE_URL = "https://reservationappserver.onrender.com/auth";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: null,
};

// Helper function to get token from AsyncStorage
const getTokenFromStorage = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};

// Helper function to store token in AsyncStorage
const storeTokenInStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token in AsyncStorage:', error);
  }
};

// Helper function to remove token from AsyncStorage
const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};

// Helper function to check if a token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Token expiry check
  } catch {
    return true; // If decoding fails, assume token is invalid
  }
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const { token, user } = response.data; // Extract token and user from response

      await storeTokenInStorage(token); // Store token in AsyncStorage

      return { token, user }; // Return token and user
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password, fullNames, phone, address } = userData;
      if (!email || !password || !fullNames || !phone || !address) {
        throw new Error('All fields are required.');
      }

      const response = await axios.post(`${BASE_URL}/register`, userData);
      const { token, user } = response.data; // Extract token and user from response

      await storeTokenInStorage(token); // Store token in AsyncStorage

      return { token, user }; // Return token and user
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || (await getTokenFromStorage());
      if (!token || isTokenExpired(token)) {
        throw new Error('Authentication token is missing or expired.');
      }

      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Expect user profile data from backend
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || (await getTokenFromStorage());
      if (!token || isTokenExpired(token)) {
        throw new Error('Authentication token is missing or expired.');
      }

      const response = await axios.put(`${BASE_URL}/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Expect updated profile data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeTokenFromStorage(); // Remove token from AsyncStorage
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null; // Clear error
    },
    restoreLogin: (state) => {
      const checkToken = async () => {
        const token = await getTokenFromStorage();
        if (token && !isTokenExpired(token)) {
          state.token = token;
          state.isAuthenticated = true;
        } else {
          state.token = null;
          state.isAuthenticated = false;
        }
      };
      checkToken();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, clearError, restoreLogin } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

// Export reducer
export default authSlice.reducer;