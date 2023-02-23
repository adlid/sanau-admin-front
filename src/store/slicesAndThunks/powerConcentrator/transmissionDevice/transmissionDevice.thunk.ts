import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addNotistack,
  pushRedirect,
} from '../../redirectAndNotification/redirectAndNotification.slice';
import {
  CreateConcentratorType,
  ActivateDeactivatePopupsType,
  ChangeTimeConcentratorType,
  PowerConcentratorMeterSearch,
} from '../../../../ts/types/dataTransmissionsDevice.types';
import { powerMeterTransmissionDeviceConcentratorAPI } from '../../../../api/concentrator/powerMeterTransmissionDeviceConcentratorAPI';
import {
  IAddInfoToConcentrator,
  IEditConcentrator,
} from '../../../../ts/interfaces/powerMeterConcentrator';
import {
  ICreateConcentrtorMeter,
  IEditConcentrtorMeter,
} from '../../../../ts/interfaces/powerMeterConcentrator';
import { IUploadUSPDExcel, OrganizationTree } from '../../../../ts/types/groupcontrol.types';

export const createConcentrator = createAsyncThunk(
  'concentrator/create',
  async (concentratorBody: CreateConcentratorType, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.createConcentrator(
          concentratorBody
        );

      setTimeout(() => {
        thunkAPI.dispatch(getAllConcentratorMeters(concentratorBody));
      }, 5000);

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

export const addInfoToConcentrator = createAsyncThunk(
  'concentrator/addInfoToConcentrator',
  async (concentratorBody: IAddInfoToConcentrator, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.addInfoToConcentrator(
          concentratorBody
        );

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: 200,
          statusText: 'УСПД успешно подключено',
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

//concentrator info
export const getAllConcentrators = createAsyncThunk(
  'concentrators/all',
  async (text: string, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.getAllConcentrators(
          text
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

export const getСoncentratorMetersPower = createAsyncThunk(
  'concentrators/getСoncentratorMetersPower',
  // async (body: {id:string, serial: string}, thunkAPI) => {
  async (body: PowerConcentratorMeterSearch, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.getСoncentratorMeters(
          body
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

export const deactivateActivateConcentrator = createAsyncThunk(
  'concentrators/deactivateActivateConcentrator',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.deactivateActivateConcentrator(
          id
        );

      thunkAPI.dispatch(getAllConcentrators(''));
      thunkAPI.dispatch(
        getСoncentratorMetersPower({ id, search: '', queryType: 'serial' })
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

// activate deactivate meters thunks
export const deactivateConcentratorMeters = createAsyncThunk(
  'concentrators/deactivateConcentratorMeters',
  async (body: ActivateDeactivatePopupsType, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.deactivateConcentratorMeters(
          body.id
        );
      thunkAPI.dispatch(
        getСoncentratorMetersPower({
          id: body.concentratorId,
          search: '',
          queryType: 'serial',
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

export const activateConcentratorMeters = createAsyncThunk(
  'concentrators/activateConcentratorMeters',
  async (body: ActivateDeactivatePopupsType, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.activateConcentratorMeters(
          body.id
        );
      thunkAPI.dispatch(
        getСoncentratorMetersPower({
          id: body.concentratorId,
          search: '',
          queryType: 'serial',
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

//for concentrator connection
export const getAllConcentratorMeters = createAsyncThunk(
  'concentrator/allmeters',
  async (concentratorBody: CreateConcentratorType, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.getAllConcentratorMeters(
          concentratorBody
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

export const editToConcentrator = createAsyncThunk(
  'concentrator/editToConcentrator',
  async (concentratorBody: IEditConcentrator, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.editConcentrator(
          concentratorBody
        );

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: 200,
          statusText: 'УСПД успешно изменено',
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

export const deleteConcentratorMeter = createAsyncThunk(
  'concentrators/deleteConcentratorMeter',
  async (
    {
      meterId,
      concentratorId,
    }: {
      meterId: string;
      concentratorId: string;
    },
    thunkAPI
  ) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.deleteConcentratorMeter(
          meterId
        );
      thunkAPI.dispatch(
        getСoncentratorMetersPower({
          id: concentratorId,
          search: '',
          queryType: 'serial',
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

export const resetConcentrator = createAsyncThunk(
  'concentrators/resetConcentrator',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.resetConcentrator(id);

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: 200,
          statusText: 'УСПД перезагрузится в течение 20 секунд',
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

export const getSidebarConcentratorDate = createAsyncThunk(
  'concentrators/getSidebarConcentratorDate',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.getSidebarConcentratorDate(
          id
        );
      return response.data.date;
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

export const changeConcentratorTimeDate = createAsyncThunk(
  'concentrators/changeConcentratorTimeDate',
  async (body: ChangeTimeConcentratorType, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.changeConcentratorTimeDate(
          body
        );
      return response.data.date;
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
//

export const editConcentratorMeter = createAsyncThunk(
  'concentrators/editConcentratorMeter',
  async (concentratorBody: IEditConcentrtorMeter, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.editConcentratorMeter(
          concentratorBody
        );

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: 200,
          statusText: 'ПУ успешно изменено ',
          variant: 'success',
        })
      );
      thunkAPI.dispatch(
        pushRedirect(
          '/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device'
        )
      );
      return response.data.date;
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

export const createConcentratorNewMeter = createAsyncThunk(
  'concentrators/createConcentratorNewMeter',
  async (concentratorBody: ICreateConcentrtorMeter, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.createConcentratorNewMeter(
          concentratorBody
        );

      //notistack
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: 'ПУ успешно подключено',
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

export const uspdConcentratorGroupControlThunk = createAsyncThunk(
  'powerConcentrators/uspd/edit/taksonomy',
  async (id: string, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.uspdConcentratorGroupControl(
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

export const saveUSPDConcentratorGroupControlThunk = createAsyncThunk(
  'powerConcentrators/uspd/edit/taksonomy/save',
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response =
        await powerMeterTransmissionDeviceConcentratorAPI.saveUSDPConcentratorGroupControl(
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

export const uploadUSPDExcelThunk = createAsyncThunk(
  'powerConcentrators/uspd/upload/excel',
  async (data: FormData, thunkAPI) => {
    try {
      const response = await powerMeterTransmissionDeviceConcentratorAPI.uploadUSPDConcentratorExcel(data);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: 'Данные успешно загружены',
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


export const updateMeterNameThunk = createAsyncThunk(
  'updateMeterNameThunk',
  async (data: { id: string, type: string, meterName: string }, thunkAPI) => {
    try {
      const response = await powerMeterTransmissionDeviceConcentratorAPI.updateMeterName(data);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: 'Данные успешно загружены',
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
)
