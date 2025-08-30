import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../http';
import endPoints from '../../constant';

const initialState = {
  auditions: [],
  currentAudition: null,
  loading: false,
  deleteLoading: false,
  error: null,
  totalCount: 0,
};

const handleApiError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    'An unexpected error occurred';
  return message;
};

export const createActorAudition = createAsyncThunk(
  'actorAuditions/create',
  async (values, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'attachments' && values[key]) {
          formData.append('attachments', values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      const { data } = await axios.post(endPoints.selfAudition, formData, {});
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getActorAuditions = createAsyncThunk(
  'actorAuditions/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(endPoints.selfAudition, { params });
      return data?.data?.map((audition) => ({
        title: audition?.title,
        description: audition?.description,
        purpose: audition?.purpose,
        status: audition?.status,
        ...audition,
      }));
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateActorAudition = createAsyncThunk(
  'actorAuditions/update',
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'attachments' && values[key]) {
          formData.append('attachments', values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      const { data } = await axios.put(
        `${endPoints.selfAudition}${id}/`,
        formData,
        {}
      );
      return data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteActorAudition = createAsyncThunk(
  'actorAuditions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${endPoints.selfAudition}${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const actorAuditionsSlice = createSlice({
  name: 'actorAuditions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentAudition: (state, action) => {
      state.currentAudition = action.payload;
    },
    clearCurrentAudition: (state) => {
      state.currentAudition = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Actor Audition
      .addCase(createActorAudition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActorAudition.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createActorAudition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Actor Auditions
      .addCase(getActorAuditions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActorAuditions.fulfilled, (state, action) => {
        state.loading = false;
        state.auditions = action.payload?.results || action.payload || [];
        state.error = null;
      })
      .addCase(getActorAuditions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Actor Audition
      .addCase(updateActorAudition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActorAudition.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateActorAudition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Actor Audition
      .addCase(deleteActorAudition.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteActorAudition.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
      })
      .addCase(deleteActorAudition.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentAudition, clearCurrentAudition } =
  actorAuditionsSlice.actions;

export default actorAuditionsSlice.reducer;
