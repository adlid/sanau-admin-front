import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushRedirect, addNotistack } from "../redirectAndNotification/redirectAndNotification.slice";
// apis
import { reportsAPI } from "../../../api/reports.api";
import { powerMeterTransmissionDeviceConcentratorAPI } from "../../../api/concentrator/powerMeterTransmissionDeviceConcentratorAPI";
// ts
import {
  IDownloadAllElectrocityReportParamsProps,
  IDownloadNewReport2ParamsProps,
  IDownloadNewReportParamsProps,
  IDownloadReportParamsProps, IDownloadReportWaterMeters, IDownloadReportWaterMetersFolders, IGasReportParams, IGetTokenLorawanWater,
} from "../../../ts/interfaces/reports.interface";

//concentrator info
export const getAllUspdConcentrators = createAsyncThunk("reports/concentrators/all", async (_, thunkAPI) => {
  try {
    const response = await powerMeterTransmissionDeviceConcentratorAPI.getAllConcentrators("");
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

export const saveUSPDReportExcel = createAsyncThunk(
  "saveUSPDReportExcel",
  async (bodyParams: IDownloadReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadUSPDReport(bodyParams);
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

export const saveDiffUSPDLorawanReportExcel = createAsyncThunk(
  "saveDiffUSPDLorawanReportExcel",
  async (bodyParams: IDownloadReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadDiffUSPDAndWaterReport(bodyParams);
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


export const saveWaterReportsExcelThunk = createAsyncThunk('saveWaterReportsExcelThunk',
  async (data: IDownloadReportWaterMeters, { dispatch }) => {
    try {
      return await reportsAPI.downloadReportWaterMeters(data).then(res => res.data)
    } catch (e: any) {
      dispatch(addNotistack({
        statusCode: '',
        statusText: e.data.message,
        variant: 'error'
      }))
    }
  })


export const saveAllElectocityReportExcel = createAsyncThunk(
  "saveAllElectocityReportExcel",
  async (bodyParams: IDownloadAllElectrocityReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadAllElecticityReport(bodyParams);
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

export const saveWaterReportsFolderExcelThunk = createAsyncThunk('saveWaterReportsFolderExcelThunk',
  async (data: IDownloadReportWaterMetersFolders, { dispatch }) => {
    try {
      let meterIds: string[] = [];
      for (let i = 0; i < data.folders.length; i++) {
        let listOfWaterMeters = await reportsAPI.getWaterMetersByFolder(data.folders[i]);
        console.log(listOfWaterMeters)
        meterIds = meterIds.concat(listOfWaterMeters.data.map((item: any) => item.unitedMeter.waterMeter.id))
      }
      // data.folders.forEach(async folderId => {

      // })
      console.log(meterIds)
      const { from, to } = data;
      return await reportsAPI.downloadReportWaterMeters({ from, to, meterId: meterIds }).then(res => res.data)
    } catch (e: any) {
      dispatch(addNotistack({
        statusCode: '',
        statusText: e.data.message,
        variant: 'error'
      }))
    }
  })

// added by Islam for Баланс воды с разностью
export const saveLorawanWaterReportsExcelThunk = createAsyncThunk(
  "saveLorawanWaterReportsExcelThunk",
  async (bodyParams: IGetTokenLorawanWater, thunkAPI) => {
    try {
      const tokenRes = await reportsAPI.getTokenLorawanWaterReports(bodyParams);
      const { token } = tokenRes.data;
      const response = await reportsAPI.downloadReportLorawanWaterReportsByToken(token);
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

export const saveLorawanWaterReportsExcelFolderThunk = createAsyncThunk(
  "saveLorawanWaterReportsExcelThunk",
  async (data: IGetTokenLorawanWater, thunkAPI) => {
    try {
      let meterIds: string[] = [];
      for (let i = 0; i < data.meterId.length; i++) {
        let listOfWaterMeters = await reportsAPI.getWaterMetersByFolder(data.meterId[i]);
        console.log(listOfWaterMeters)
        meterIds = meterIds.concat(listOfWaterMeters.data.map((item: any) => item.unitedMeter.waterMeter.id))
      }
      const tokenRes = await reportsAPI.getTokenLorawanWaterReports({...data, meterId: meterIds});
      const { token } = tokenRes.data;
      const response = await reportsAPI.downloadReportLorawanWaterReportsByToken(token);
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

export const saveNewReport1Excel = createAsyncThunk(
  "saveNewReport1Excel",
  async (bodyParams: IDownloadNewReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport1(bodyParams);
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

export const saveNewReport2Excel = createAsyncThunk(
  "saveNewReport2Excel",
  async (bodyParams: IDownloadNewReport2ParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport2(bodyParams);
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

export const saveNewReport3Excel = createAsyncThunk(
  "saveNewReport3Excel",
  async (bodyParams: IDownloadNewReport2ParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport3(bodyParams);
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

export const saveNewReport4Excel = createAsyncThunk(
  "saveNewReport4Excel",
  async (bodyParams: IDownloadNewReport2ParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport4(bodyParams);
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

export const saveNewReport5Excel = createAsyncThunk(
  "saveNewReport5Excel",
  async (bodyParams: IDownloadNewReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport5(bodyParams);
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

export const saveNewReport6Excel = createAsyncThunk(
  "saveNewReport6Excel",
  async (bodyParams: IDownloadNewReportParamsProps, thunkAPI) => {
    try {
      const response = await reportsAPI.downloadNewReport6(bodyParams);
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

export const saveGasReportExcelThunk = createAsyncThunk(
  "saveGasReportExcelThunk",
  async (bodyParams: IGasReportParams, thunkAPI) => {
    try {
      const response = await reportsAPI.saveGasReportExcel(bodyParams);
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