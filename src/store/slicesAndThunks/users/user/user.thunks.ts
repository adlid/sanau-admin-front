import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../../../api/users/user/user";
import { addNotistack } from "../../redirectAndNotification/redirectAndNotification.slice";

export const userProfileThunk = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.getUserInfo();
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

export const userAuthHistoryThunk = createAsyncThunk(
  "user/authHistory",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.getAuthHistory();
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

export const editProfileUser = createAsyncThunk(
  "editProfileUser",
  async (
    values: {
      id: string;
      firstname: string;
      lastname: string;
      fathersname: string;
      phoneNumber: string | number;
    },
    thunkAPI
  ) => {
    try {
      const res = await userAPI.edit(values);
      thunkAPI.dispatch(
        addNotistack({
          statusCode: "",
          statusText: res.data.message,
          variant: "success",
        })
      );
      return res.data;
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
