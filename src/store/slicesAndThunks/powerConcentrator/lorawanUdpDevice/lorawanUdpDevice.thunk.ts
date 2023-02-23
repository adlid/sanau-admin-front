import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotistack, pushRedirect } from "../../redirectAndNotification/redirectAndNotification.slice";
import { powerMeterLorawanUdpDeviceConcentratorAPI } from "../../../../api/concentrator/powerMeterLorawanUdpDeviceConcentratorAPI";
import {
  ActivateDeactivatePopupsType,
  getConcentratorMeterParamsType,
  ILorawanEditGatewayProps,
  searchConcentratorMeterParamsType,
  WaterCounterpartyValuesType,
  WaterDescriptionValuesType,
} from "../../../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import { IRelayToggle } from "../../../../ts/interfaces/powerMeterConcentrator";

//concentrator info
export const getPowerLorawanAllConcentrators = createAsyncThunk(
  "powerConcentrators/lorawan-udp/all",
  async (_, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.getAllConcentrators();
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

export const searchPowerLorawanAllConcentrators = createAsyncThunk(
  "powerConcentrators/lorawan-udp/search",
  async (query: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.searchConcentrators(query);
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

export const getPowerLorawanСoncentratorMeters = createAsyncThunk(
  "powerConcentrators/lorawan-udp/getСoncentratorMeters",
  async (params: getConcentratorMeterParamsType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.getLorawanСoncentratorMeters(params);

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

export const searchPowerLorawanСoncentratorMeters = createAsyncThunk(
  "powerConcentrators/lorawan-udp/searchСoncentratorMeters",
  async (params: searchConcentratorMeterParamsType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.searchLorawanСoncentratorMeters(params);

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

export const powerConcentratorPersonalAccountSearchThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/edit/search",
  async (personalAccountNumber: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.personalAccountSearch(personalAccountNumber);

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

export const saveEditedPowerConcentratorDescriptionThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/edit/savedesc",
  async (data: WaterDescriptionValuesType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.saveEditedDescriptionPowerConcentrator(data);
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

export const saveEditedPowerConcentratorCounterpartyThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/edit/savecounter",
  async (data: WaterCounterpartyValuesType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.saveEditedCounterpartyPowerConcentrator(data);
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

export const powerConcentratorGroupControlThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/edit/taksonomy",
  async (id: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.powerConcentratorGroupControl(id);

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

export const savePowerConcentratorGroupControlThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/edit/taksonomy/save",
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.savePowerConcentratorGroupControl(fullGroupTree);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );

      thunkAPI.dispatch(
        pushRedirect("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-lorawan-udp")
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

export const getDescriptionPowerConcentratorDevEUIThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/get/DevEUI",
  async (id: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.getDescriptionPowerConcentratorDevEUI(id);

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

export const toggleLorawanUdpRealyThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/relay/toggle",
  async (body: IRelayToggle, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.responseAnswerLoravanRelay(body);

      return { id: body.id, status: response.data.status };
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

export const getLastCheckDateThunk = createAsyncThunk(
  "powerConcentrators/lorawan-udp/lastCheckDate",
  async (body: IRelayToggle, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.responseAnswerLoravanRelay(body);

      return { id: body.id, date: response.data.date };
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

export const editPowerLorawanGatewayThunk = createAsyncThunk(
  "powerConcentrators/lorawan/editGateway",
  async (params: ILorawanEditGatewayProps, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.editPowerLorawanGateway(params);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: response.data.message,
          variant: "success",
        })
      );

      return params;
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

export const getMeterInfoByDevEUIThunk = createAsyncThunk(
  "powerConcentrators/lorawan/getMeterInfo",
  async (devEUI: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.getMeterInfoByDevEUI(devEUI);

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

export const deactivateActivateLoraConcentrator = createAsyncThunk(
  "concentrators/deactivateActivateLoraConcentrator",
  async (id: string, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.deactivateActivateLoraConcentrator(id);

      thunkAPI.dispatch(getPowerLorawanAllConcentrators());
      thunkAPI.dispatch(
        searchPowerLorawanСoncentratorMeters({
          id: id,
          page: 1,
          query: "",
          type: "name",
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

export const deactivateLoraConcentratorMeters = createAsyncThunk(
  "concentrators/deactivateLoraConcentratorMeters",
  async (body: ActivateDeactivatePopupsType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.deactivateLoraConcentratorMeters(body.id);
      thunkAPI.dispatch(
        searchPowerLorawanСoncentratorMeters({
          id: body.concentratorId,
          page: 1,
          query: "",
          type: "name",
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

export const activateLoraConcentratorMeters = createAsyncThunk(
  "concentrators/activateLoraConcentratorMeters",
  async (body: ActivateDeactivatePopupsType, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.activateLoraConcentratorMeters(body.id);
      thunkAPI.dispatch(
        searchPowerLorawanСoncentratorMeters({
          id: body.concentratorId,
          page: 1,
          query: "",
          type: "name",
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


export const updatePowerGatewayThunk = createAsyncThunk(
  'updatePowerGatewayThunk',
  async (_, thunkAPI) => {
    try {
      const response = await powerMeterLorawanUdpDeviceConcentratorAPI.updatePowerGateway();
      thunkAPI.dispatch(
        getPowerLorawanAllConcentrators()
      )

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: "Шлюзы успешно обновлены",
          variant: 'success',
        })
      );
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
)