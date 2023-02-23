import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  pushRedirect,
  addNotistack,
} from '../redirectAndNotification/redirectAndNotification.slice';
import { dashboardAPI } from '../../../api/dashboard';

export const getUserInfoThunk = createAsyncThunk(
  'getUserInfoThunk',
  async (_, thunkAPI) => {
    try {
      const response = await dashboardAPI.getUserInfo();
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: 'error',
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getMeterInfoThunk = createAsyncThunk(
  'getMeterInfoThunk',
  async (_, thunkAPI) => {
    try {
      const response = await dashboardAPI.getMeterInfo();
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: 'error',
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const getMeterServicesThunk = createAsyncThunk(
  'getMeterServicesThunk',
  async (_, thunkAPI) => {
    try {
      const response = await dashboardAPI.getMeterServices();
      return response.data;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: 'error',
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);

export const toggleMeterServicesThunk = createAsyncThunk(
  'toggleMeterServicesThunk',
  async (serviceId: string, thunkAPI) => {
    try {
      const response = await dashboardAPI.toggleMeterServices(serviceId);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return serviceId;
    } catch (error: any) {
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: error.data.message,
          variant: 'error',
        })
      );

      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);
