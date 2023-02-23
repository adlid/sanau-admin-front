import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { monitoringState } from "./monitoring.state";
import { getMonitoringData } from "./monitoring.thunk";
import { MonitoringDataResponse } from "../../../ts/types/monitoring.types";

const monitoringSlice = createSlice({
  name: "monitoring",
  initialState: monitoringState,
  reducers: {
    resetMonitoringState: () => {
      return monitoringState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMonitoringData.fulfilled, (state, action: PayloadAction<MonitoringDataResponse>) => {
      state.monitoringData = action.payload;
    });
  },
});

export const { resetMonitoringState } = monitoringSlice.actions;
export const monitoringReducer = monitoringSlice.reducer;
