import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  pushRedirect,
  addNotistack,
} from '../redirectAndNotification/redirectAndNotification.slice';

import {
  GetMainTableDataType,
  IParametersWaterHourlyMeterData,
  getHourlyWaterMeterInfoProps,
  IMetersListByGroupKey,
  ReadWaterMeterInfoFilterType,
} from '../../../ts/types/indication.types';
import { waterIndicationAPI } from '../../../api/indication.api';

export const getTokenForWaterMeter = createAsyncThunk(
  'getTokenForWaterMeter',
  async (body: ReadWaterMeterInfoFilterType, thunkAPI) => {
    try {
      const responseHourly = await waterIndicationAPI.getTokenForHourlyMeter({
        meterId: body.meterId,
        from: body.dateFrom,
        to: body.dateTo,
      });
      const responseDaily = await waterIndicationAPI.getTokenForMeter(body);

      if (body.meterId.length === 1) {
        thunkAPI.dispatch(
          pushRedirect(
            `/admin/reading/water/views?page=1&token=${responseDaily.data.token}&tokenHourly=${responseHourly.data.token}&meterId=${body.meterId[0]}`
          )
        );
      } else {
        thunkAPI.dispatch(
          pushRedirect(
            `/admin/reading/water/views?page=1&token=${responseDaily.data.token}&tokenHourly=${responseHourly.data.token}`
          )
        );
      }

      return { hourly: responseHourly.data, daily: responseDaily.data };
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

export const indicationWaterMetersList = createAsyncThunk(
  'indicationWaterMetersList',
  async (waterMeterPage: number, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.metersList(waterMeterPage);
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

export const indicationWaterMetersListByGroupKey = createAsyncThunk(
  'indicationWaterMetersListByGroupKey',
  async (params: IMetersListByGroupKey, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.metersListByGroupKey(params);

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

export const getWaterMeterInfoTable = createAsyncThunk(
  'getWaterMeterInfoTable',
  async (mainTableBody: GetMainTableDataType, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.readMeterRecordInfo(
        mainTableBody
      );
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

export const getWaterMeterInfoGraph = createAsyncThunk(
  'getWaterMeterInfoGraph',
  async (token: string, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.getMeterInfoGraph(token);
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

export const saveWaterMainTableExcel = createAsyncThunk(
  'saveWaterMainTableExcel',
  async (token: string, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.saveMainTableExcel(token);
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

export const getHourlyWaterMeterInfoTable = createAsyncThunk(
  'getHourlyWaterMeterInfoTable',
  async (parameters: getHourlyWaterMeterInfoProps, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.getHourlyMeterInfoTable(
        parameters
      );

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

export const getHourlyWaterMeterInfoGraph = createAsyncThunk(
  'getHourlyWaterMeterInfoGraph',
  async (parameters: IParametersWaterHourlyMeterData, thunkAPI) => {
    try {
      const response = await waterIndicationAPI.getHourlyMeterInfoGraph(
        parameters
      );

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
