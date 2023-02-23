import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardState } from "./dashboard.state";
import {
  IMetersDashboardInfo,
  IMeterServicesItemProps,
  IUserDashboardInfo,
} from "../../../ts/interfaces/dashboard.interface";
import {
  getMeterInfoThunk,
  getMeterServicesThunk,
  getUserInfoThunk,
  toggleMeterServicesThunk,
} from "./dashboard.thunks";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardState,
  reducers: {
    resetDashboardState: () => {
      return dashboardState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, action: PayloadAction<IUserDashboardInfo[]>) => {
      state.userInfo = action.payload;
    });

    builder.addCase(getMeterInfoThunk.fulfilled, (state, action: PayloadAction<IMetersDashboardInfo>) => {
      state.metersInfo = action.payload;
    });

    builder.addCase(getMeterServicesThunk.fulfilled, (state, action: PayloadAction<IMeterServicesItemProps[]>) => {
      state.metersServices = action.payload;
    });

    builder.addCase(toggleMeterServicesThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.metersServices = state.metersServices.map((service) => {
        if (service.id === action.payload) return { ...service, active: !service.active };
        else return service;
      });
    });
  },
});

export const dashboardReducer = dashboardSlice.reducer;

export const { resetDashboardState } = dashboardSlice.actions;
