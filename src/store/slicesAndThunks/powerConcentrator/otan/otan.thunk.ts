import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotistack, pushRedirect } from "../../redirectAndNotification/redirectAndNotification.slice";
import {
  OtanType,
  GPRSTableData,
  GPRSDescription,
  GPRSInfoType,
  OtanAttributesType,
} from "../../../../ts/types/gprs.types";
import { powerMeterOtanAPI } from "../../../../api/concentrator/powerMeterOtan.api";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

export const connectConcentratorOtan = createAsyncThunk(
  "concentrator/create/otan",
  async (gprsBody: OtanType, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.connectOtan(gprsBody);
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

export const detailOtanInfoThunk = createAsyncThunk(
  "concentrator/detailOtanInfoThunk",
  async (id: string, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.detailOtanInfo(id);
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

export const changeOtanDescription = createAsyncThunk(
  "concentrator/changeOtanDescription",
  async (gprsbody: GPRSDescription, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.changeOtanDescription(gprsbody);
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

export const changeOtanUserInfo = createAsyncThunk(
  "concentrator/changeOtanUserInfo",
  async (userInfo: GPRSInfoType, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.changeOtanUserInfo(userInfo);
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

export const changeOtanAtttibutesThunk = createAsyncThunk(
  "concentrator/changeOtanAtttibutesThunk",
  async (attributesInfo: OtanAttributesType, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.changeOtanAtttibutes(attributesInfo);
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

export const otanPersonalAccountSearch = createAsyncThunk(
  "concentrator/otanPersonalAccountSearch",
  async (values: string, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.otanPersonalAccountSearch(values);

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

export const getOtanMetersList = createAsyncThunk("concentrator/getOtanMetersList",
  async (params: { text: string, queryType: string, folderId: string }, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.otanMetersList(params.text, params.queryType, params.folderId);

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

export const otanConcentratorGroupControlThunk = createAsyncThunk(
  "powerConcentrators/otan/edit/taksonomy",
  async (id: string, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.otanConcentratorGroupControl(id);

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

export const saveOtanConcentratorGroupControlThunk = createAsyncThunk(
  "powerConcentrators/otan/edit/taksonomy/save",
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.saveOtanConcentratorGroupControl(fullGroupTree);

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

export const activateOtanMetersThunk = createAsyncThunk(
  "activateOtanMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.activateOtanMeters(ids);
      thunkAPI.dispatch(getOtanMetersList({ text: "", queryType: "", folderId: "" }));

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

export const deactivateOtanMetersThunk = createAsyncThunk(
  "deactivateOtanMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.deactivateOtanMeters(ids);
      thunkAPI.dispatch(getOtanMetersList({ text: "", queryType: "", folderId: "" }));

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

export const getFoldersOTAN = createAsyncThunk(
  "getFoldersList/otan",
  async (params: { text: string }, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.getFoldersOTAN(params.text);

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

export const createFolderOTAN = createAsyncThunk(
  "createFolder/otan",
  async (params: { name: string }, thunkAPI) => {
    try {
      const response = await powerMeterOtanAPI.createFolderOTAN(params.name);
      thunkAPI.dispatch(getFoldersOTAN({ text: "" }));
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