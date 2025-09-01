import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../http';
import endPoints from '../../constant';

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  deleteLoading: false,
  error: null,
  meta: null, // ✅ added for pagination
};

const handleApiError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    'An unexpected error occurred';
  return message;
};

export const createBooking = createAsyncThunk(
  'actorBookings/create',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.bookings, values);
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getBookings = createAsyncThunk(
  'actorBookings/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log(
        'API Request:',
        'https://board-backend-production-c2b2.up.railway.app/api/v1/market-data',
        params
      );

      const { data } = await axios.get(
        'https://board-backend-production-c2b2.up.railway.app/api/v1/market-data',
        { params: { ...params, cacheBuster: Date.now() } }
      );

      // ✅ API returns { data: [...], meta: {...} }
      if (!Array.isArray(data?.data)) {
        throw new Error('Invalid data format from API');
      }

      const bookings = data.data.map((item, index) => ({
        id: index + 1,
        time: item?.time || 'N/A',
        symbol: item?.symbol || 'N/A',
        open: item?.open || 0,
        high: item?.high || 0,
        low: item?.low || 0,
        close: item?.close || 0,
        change: item?.change || '+0.00%',
        ma7: item?.ma7 ?? null,
        ma25: item?.ma25 ?? null,
        ma99: item?.ma99 ?? null,
        'ma7-ma25': item?.['ma7-ma25'] ?? null,
        'ma7-ma99': item?.['ma7-ma99'] ?? null,
        'ma25-ma99': item?.['ma25-ma99'] ?? null,
      }));

      return {
        bookings,
        meta: data.meta,
      };
    } catch (error) {
      console.error('API Error Details:', error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'An error occurred'
      );
    }
  }
);

export const getBookingDetail = createAsyncThunk(
  'actorBookings/getDetail',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(endPoints.bookingDetail(id));
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateBooking = createAsyncThunk(
  'actorBookings/update',
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(endPoints.bookingDetail(id), values);
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'actorBookings/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(endPoints.bookingDetail(id));
      return id;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const actorBookingsSlice = createSlice({
  name: 'actorBookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings; // ✅ fixed
        state.meta = action.payload.meta; // ✅ save pagination info
        state.error = null;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.error = null;
      })
      .addCase(getBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state) => {
        state.deleteLoading = false;
        state.error = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentBooking, clearCurrentBooking } =
  actorBookingsSlice.actions;

export default actorBookingsSlice.reducer;
