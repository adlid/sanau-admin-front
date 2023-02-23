import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  pushRedirect,
  addNotistack,
} from '../redirectAndNotification/redirectAndNotification.slice';
import { logsAPI } from '../../../api/logs.api';
import {
  UserLogsType,
  DeviceLogsType,
  ErrorLogsType,
} from '../../../ts/types/logs.types';

export const getUsersLogs = createAsyncThunk(
  'getUsersLogs/thunk',
  async (userLogsBody: UserLogsType, thunkAPI) => {
    try {
      let response = await logsAPI.getUsersLogs(userLogsBody);

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

export const getDevicesLogs = createAsyncThunk(
  'getDevicesLogs/thunk',
  async (deviceLogsBody: DeviceLogsType, thunkAPI) => {
    try {
      let response = await logsAPI.getDevicesLogs(deviceLogsBody);
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

export const getErrorsLogs = createAsyncThunk(
  'getErrorsLogs/thunk',
  async (errorLogsBody: ErrorLogsType, thunkAPI) => {
    try {
      let response = await logsAPI.getErrorsLogs(errorLogsBody);
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
