import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addNotistack,
  pushRedirect,
} from '../../redirectAndNotification/redirectAndNotification.slice';
import { powerMeterBluetoothConcentratorAPI } from '../../../../api/concentrator/powerMeterBluetoothConcentratorAPI';
import {
  ConnectPowerMeterBluetoothType,
  EditPowerMeterBluetoothType,
} from '../../../../ts/types/powerMeterBluetooth.types';
import {
  IBluetoothNewFilter,
  IActivateDeactiveBluetoothConcentrator,
} from '../../../../ts/interfaces/powerMeterConcentrator';
import { OrganizationTree } from '../../../../ts/types/groupcontrol.types';

export const connectConcentratorBluetooth = createAsyncThunk(
  'concentrator/create/bluetooth',
  async (bluetoothDeviceBody: ConnectPowerMeterBluetoothType, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.connectBluetooth(
          bluetoothDeviceBody
        );
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return response.data.id;
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

export const connectBluetoothPersonalAccountSearch = createAsyncThunk(
  'concentrator/create/bluetooth/search',
  async (personalAccountNumber1: string, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.connectBluetoothPersonalAccountSearch(
          personalAccountNumber1
        );

      const {
        active,
        createdAt,
        lastFixDate,
        region,
        id,
        serialNumber,
        type,
        ...otherKeys
      } = response.data;

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

export const activateOrDeactivateBluetoothConcentratorMeters = createAsyncThunk(
  'concentrator/bluetooth/activateBluetoothConcentratorMeters',
  async (body: IActivateDeactiveBluetoothConcentrator, thunkAPI) => {
    try {
      const { ids, value, ...items } = body;

      const response =
        await powerMeterBluetoothConcentratorAPI.activateOrDeactivateBluetoothConcentratorMeters(
          {
            ids,
            value,
          }
        );
      thunkAPI.dispatch(bluetoothNewFilter(items));
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

export const bluetoothNewFilter = createAsyncThunk(
  'concentrator/bluetooth/bluetoothNewFilter',
  async (searchBody: IBluetoothNewFilter, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.bluetoothNewFilter(searchBody);
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

export const getBluetoothInfo = createAsyncThunk(
  'concentrator/bluetooth/getBluetoothInfo',
  async (serialNumber: string, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.getBluetoothInfo(serialNumber);
      const { active, createdAt, id, lastFixDate, region, ...items } =
        response.data;
      return items;
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

export const editConnectBluetooth = createAsyncThunk(
  'concentrator/edit/bluetooth',
  async (bluetoothDeviceBody: EditPowerMeterBluetoothType, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.editConnectBluetooth(
          bluetoothDeviceBody
        );
      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: response.status,
          statusText: response.data.message,
          variant: 'success',
        })
      );

      thunkAPI.dispatch(
        pushRedirect(
          '/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-bluetooth&bluetoothPage=1'
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

export const bluetoothConcentratorGroupControlThunk = createAsyncThunk(
  'powerConcentrators/bluetooth/edit/taksonomy',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.bluetoothConcentratorGroupControl(
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

export const saveBluetoothConcentratorGroupControlThunk = createAsyncThunk(
  'powerConcentrators/bluetooth/edit/taksonomy/save',
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response =
        await powerMeterBluetoothConcentratorAPI.saveBluetoothConcentratorGroupControl(
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
          '/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device'
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
