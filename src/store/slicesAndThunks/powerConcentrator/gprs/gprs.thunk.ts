import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotistack, pushRedirect } from "../../redirectAndNotification/redirectAndNotification.slice";
import { GPRStype, GPRSTableData, GPRSDescription, GPRSInfoType } from "../../../../ts/types/gprs.types";
import { powerMeterGPRsAPI } from "../../../../api/concentrator/powerMeterGPRS.api";
import { indicationAPI } from "../../../../api/indication.api";

export const connectConcentratorGPRS = createAsyncThunk(
  "concentrator/create/gprs",
  async (gprsBody: GPRStype, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.connectGPRS(gprsBody);
      if (gprsBody.folderId && gprsBody.folderId.length && response.data) {
        const response1 = await indicationAPI.addMetersToFolder({ folderId: gprsBody.folderId, meterId: [response.data.id], type: 'gprs' });

        //notistack
        thunkAPI.dispatch(
          addNotistack({
            statusCode: "",
            statusText: response1.data.message,
            variant: "success",
          })
        );
      }
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );

      thunkAPI.dispatch(pushRedirect("/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-step2"));
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

export const getGPRSData = createAsyncThunk("concentrator/getGPRSData", async (gprsbody: GPRSTableData, thunkAPI) => {
  try {
    const response = await powerMeterGPRsAPI.getGPRSData(gprsbody);
    //notistack
    thunkAPI.dispatch(
      addNotistack({
        statusCode: "",
        statusText: response.data.message,
        variant: "success",
      })
    );

    thunkAPI.dispatch(pushRedirect("/admin/reading/power-meter/gprs/consider"));
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

export const changeGPRSdescription = createAsyncThunk(
  "concentrator/changeGPRSdescription",
  async (gprsbody: GPRSDescription, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.changeGPRSdescription(gprsbody);
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

export const changeGPRSuserInfo = createAsyncThunk(
  "concentrator/changeGPRSuserInfo",
  async (userInfo: GPRSInfoType, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.changeGPRSuserInfo(userInfo);
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

export const GPRSpersonalAccountSearch = createAsyncThunk(
  "concentrator/GPRSpersonalAccountSearch",
  async (values: string, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.GPRSpersonalAccountSearch(values);

      const { id, ...items } = response.data;

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );

      return items;
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

export const getGPRSMetersList = createAsyncThunk("concentrator/GPRSMetersList",
  async (params: { text: string, queryType: string, folderId: string, type: "DIRECT" | "DYNAMIC" }, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.GPRSMetersList(params.text, params.queryType, params.folderId, params.type);

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

export const activateGPRSMetersThunk = createAsyncThunk(
  "activateGPRSMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.activateGPRSMeters(ids);
      thunkAPI.dispatch(getGPRSMetersList({ text: "", queryType: "", folderId: "", type: "DIRECT" }));

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

export const deactivateGPRSMetersThunk = createAsyncThunk(
  "deactivateGPRSMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.deactivateGPRSMeters(ids);
      thunkAPI.dispatch(getGPRSMetersList({ text: "", queryType: "", folderId: "", type: "DIRECT" }));

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

export const getFoldersGPRS = createAsyncThunk(
  "getFoldersList/gprs",
  async (params: { text: string }, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.getFoldersGPRS(params.text);

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
)

export const createFolderGPRS = createAsyncThunk(
  "createFolder/gprs",
  async (params: { name: string }, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.createFolderGPRS(params.name);
      thunkAPI.dispatch(getFoldersGPRS({ text: "" }));
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );
      thunkAPI.dispatch(
        pushRedirect(
          `/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-tcp&page=1`
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
)

export const syncGprsMetersDynamic = createAsyncThunk(
  "syncGprsMetersDynamic/gprs",
  async (_, thunkAPI) => {
    try {
      const response = await powerMeterGPRsAPI.syncMetersGprsDynamic();
      if (response.data) {
        await thunkAPI.dispatch(getGPRSMetersList({ folderId: "", queryType: "accountNumber", type: "DYNAMIC", text: "" }));
        thunkAPI.dispatch(
          addNotistack({
            statusCode: "",
            statusText: response.data.message,
            variant: "success",
          })
        );
      }
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
)