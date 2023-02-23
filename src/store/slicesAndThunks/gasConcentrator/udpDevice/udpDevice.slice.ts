import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gasMeterUdpDeviceConcentratorState } from "./udpDevice.state";
import {
  getAllConcentrators,
  getСoncentratorMeters,
  gasConcentratorGroupControlThunk,
  gasConcentratorPersonalAccountSearchThunk,
  getDescriptionGasConcentratorBarcodeThunk,
} from "./udpDevice.thunk";
import {
  GasConcentratorItemType,
  GasConcentratorMeterType,
  GasPersonalAccountInitialValuesType,
} from "../../../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

const gasMeterUdpDeviceConcentratorSlice = createSlice({
  name: "gasConcentrator/udp",
  initialState: gasMeterUdpDeviceConcentratorState,
  reducers: {
    resetEditConcentratorState: () => {
      return gasMeterUdpDeviceConcentratorState;
    },

    setSelectedConcentrator: (state, action: PayloadAction<GasConcentratorItemType>) => {
      state.selectedConcentrator = action.payload;
    },

    setSelectedMeterObj: (state, action: PayloadAction<GasConcentratorMeterType>) => {
      state.selectedMeterObj = action.payload;
    },

    addIdToSelectedList: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [...state.selectedMeters, action.payload];
    },

    removeIdFromSelectedList: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
    },

    selectAllMeters: (state) => {
      const ids: string[] = [];
      state.selectedConcentratorMeters?.data.map((meter: any) => {
        if (!state.selectedMeters.includes(meter.id)) ids.push(meter.id);
      });
      state.selectedMeters = [...state.selectedMeters, ...ids];
    },

    removeAllMeters: (state) => {
      let selectedIds: string[] = [...state.selectedMeters];
      state.selectedConcentratorMeters?.data.map((meter: any) => {
        if (selectedIds.includes(meter.id)) selectedIds = selectedIds.filter((id) => id !== meter.id);
      });
      state.selectedMeters = selectedIds;
    },

    resetConcentratorState: () => {
      return gasMeterUdpDeviceConcentratorState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllConcentrators.fulfilled, (state, action: PayloadAction<Array<GasConcentratorItemType>>) => {
      state.allConcentrators = action.payload;
    });

    builder.addCase(getСoncentratorMeters.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(getСoncentratorMeters.fulfilled, (state, action: PayloadAction<GasConcentratorMeterType[]>) => {
      state.selectedConcentratorMeters = {
        data: action.payload,
        page: 1,
        size: 0,
        hasNext: false,
        totalPage: 0,
        totalElementsOnPage: 0,
        elementsSize: 0,
      };

      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(getСoncentratorMeters.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(
      gasConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.tansonomyTree = action.payload;
      }
    );

    builder.addCase(
      gasConcentratorPersonalAccountSearchThunk.fulfilled,
      (state, action: PayloadAction<GasPersonalAccountInitialValuesType>) => {
        state.personalAccountInitialValues = action.payload;
      }
    );

    builder.addCase(getDescriptionGasConcentratorBarcodeThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.barcode = action.payload.barcode;
    });
  },
});

export const gasMeterUdpDeviceReducer = gasMeterUdpDeviceConcentratorSlice.reducer;

export const {
  resetEditConcentratorState,
  resetConcentratorState,
  setSelectedConcentrator,
  setSelectedMeterObj,
  addIdToSelectedList,
  removeIdFromSelectedList,
  selectAllMeters,
  removeAllMeters,
} = gasMeterUdpDeviceConcentratorSlice.actions;
