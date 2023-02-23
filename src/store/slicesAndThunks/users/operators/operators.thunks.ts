import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  pushRedirect,
  addNotistack,
} from '../../redirectAndNotification/redirectAndNotification.slice';
import {
  IActivateOperatorProps,
  IChangeOperatorRightsProps,
  ICreateOperatorProps,
  ICreateTemplateProps,
  IDetailOperatorProps,
  IDetailTemplateProps,
  IEditOperatorProps,
  IEditTemplateProps,
  IOperatorsListProps,
} from '../../../../ts/interfaces/users.interface';
import {
  operatorsAPI,
  templatesAPI,
} from '../../../../api/users/operators/operatos.api';

export const operatorProfileThunk = createAsyncThunk(
  'operator/profile',
  async (_, thunkAPI) => {
    try {
      const response = await operatorsAPI.getOwnInfo();
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

export const operatorChangePasswordThunk = createAsyncThunk(
  'operator/changePassword',
  async (data: any, thunkAPI) => {
    try {
      const response = await operatorsAPI.changePassword(data);
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

export const operatorsFilteredListThunk = createAsyncThunk(
  'operatorsFilteredListThunk',
  async (values: IOperatorsListProps, thunkAPI) => {
    try {
      const response = await operatorsAPI.operatorsListFilter(values);
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

export const operatorsListThunk = createAsyncThunk(
  'operatorsListThunk',
  async (pageNum: number, thunkAPI) => {
    try {
      const response = await operatorsAPI.operatorsList(pageNum);
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

export const createOperatorThunk = createAsyncThunk(
  'createOperatorThunk',
  async (values: ICreateOperatorProps, thunkAPI) => {
    try {
      const response = await operatorsAPI.create(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/operators?page=1'));
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

export const deleteOperatorThunk = createAsyncThunk(
  'deleteOperatorThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await operatorsAPI.delete(id);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return id;
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

export const detailOperatorThunk = createAsyncThunk(
  'detailOperatorThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await operatorsAPI.detail(id);

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

export const editOperatorThunk = createAsyncThunk(
  'createOperatorThunk',
  async (values: IEditOperatorProps, thunkAPI) => {
    try {
      const response = await operatorsAPI.edit(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/operators?page=1'));
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

export const blockUnblockOperatorThunk = createAsyncThunk(
  'blockUnblockOperatorThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await operatorsAPI.blockUnblock(id);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return id;
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

export const activateOperatorThunk = createAsyncThunk(
  'activateOperatorThunk',
  async (values: IActivateOperatorProps, thunkAPI) => {
    try {
      const response = await operatorsAPI.activate(values);

      thunkAPI.dispatch(pushRedirect('/'));
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

export const changeOperatorsRightsThunk = createAsyncThunk(
  'changeOperatorsRightsThunk',
  async (values: IChangeOperatorRightsProps, thunkAPI) => {
    try {
      const response = await operatorsAPI.changeRights(values);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );
      return values;
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

export const templatesListThunk = createAsyncThunk(
  'templatesListThunk',
  async (_, thunkAPI) => {
    try {
      const response = await templatesAPI.templatesList();

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

export const createAccessTemplatesThunk = createAsyncThunk(
  'createAccessTemplatesThunk',
  async (values: ICreateTemplateProps, thunkAPI) => {
    try {
      const response = await templatesAPI.create(values);
      thunkAPI.dispatch(pushRedirect('/admin/users/access-templates?page=1'));
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data,
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

export const detailAccessTemplatesThunk = createAsyncThunk(
  'detailAccessTemplatesThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await templatesAPI.detail(id);

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

export const editAccessTemplatesThunk = createAsyncThunk(
  'editAccessTemplatesThunk',
  async (values: IEditTemplateProps, thunkAPI) => {
    try {
      const response = await templatesAPI.edit(values);
      thunkAPI.dispatch(pushRedirect('/admin/users/access-templates?page=1'));
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

export const deleteTemplateThunk = createAsyncThunk(
  'deleteTemplateThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await templatesAPI.delete(id);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return id;
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

export const searchTemplateThunk = createAsyncThunk(
  'searchTemplateThunk',
  async (name: string, thunkAPI) => {
    try {
      const response = await templatesAPI.search(name);

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
