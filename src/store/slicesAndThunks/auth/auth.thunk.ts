import { createAsyncThunk } from "@reduxjs/toolkit";

import { pushRedirect, addNotistack } from "../redirectAndNotification/redirectAndNotification.slice";
import { authAPI } from "../../../api/auth";
import { GlobalAdminAuthType } from "../../../ts/types/auth.types";

export const authAdmin = createAsyncThunk("authAdmin/thunk", async (adminAuthBody: GlobalAdminAuthType, thunkAPI) => {
  try {
    const response = await authAPI.authAdmin(adminAuthBody);

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("role", response.data.roleName);
    localStorage.setItem("fullName", response.data.fullName);
    localStorage.setItem("privileges", JSON.stringify(response.data.privileges));
    thunkAPI.dispatch(pushRedirect("/admin/main"));

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
});
