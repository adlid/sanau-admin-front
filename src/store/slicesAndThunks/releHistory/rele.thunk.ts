import { createAsyncThunk } from "@reduxjs/toolkit";
import { releHistoryAPI } from "../../../api/releHistory";
import { addNotistack } from "../redirectAndNotification/redirectAndNotification.slice";

export const releHistoryThunk = createAsyncThunk(
  "releHistory",
  async (_, thunkAPI) => {
    try {
      const response = await releHistoryAPI.getReleHistory();
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
