import { createAsyncThunk } from '@reduxjs/toolkit';
import { groupControlAPI } from '../../../api/groupControl.instance';
import {
  IGetGroupTreeItemMaterIndicatorsListProps,
  IGetGroupTreeSearchParams,
  IGroupControlItemData,
  ISaveGroupItemMeterIndicatorsProps,
  OrganizationTree,
} from '../../../ts/types/groupcontrol.types';
import {
  addNotistack,
  pushRedirect,
} from '../redirectAndNotification/redirectAndNotification.slice';

export const getGroupTreeByTypeThunk = createAsyncThunk(
  'getGroupTreeByTypeThunk',
  async (type: string, thunkAPI) => {
    try {
      const response = await groupControlAPI.getGroupTreeByType(type);

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

export const getGroupTreeBySearchThunk = createAsyncThunk(
  'getGroupTreeBySearchThunk',
  async (params: IGetGroupTreeSearchParams, thunkAPI) => {
    try {
      const response = await groupControlAPI.getGroupTreeBySearch(params);
 
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

export const saveEditedGroupTreeThunk = createAsyncThunk(
  'saveEditedGroupTreeThunk',
  async (fullGroupTree: OrganizationTree, thunkAPI) => {
    try {
      const response = await groupControlAPI.saveEditedGroupTree(fullGroupTree);

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

export const createGroupTreeItemThunk = createAsyncThunk(
  'createGroupTreeItemThunk',
  async (itemData: IGroupControlItemData, thunkAPI) => {
    try {
      const response = await groupControlAPI.createGroupTreeItem(itemData);

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

export const getGroupTreeWithNewItemByKeyThunk = createAsyncThunk(
  'getGroupTreeWithNewItemByKeyThunk',
  async (key: string, thunkAPI) => {
    try {
      const response = await groupControlAPI.getGroupTreeWithNewItemByKey(key);

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

export const deleteGroupTreeItemThunk = createAsyncThunk(
  'deleteGroupTreeItemThunk',
  async (key: string, thunkAPI) => {
    try {
      const response = await groupControlAPI.deleteGroupTreeItem(key);

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      return key;
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

export const getDetailGroupTreeItemThunk = createAsyncThunk(
  'getDetailGroupTreeItemThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await groupControlAPI.getDetailGroupTreeItem(id);

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

export const editGroupTreeItemThunk = createAsyncThunk(
  'editGroupTreeItemThunk',
  async (itemData: IGroupControlItemData, thunkAPI) => {
    try {
      const response = await groupControlAPI.editGroupTreeItem(itemData);

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

export const getGroupTreeItemMaterIndicatorsListThunk = createAsyncThunk(
  'getGroupTreeItemMaterIndicatorsListThunk',
  async (params: IGetGroupTreeItemMaterIndicatorsListProps, thunkAPI) => {
    try {
      const response =
        await groupControlAPI.getGroupTreeItemMaterIndicatorsList(params);

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

export const saveGroupItemMeterIndicatorsThunk = createAsyncThunk(
  'saveGroupItemMeterIndicatorsThunk',
  async (params: ISaveGroupItemMeterIndicatorsProps, thunkAPI) => {
    try {
      const response = await groupControlAPI.saveGroupItemMeterIndicators(
        params
      );

      thunkAPI.dispatch(
        addNotistack({
          statusCode: '',
          statusText: response.data.message,
          variant: 'success',
        })
      );

      thunkAPI.dispatch(
        pushRedirect('/admin/system/groups-control?tabValue=power&state=show')
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
