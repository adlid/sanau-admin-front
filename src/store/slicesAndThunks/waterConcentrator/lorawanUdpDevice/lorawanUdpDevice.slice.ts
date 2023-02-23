import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { waterMeterLorawanUdpDeviceConcentratorState } from "./lorawanUdpDevice.state";
import {
  getAllConcentrators,
  getСoncentratorMeters,
  getMeterReportPeriodThunk,
  waterConcentratorGroupControlThunk,
  waterConcentratorPersonalAccountSearchThunk,
  getDescriptionWaterConcentratorDevEUIThunk,
  searchСoncentratorMeters,
  searchWaterConcentratorsThunk,
  editWaterLorawanGatewayThunk,
  updateWaterGatewayThunk,
} from "./lorawanUdpDevice.thunk";
import {
  AllConcentratorMetersType,
  ConcentratorItemType,
  ConcentratorMeterType,
  ConcentratorMeters,
  getMeterReportPeriodType,
  WaterPersonalAccountInitialValuesType,
} from "../../../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

const waterMeterLorawanUdpDeviceConcentratorSlice = createSlice({
  name: "waterConcentrator/lorawan",
  initialState: waterMeterLorawanUdpDeviceConcentratorState,
  reducers: {
    resetEditConcentratorState: () => {
      return waterMeterLorawanUdpDeviceConcentratorState;
    },

    setSelectedConcentrator: (state, action: PayloadAction<ConcentratorItemType>) => {
      state.selectedConcentrator = action.payload;
    },

    setSelectedMeterObj: (state, action: PayloadAction<ConcentratorMeterType>) => {
      state.selectedMeterObj = action.payload;
    },

    resetConcentratorState: () => {
      return waterMeterLorawanUdpDeviceConcentratorState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllConcentrators.fulfilled, (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
      state.allConcentrators = action.payload;
    });

    builder.addCase(
      searchWaterConcentratorsThunk.fulfilled,
      (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
        state.allConcentrators = action.payload;
      }
    );

    builder.addCase(getСoncentratorMeters.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(getСoncentratorMeters.fulfilled, (state, action: PayloadAction<ConcentratorMeters>) => {
      state.selectedConcentratorMeters = action.payload;
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(getСoncentratorMeters.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(searchСoncentratorMeters.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(searchСoncentratorMeters.fulfilled, (state, action: PayloadAction<ConcentratorMeters>) => {
      state.selectedConcentratorMeters = action.payload;
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(searchСoncentratorMeters.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(getMeterReportPeriodThunk.fulfilled, (state, action: PayloadAction<getMeterReportPeriodType>) => {
      state.currentPeriod = action.payload.period;
    });

    builder.addCase(
      waterConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.tansonomyTree = action.payload;
      }
    );

    builder.addCase(
      waterConcentratorPersonalAccountSearchThunk.fulfilled,
      (state, action: PayloadAction<WaterPersonalAccountInitialValuesType>) => {
        state.personalAccountInitialValues = action.payload;
      }
    );

    builder.addCase(getDescriptionWaterConcentratorDevEUIThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.devEUI = action.payload.devEUI;
    });

    builder.addCase(editWaterLorawanGatewayThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.allConcentrators = state.allConcentrators.map((concentrator) => {
        if (concentrator.id === action.payload.id)
          return { ...concentrator, city: action.payload.city, address: action.payload.address };
        else return concentrator;
      });
    });

    builder.addCase(updateWaterGatewayThunk.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });
    builder.addCase(updateWaterGatewayThunk.fulfilled, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });
    builder.addCase(updateWaterGatewayThunk.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });
  },
});

export const waterMeterLorawanUdpDeviceReducer = waterMeterLorawanUdpDeviceConcentratorSlice.reducer;

export const { resetEditConcentratorState, resetConcentratorState, setSelectedConcentrator, setSelectedMeterObj } =
  waterMeterLorawanUdpDeviceConcentratorSlice.actions;
