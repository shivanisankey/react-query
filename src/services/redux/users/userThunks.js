import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI } from '../../API/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      return await fetchUsersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);