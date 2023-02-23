import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotistack, pushRedirect } from "../../redirectAndNotification/redirectAndNotification.slice";
import { gasMeterUdpDeviceConcentratorAPI } from "../../../../api/concentrator/gasMeterUdpDeviceConcentratorAPI";
import {
  changeMeterDateAndTimeType,
  changeMeterImpulsesNumberType,
  changeMeterReportPeriodType,
  getConcentratorMeterParamsType,
  IWaterLorawanChangeDateTimeProps,
  GasCounterpartyValuesType,
  GasDescriptionValuesType,
  meterMountingType,
} from "../../../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

//concentrator info
export const getAllConcentrators = createAsyncThunk("gasConcentrators/udp/all", async (_, thunkAPI) => {
  try {
    const response = await gasMeterUdpDeviceConcentratorAPI.getAllConcentrators();
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
});

export const getСoncentratorMeters = createAsyncThunk(
  "gasConcentrators/udp/getСoncentratorMeters",
  async (page: number, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.getСoncentratorMeters(page);

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

export const gasConcentratorPersonalAccountSearchThunk = createAsyncThunk(
  "gasConcentrators/udp/edit/search",
  async (personalAccountNumber: string, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.personalAccountSearch(personalAccountNumber);

      const { active, createdAt, lastFixDate, region, id, ...otherKeys } = response.data;

      return otherKeys;
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

export const saveEditedGasConcentratorDescriptionThunk = createAsyncThunk(
  "gasConcentrators/udp/edit/savedesc",
  async (data: GasDescriptionValuesType, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.saveEditedDescriptionGasConcentrator(data);
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
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

export const saveEditedGasConcentratorCounterpartyThunk = createAsyncThunk(
  "gasConcentrators/udp/savecounter",
  async (data: GasCounterpartyValuesType, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.saveEditedCounterpartyGasConcentrator(data);
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
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

export const gasConcentratorGroupControlThunk = createAsyncThunk(
  "gasConcentrators/udp/edit/taksonomy",
  async (id: string, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.gasConcentratorGroupControl(id);

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

export const saveGasConcentratorGroupControlThunk = createAsyncThunk(
  "gasConcentrators/udp/edit/taksonomy/save",
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.saveGasConcentratorGroupControl(fullGroupTree);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );

      thunkAPI.dispatch(pushRedirect("/admin/concentrators/water-meter/concentrator-info?tabValue=by-lorawan-udp"));

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

export const getDescriptionGasConcentratorBarcodeThunk = createAsyncThunk(
  "gasConcentrators/udp/get/Barcode",
  async (id: string, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.getDescriptionGasConcentratorBarcode(id); 

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

export const meterMountingThunk = createAsyncThunk("meterMounting/gas", async (params: meterMountingType, thunkAPI) => {
  try {
    const response = await gasMeterUdpDeviceConcentratorAPI.meterMounting(params);

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
});

export const connectGasMeter = createAsyncThunk("gasConcentrators/udp/connect", async (barcode: string, thunkAPI) => {
  try {
    const response = await gasMeterUdpDeviceConcentratorAPI.connectMeter(barcode);
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
});

export const activateGasMeter = createAsyncThunk(
  "gasConcentrators/udp/activate",
  async (selectedMeters: Array<string>, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.activateMeter(selectedMeters);
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

export const deactivateGasMeter = createAsyncThunk(
  "gasConcentrators/udp/deactivate",
  async (selectedMeters: Array<string>, thunkAPI) => {
    try {
      const response = await gasMeterUdpDeviceConcentratorAPI.deactivateMeter(selectedMeters);
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
