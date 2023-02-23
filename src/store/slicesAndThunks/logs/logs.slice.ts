import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

import { getUsersLogs, getDevicesLogs, getErrorsLogs } from "./logs.thunk"
import { UsersLogsResponseType, DevicesLogsResponseType, ErrorLogsResponseType } from "../../../ts/types/logs.types"

import { logsState } from "./logs.state"


const logsSlice = createSlice({
  name: "logs",
  initialState: logsState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUsersLogs.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getDevicesLogs.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getErrorsLogs.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getUsersLogs.fulfilled, (state, action: PayloadAction<UsersLogsResponseType>) => {
        state.usersLogs = action.payload
        state.loading = false
      }
    )
    builder.addCase(
      getDevicesLogs.fulfilled, (state, action: PayloadAction<DevicesLogsResponseType>) => {
        state.deviceLogs = action.payload
        state.loading = false
      }
    )
    builder.addCase(
      getErrorsLogs.fulfilled, (state, action: PayloadAction<ErrorLogsResponseType>) => {
        state.errorsLogs = action.payload
        state.loading = false
      }
    )
    builder.addCase(getUsersLogs.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getDevicesLogs.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getErrorsLogs.rejected, (state) => {
      state.loading = false
    })
  },
});

export const logsReducers = logsSlice.reducer;

export const { } = logsSlice.actions;
