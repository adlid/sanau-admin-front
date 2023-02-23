import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushRedirect, addNotistack } from "../redirectAndNotification/redirectAndNotification.slice";

import {
  GetMainTableDataType,
  ReadGasMeterInfoFilterType,
  IMetersListByGroupKey,
  GetGasMeterDetailSidebarInfoPropsType,
  GetGasTableDataType,
} from "../../../ts/types/indication.types";
import { gasIndicationAPI } from "../../../api/indication.api";

export const indicationGasMetersListByGroupKey = createAsyncThunk(
  "indicationGasMetersListByGroupKey",
  async (params: IMetersListByGroupKey, thunkAPI) => {
    try {
      const response = await gasIndicationAPI.metersListByGroupKey(params);

      return response.data;
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
  }
);

export const getGasMeterInfoTable = createAsyncThunk(
  "getGasMeterInfoTable",
  async (body: GetGasTableDataType, thunkAPI) => {
    try {
      const response = await gasIndicationAPI.getMetersTableData(body);
      thunkAPI.dispatch(
        pushRedirect(
          `/admin/reading/gas/views?page=1&meterId=${JSON.stringify(body.meterId)}&groupBy=${
            body.type
          }&from=${body.dateFrom?.toISOString()}&to=${body.dateTo?.toISOString()}&timeFrom=${body.timeFrom}&timeTo=${
            body.timeTo
          }`
        )
      );
      return response.data;
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
  }
);

export const getGasMeterInfoGraph = createAsyncThunk(
  "getGasMeterInfoGraph",
  async (body: GetGasTableDataType, thunkAPI) => {
    try {
      const response = await gasIndicationAPI.getMetersGraphData(body);
      return response.data;
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
  }
);

export const saveGasMainTableExcel = createAsyncThunk(
  "saveGasMainTableExcel",
  async (body: GetGasTableDataType, thunkAPI) => {
    try {
      const response = await gasIndicationAPI.saveMainTableExcel(body);
      return response.data;
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
  }
);

export const getDetailGasUdpSidebarInfoThunk = createAsyncThunk(
  "getDetailGasUdpSidebarInfoThunk",
  async (params: GetGasMeterDetailSidebarInfoPropsType, thunkAPI) => {
    try {
      const response = await gasIndicationAPI.getDetailGasUdpSidebarInfo(params);
      return response.data;
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
  }
);
