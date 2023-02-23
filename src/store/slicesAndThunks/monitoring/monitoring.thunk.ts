import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNotistack,
  pushRedirect,
} from "../../../store/slicesAndThunks/redirectAndNotification/redirectAndNotification.slice";

import { monitoringAPI } from "../../../api/monitoring.api";
import { MonitoringToken } from "../../../ts/types/monitoring.types";

export const getMonitoringToken = createAsyncThunk("getMonitoringToken", async (body: MonitoringToken, thunkAPI) => {
  try {
    const res = await monitoringAPI.getMonitoringToken(body);

    thunkAPI.dispatch(
      pushRedirect(
        `/admin/monitoring-main/monitoring-table?token=${res.data.token}&meterType=${body.meterType}&type=${body.type}&from=${body.from}&to=${body.to}`
      )
    );
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.status);
  }
});

export const getMonitoringData = createAsyncThunk("getMonitoringData", async (token: string, thunkAPI) => {
  try {
    const res = await monitoringAPI.getMonitoringData(token);

    return res.data;
  } catch (error: any) {
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: error.data.message,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(error.data.status);
  }
});
