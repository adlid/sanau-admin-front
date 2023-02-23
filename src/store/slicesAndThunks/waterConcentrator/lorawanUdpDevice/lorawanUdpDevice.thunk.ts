import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addNotistack,
  pushRedirect,
} from '../../redirectAndNotification/redirectAndNotification.slice';
import { waterMeterLorawanUdpDeviceConcentratorAPI } from '../../../../api/concentrator/waterMeterLorawanUdpDeviceConcentratorAPI';
import {
  changeMeterDateAndTimeType,
  changeMeterImpulsesNumberType,
  changeMeterReportPeriodType,
  getConcentratorMeterParamsType,
  IWaterLorawanChangeDateTimeProps,
  ILorawanEditGatewayProps,
  searchConcentratorMeterParamsType,
  WaterCounterpartyValuesType,
  WaterDescriptionValuesType,
} from '../../../../ts/types/lorawanUdpDevice.types';
import { OrganizationTree } from '../../../../ts/types/groupcontrol.types';

//concentrator info
export const getAllConcentrators = createAsyncThunk(
  'waterConcentrators/all',
  async (_, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.getAllConcentrators();
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

export const searchWaterConcentratorsThunk = createAsyncThunk(
  'searchWaterConcentratorsThunk',
  async (query: string, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.searchConcentrators(
          query
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

export const getСoncentratorMeters = createAsyncThunk(
  'waterConcentrators/getСoncentratorMeters',
  async (params: getConcentratorMeterParamsType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.getСoncentratorMeters(
          params
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

export const searchСoncentratorMeters = createAsyncThunk(
  'waterConcentrators/searchСoncentratorMeters',
  async (params: searchConcentratorMeterParamsType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.searchСoncentratorMeters(
          params
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

export const changeMeterReportPeriodThunk = createAsyncThunk(
  'waterConcentrators/changeMeterReportPeriod',
  async (params: changeMeterReportPeriodType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.changeMeterReportPeriod(
          params
        );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
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

export const changeMeterDateAndTimeThunk = createAsyncThunk(
  'waterConcentrators/changeMeterDateAndTimeThunk',
  async (params: changeMeterDateAndTimeType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.changeMeterReportPeriod(
          params
        );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
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

export const changeMeterImpulsesNumberThunk = createAsyncThunk(
  'waterConcentrators/changeMeterImpulsesNumberThunk',
  async (params: changeMeterImpulsesNumberType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.changeMeterImpulsesNumber(
          params
        );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
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

export const getMeterReportPeriodThunk = createAsyncThunk(
  'waterConcentrators/getMeterReportPeriodThunk',
  async (meterId: string, thunkAPI) => {
    try {
      // await waterMeterLorawanUdpDeviceConcentratorAPI.readMeterReportPeriod(meterId);
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.getMeterReportPeriod(
          meterId
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

export const waterConcentratorPersonalAccountSearchThunk = createAsyncThunk(
  'waterConcentrators/edit/search',
  async (personalAccountNumber: string, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.personalAccountSearch(
          personalAccountNumber
        );

      const { active, createdAt, lastFixDate, region, id, ...otherKeys } =
        response.data;

      return otherKeys;
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

export const saveEditedWaterConcentratorDescriptionThunk = createAsyncThunk(
  'concentrator/edit/savedesc',
  async (data: WaterDescriptionValuesType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.saveEditedDescriptionWaterConcentrator(
          data
        );
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
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

export const saveEditedWaterConcentratorCounterpartyThunk = createAsyncThunk(
  'concentrator/edit/savecounter',
  async (data: WaterCounterpartyValuesType, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.saveEditedCounterpartyWaterConcentrator(
          data
        );
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
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

export const waterConcentratorGroupControlThunk = createAsyncThunk(
  'waterConcentrators/edit/taksonomy',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.waterConcentratorGroupControl(
          id
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

export const saveWaterConcentratorGroupControlThunk = createAsyncThunk(
  'waterConcentrators/edit/taksonomy/save',
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.saveWaterConcentratorGroupControl(
          fullGroupTree
        );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      thunkAPI.dispatch(
        pushRedirect(
          '/admin/concentrators/water-meter/concentrator-info?tabValue=by-lorawan-udp'
        )
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

export const getDescriptionWaterConcentratorDevEUIThunk = createAsyncThunk(
  'waterConcentrators/get/DevEUI',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.getDescriptionWaterConcentratorDevEUI(
          id
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

export const changeWaterLorawanTimeDateThunk = createAsyncThunk(
  'waterConcentrators/lorawan/changeDateTime',
  async (params: IWaterLorawanChangeDateTimeProps, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.changeWaterLorawanTimeDate(
          params
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

export const editWaterLorawanGatewayThunk = createAsyncThunk(
  'waterConcentrators/lorawan/editGateway',
  async (params: ILorawanEditGatewayProps, thunkAPI) => {
    try {
      const response =
        await waterMeterLorawanUdpDeviceConcentratorAPI.editWaterLorawanGateway(
          params
        );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return params;
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

export const updateWaterGatewayThunk = createAsyncThunk(
  'updateConcentratorsInfoThunk',
  async (_, thunkAPI) => {
    try {
      const response = await waterMeterLorawanUdpDeviceConcentratorAPI.updateWaterLorawanGateway();
      thunkAPI.dispatch(
        getAllConcentrators()
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