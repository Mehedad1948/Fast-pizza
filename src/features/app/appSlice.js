import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettings } from '../../services/apiPanel';

const initialState = {
  duration: 30,
  priorityPrice: 0.2,
  startAt: null,
  endAt: null,
};

export const fetchSettings = createAsyncThunk(
  'app/fetchSettings',
  async function settings() {
    const data = await getSettings();
    return data;
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      const { duration, priorityPrice, startAt, endAt } = action.payload;
      state.duration = duration;
      state.priorityPrice = priorityPrice;
      state.startAt = startAt;
      state.endAt = endAt;
    });
  },
});

export default appSlice.reducer;
