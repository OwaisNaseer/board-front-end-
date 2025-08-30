// Library Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Local Imports
import axios from '../../http';
import endPoints from '../../constant';

// Initial state for auth
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};


// Helper function to handle API errors consistently
const handleApiError = (error) => {
  const message = error?.response?.data?.message ||
    error?.message ||
    'An unexpected error occurred';
  return message;
};


// Sign Up User API Function
export const registerUser = createAsyncThunk(
  'auth/register',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.register, {
        ...values,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Login user API Function
export const loginUser = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.login, {
        ...values,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Forgot Password API Function
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.forgotPassword, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Reset Password API Function
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.resetPassword, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Reducers
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const userData = {
          id: action.payload?.id,
          first_name: action.payload?.first_name,
          last_name: action.payload?.last_name,
          phone_no: action.payload?.phone_no,
          email: action.payload?.email,
          token: action.payload?.token?.access,
          all_user_permissions: action.payload?.all_user_permissions,
          role: action.payload?.role,
          is_active: action.payload?.is_active,
          is_reset_password: action.payload?.is_reset_password
        };

        state.user = action.payload?.is_reset_password ? null : userData;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Clear temp session after successful password reset
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, restoreSession, clearTempSession } = authSlice.actions;
export default authSlice.reducer;
