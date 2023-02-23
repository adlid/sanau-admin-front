import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { powerMeterLorawanUdpDeviceConcentratorState } from "./lorawanUdpDevice.state";
import {
  editPowerLorawanGatewayThunk,
  getDescriptionPowerConcentratorDevEUIThunk,
  getLastCheckDateThunk,
  getMeterInfoByDevEUIThunk,
  getPowerLorawanAllConcentrators,
  getPowerLorawanСoncentratorMeters,
  powerConcentratorGroupControlThunk,
  powerConcentratorPersonalAccountSearchThunk,
  searchPowerLorawanAllConcentrators,
  searchPowerLorawanСoncentratorMeters,
  toggleLorawanUdpRealyThunk,
  updatePowerGatewayThunk,
} from "./lorawanUdpDevice.thunk";
import {
  ConcentratorItemType,
  ConcentratorMeterType,
  ConcentratorMeters,
  WaterPersonalAccountInitialValuesType,
  ILoraMeterInfo,
} from "../../../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

const powerMeterLorawanUdpDeviceConcentratorSlice = createSlice({
  name: "powerConcentrator/lorawan",
  initialState: powerMeterLorawanUdpDeviceConcentratorState,
  reducers: {
    resetEditConcentratorState: () => {
      return powerMeterLorawanUdpDeviceConcentratorState;
    },

    setPowerLorawanSelectedConcentrator: (state, action: PayloadAction<ConcentratorItemType>) => {
      state.selectedConcentrator = action.payload;
    },

    setSelectedMeterObj: (state, action: PayloadAction<ConcentratorMeterType>) => {
      state.selectedMeterObj = action.payload;
    },

    resetConcentratorState: () => {
      return powerMeterLorawanUdpDeviceConcentratorState;
    },

    // meters

    addOneMeterIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [action.payload];
    },

    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [...state.selectedMeters, action.payload];
      state.selectedConcentratorMeters = {
        ...state.selectedConcentratorMeters!,
        data: state.selectedConcentratorMeters!.data.map((m) => {
          if (m.id === action.payload) {
            return { ...m, selected: true };
          } else {
            return m;
          }
        }),
      };
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.selectedConcentratorMeters = {
        ...state.selectedConcentratorMeters!,
        data: state.selectedConcentratorMeters!.data.map((m) => {
          if (m.id === action.payload) {
            return { ...m, selected: false };
          } else {
            return m;
          }
        }),
      };
    },

    selectAllMeters: (state) => {
      let ids: Array<string> = [];
      state.selectedAllMeters = true;
      state.selectedConcentratorMeters = {
        ...state.selectedConcentratorMeters!,
        data: state.selectedConcentratorMeters!.data.map((m) => {
          ids.push(m.id);
          return { ...m, selected: true };
        }),
      };
      state.selectedMeters = ids;
    },

    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMeters = [];
      state.selectedConcentratorMeters = {
        ...state.selectedConcentratorMeters,
        data: state.selectedConcentratorMeters?.data.map((m) => {
          return { ...m, selected: false };
        }),
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getPowerLorawanAllConcentrators.fulfilled,
      (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
        state.allConcentrators = action.payload;
      }
    );

    builder.addCase(
      searchPowerLorawanAllConcentrators.fulfilled,
      (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
        state.allConcentrators = action.payload;
      }
    );

    builder.addCase(getPowerLorawanСoncentratorMeters.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(getPowerLorawanСoncentratorMeters.fulfilled, (state, action: PayloadAction<ConcentratorMeters>) => {
      // state.selectedMeters = [];
      state.selectedConcentratorMeters = {
        ...action.payload,
        data: action.payload.data.map((m) => ({ ...m, selected: false })),
      };

      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(getPowerLorawanСoncentratorMeters.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(searchPowerLorawanСoncentratorMeters.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(
      searchPowerLorawanСoncentratorMeters.fulfilled,
      (state, action: PayloadAction<ConcentratorMeters>) => {
        // state.selectedMeters = [];
        state.selectedConcentratorMeters = {
          ...action.payload,
          data: action.payload.data.map((m) => ({ ...m, selected: state.selectedMeters.includes(m.id) })),
        };

        state.isFetchingSelectedConcentratorMeters = false;
      }
    );

    builder.addCase(searchPowerLorawanСoncentratorMeters.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false;
    });

    builder.addCase(
      powerConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.tansonomyTree = action.payload;
      }
    );

    builder.addCase(
      powerConcentratorPersonalAccountSearchThunk.fulfilled,
      (state, action: PayloadAction<WaterPersonalAccountInitialValuesType>) => {
        state.personalAccountInitialValues = action.payload;
      }
    );

    builder.addCase(getDescriptionPowerConcentratorDevEUIThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.devEUI = action.payload.devEUI;
    });

    builder.addCase(getMeterInfoByDevEUIThunk.fulfilled, (state, action: PayloadAction<ILoraMeterInfo>) => {
      state.loraMeterInfo = action.payload;
    });

    builder.addCase(toggleLorawanUdpRealyThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.selectedMeterObj) return;
      state.selectedMeterObj = { ...state.selectedMeterObj, relay: action.payload.status };
    });

    builder.addCase(getLastCheckDateThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (!state.selectedMeterObj) return;
      state.selectedMeterObj = { ...state.selectedMeterObj, currentTime: action.payload.date };
    });

    builder.addCase(editPowerLorawanGatewayThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.allConcentrators = state.allConcentrators.map((concentrator) => {
        if (concentrator.id === action.payload.id)
          return { ...concentrator, city: action.payload.city, address: action.payload.address };
        else return concentrator;
      });
    });

    builder.addCase(updatePowerGatewayThunk.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true
    });
    builder.addCase(updatePowerGatewayThunk.fulfilled, (state) => {
      state.isFetchingSelectedConcentratorMeters = false
    });
    builder.addCase(updatePowerGatewayThunk.rejected, (state) => {
      state.isFetchingSelectedConcentratorMeters = false
    })
  },
});

export const powerMeterLorawanUdpDeviceReducer = powerMeterLorawanUdpDeviceConcentratorSlice.reducer;

export const {
  selectAllMeters,
  removeSelectAllMeters,
  addOneMeterIdToArr,
  addMetersIdToArr,
  removeMetersIdFromArr,
  resetEditConcentratorState,
  resetConcentratorState,
  setPowerLorawanSelectedConcentrator,
  setSelectedMeterObj,
} = powerMeterLorawanUdpDeviceConcentratorSlice.actions;
