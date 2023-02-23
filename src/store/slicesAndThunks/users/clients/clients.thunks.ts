import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  pushRedirect,
  addNotistack,
} from '../../redirectAndNotification/redirectAndNotification.slice';
import {
  ICreateClientProps,
  IEditClientProps,
  IGetClientsFilteredListProps,
} from '../../../../ts/interfaces/users.interface';
import { clientsAPI } from '../../../../api/users/clients/clients.api';

export const clientsFilteredListThunk = createAsyncThunk(
  'clientsFilteredListThunk',
  async (values: IGetClientsFilteredListProps, thunkAPI) => {
    try {
      const response = await clientsAPI.clientsListFilter(values);
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

export const createClientYLThunk = createAsyncThunk(
  'createClientThunk',
  async (values: ICreateClientProps, thunkAPI) => {
    try {
      const response = await clientsAPI.createYL(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/clients?page=1'));
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

export const createClientFLThunk = createAsyncThunk(
  'createClientThunk',
  async (values: ICreateClientProps, thunkAPI) => {
    try {
      const response = await clientsAPI.createFL(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/clients?page=1'));
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

export const deleteClientThunk = createAsyncThunk(
  'deleteClientThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await clientsAPI.deactivate(id);

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

export const detailClientThunk = createAsyncThunk(
  'detailClientThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await clientsAPI.detail(id);

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

export const editClientFLThunk = createAsyncThunk(
  'editClientFLThunk',
  async (values: IEditClientProps, thunkAPI) => {
    try {
      const response = await clientsAPI.editFL(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/clients?page=1'));
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

export const editClientYLThunk = createAsyncThunk(
  'editClientYLThunk',
  async (values: IEditClientProps, thunkAPI) => {
    try {
      const response = await clientsAPI.editYL(values);

      thunkAPI.dispatch(pushRedirect('/admin/users/clients?page=1'));
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

export const blockUnblockClientThunk = createAsyncThunk(
  'blockUnblockClientThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await clientsAPI.blockUnblock(id);

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
