import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for authentication and profile
const initialState = {
  isAuthenticated: false, // Tracks if the user is authenticated
  user: null, // Stores user data, including profile
  loading: false, // Tracks loading state for async actions
  error: null, // Stores error messages
  token: null, // Stores the authentication token
};

// Async thunk to handle regular login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reservationappserver.onrender.com/auth/login", { email, password });
      return response.data; // Assume the backend returns user data and token on success
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to handle signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, fullNames, phone, address }, { rejectWithValue }) => {
    try {
      // Validate all required fields
      if (!email || !password || !fullNames || !phone || !address) {
        throw new Error('All fields are required.');
      }

      const response = await axios.post("https://reservationappserver.onrender.com/auth/register", { email, password, fullNames, phone, address });
      return response.data; // Expect the backend to return user data and token on success
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get the token from the state
      const response = await axios.get(`https://reservationappserver.onrender.com/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      return response.data; // Assume profile data is returned
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ fullNames, phone, address }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get the token from the state
      const response = await axios.put(
        `https://reservationappserver.onrender.com/auth/profile`,
        { fullNames, phone, address },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data; // Assume the backend returns updated profile data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null; // Clear error
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
        state.user = action.payload.user; // Store user data
        state.token = action.payload.token; // Store the token
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
        state.user = action.payload.user; // Store user data
        state.token = action.payload.token; // Store the token
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload }; // Merge profile with user data
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload }; // Update user data with new profile
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, clearError } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token; // Selector for the token

// Export reducer
export default authSlice.reducer;