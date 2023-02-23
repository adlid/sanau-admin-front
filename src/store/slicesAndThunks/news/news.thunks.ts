import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  pushRedirect,
  addNotistack,
} from '../redirectAndNotification/redirectAndNotification.slice';
import { newsAPI } from '../../../api/news.api';

export const newsSearchListThunk = createAsyncThunk(
  'newsSearchListThunk',
  async (searchParams: any, thunkAPI) => {
    try {
      const response = await newsAPI.newsSearchList(searchParams);
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

export const detailNewsThunk = createAsyncThunk(
  'detailNewsThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await newsAPI.detail(id);

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

export const createNewsThunk = createAsyncThunk(
  'createNewsThunk',
  async (values: any, thunkAPI) => {
    try {
      const response = await newsAPI.create(values);

      thunkAPI.dispatch(pushRedirect('/admin/news?page=1'));
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

export const editNewsThunk = createAsyncThunk(
  'editNewsThunk',
  async (params: any, thunkAPI) => {
    try {
      const response = await newsAPI.edit(params);

      thunkAPI.dispatch(pushRedirect('/admin/news?page=1'));
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

export const changeVisibilityNewsThunk = createAsyncThunk(
  'changeVisibilityNewsThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await newsAPI.changeVisibility(id);

      thunkAPI.dispatch(pushRedirect('/admin/news?page=1'));
      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: 'Видимость изменена',
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

export const deleteNewsThunk = createAsyncThunk(
  'deleteNewsThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await newsAPI.delete(id);

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
