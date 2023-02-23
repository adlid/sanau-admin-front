import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotistack, pushRedirect } from "../../redirectAndNotification/redirectAndNotification.slice";
import { GPRSInfoType, DinRailType, DinRailAttributes } from "../../../../ts/types/gprs.types";
import { powerMeterDinRailAPI } from "../../../../api/concentrator/powerMeterDinRail.api";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

export const detailDinRailInfoThunk = createAsyncThunk("concentrator/detail/DinRail", async (id: string, thunkAPI) => {
  try {
    const response = await powerMeterDinRailAPI.detailDinRailInfo(id);
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

export const connectConcentratorDinRail = createAsyncThunk(
  "concentrator/create/dinRail",
  async (body: DinRailType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.connectDinRail(body);
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

export const changeDinRailAttributes = createAsyncThunk(
  "concentrator/changeDinRailAttributes",
  async (body: DinRailAttributes, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.changeDinRailAttributes(body);
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

export const changeDinRailUserInfo = createAsyncThunk(
  "concentrator/changeDinRailUserInfo",
  async (userInfo: GPRSInfoType, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.changeDinRailUserInfo(userInfo);
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

export const dinRailPersonalAccountSearch = createAsyncThunk(
  "concentrator/dinRailPersonalAccountSearch",
  async (values: string, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailPersonalAccountSearch(values);

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

export const getDinRailMetersList = createAsyncThunk("concentrator/getDinRailMetersList",
  async (params: { text: string, queryType: string, folderId: string }, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.dinRailMetersList(params.text, params.queryType, params.folderId);

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

export const activateDinRailMetersThunk = createAsyncThunk(
  "activateDinRailMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.activateDinRailMeters(ids);
      thunkAPI.dispatch(getDinRailMetersList({queryType: "", text: "", folderId: ""}));

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

export const deactivateDinRailMetersThunk = createAsyncThunk(
  "deactivateDinRailMetersThunk",
  async (ids: Array<string>, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.deactivateDinRailMeters(ids);
      thunkAPI.dispatch(getDinRailMetersList({queryType: "", text: "", folderId: ""}));

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

export const dinRailGroupControlThunk = createAsyncThunk("dinrail/edit/taksonomy", async (id: string, thunkAPI) => {
  try {
    const response = await powerMeterDinRailAPI.dinRailGroupControl(id);

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

export const saveDinRailGroupControlThunk = createAsyncThunk(
  "dinRail/edit/taksonomy/save",
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.saveDinRailGroupControl(fullGroupTree);

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

export const getFoldersDinRail = createAsyncThunk(
  "getFoldersList/dinrail",
  async (params: { text: string }, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.getFoldersDINRAIL(params.text);

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

export const createFolderDinRail = createAsyncThunk(
  "createFolder/dinrail",
  async (params: { name: string }, thunkAPI) => {
    try {
      const response = await powerMeterDinRailAPI.createFolderDINRAIL(params.name);
      thunkAPI.dispatch(getFoldersDinRail({ text: "" }));
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