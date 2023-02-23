import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { powerMeterBluetoothConcentratorState } from "./bluetooth.state";
import {
  personalAccountInitialValuesType,
  GetBluetoothResponseBody,
} from "../../../../ts/types/powerMeterBluetooth.types";
import { IBluetoothConcentratorAllMeterWithoutSelect } from "../../../../ts/interfaces/powerMeterConcentrator";

import {
  connectBluetoothPersonalAccountSearch,
  activateOrDeactivateBluetoothConcentratorMeters,
  bluetoothNewFilter,
  getBluetoothInfo,
  connectConcentratorBluetooth,
  bluetoothConcentratorGroupControlThunk,
} from "./bluetooth.thunk";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

const powerMeterBluetoothConcentratorSlice = createSlice({
  name: "concentrator/bluetooth",
  initialState: powerMeterBluetoothConcentratorState,
  reducers: {
    setSortValue: (state, action: PayloadAction<any>) => {
      state.sortValue = action.payload;
    },
    setBluetoothConnectionInitialValues: (
      state,
      action: PayloadAction<{
        serialNumber: string;
        type: string;
        meterId: string;
        manufacturer: string;
        setUpOrganization: string;
      }>
    ) => {
      state.bluetoothConnectionInitialValues = action.payload;
    },
    resetBluetoothConnectionState: () => {
      return powerMeterBluetoothConcentratorState;
    },
    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMetersId = [...state.selectedMetersId, action.payload];
      if (state.bluetoothConcentratorMeters !== null) {
        state.bluetoothConcentratorMeters = {
          ...state.bluetoothConcentratorMeters,
          data: state.bluetoothConcentratorMeters.data.map((m) => {
            if (m.serialNumber === action.payload) {
              return { ...m, selected: true };
            } else {
              return m;
            }
          }),
        };
      }
    },
    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMetersId = state.selectedMetersId.filter((id) => id !== action.payload);
      if (state.bluetoothConcentratorMeters !== null) {
        state.bluetoothConcentratorMeters = {
          ...state.bluetoothConcentratorMeters,
          data: state.bluetoothConcentratorMeters.data.map((m) => {
            if (m.serialNumber === action.payload) {
              return { ...m, selected: false };
            } else {
              return m;
            }
          }),
        };
      }
    },
    selectAllMeters: (state) => {
      let ids: Array<string> = [];
      state.selectedAllMeters = true;
      if (state.bluetoothConcentratorMeters !== null) {
        state.bluetoothConcentratorMeters = {
          ...state.bluetoothConcentratorMeters,
          data: state.bluetoothConcentratorMeters.data.map((m) => {
            ids.push(m.serialNumber);
            return { ...m, selected: true };
          }),
        };
      }

      state.selectedMetersId = ids;
    },
    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMetersId = [];
      if (state.bluetoothConcentratorMeters !== null) {
        state.bluetoothConcentratorMeters = {
          ...state.bluetoothConcentratorMeters,
          data: state.bluetoothConcentratorMeters.data.map((m) => ({ ...m, selected: false })),
        };
      }
    },
    resetBluetoothConcentratorState: () => {
      return powerMeterBluetoothConcentratorState;
    },
    setUser: (state, action: PayloadAction<personalAccountInitialValuesType | null>) => {
      if (action.payload !== null) {
        state.personalAccountInitialValues = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      connectBluetoothPersonalAccountSearch.fulfilled,
      (state, action: PayloadAction<personalAccountInitialValuesType>) => {
        state.personalAccountInitialValues = action.payload;
      }
    );
    builder.addCase(connectBluetoothPersonalAccountSearch.rejected, (state) => {
      state.personalAccountInitialValues = powerMeterBluetoothConcentratorState.personalAccountInitialValues;
    });

    builder.addCase(activateOrDeactivateBluetoothConcentratorMeters.pending, (state) => {
      state.isFetchingModal = true;
    });

    builder.addCase(activateOrDeactivateBluetoothConcentratorMeters.fulfilled, (state) => {
      state.isFetchingModal = false;
      state.selectedMetersId = [];
      state.selectedAllMeters = false;
    });
    builder.addCase(
      bluetoothNewFilter.fulfilled,
      (state, action: PayloadAction<IBluetoothConcentratorAllMeterWithoutSelect>) => {
        if (state.selectedMetersId.length > 0) {
          let a = {
            ...action.payload,
            data: action.payload.data.map((m) => {
              const ivan = state.selectedMetersId.find((m2) => {
                return m2 === m.serialNumber;
              });
              if (ivan) {
                return { ...m, selected: true };
              } else {
                return { ...m, selected: false };
              }
            }),
          };
          state.bluetoothConcentratorMeters = a;
        } else {
          state.bluetoothConcentratorMeters = {
            ...action.payload,
            data: action.payload.data.map((m) => ({ ...m, selected: false })),
          };
        }
      }
    );
    builder.addCase(getBluetoothInfo.fulfilled, (state, action: PayloadAction<GetBluetoothResponseBody>) => {
      const { serialNumber, type, meterId, setUpOrganization, manufacturer, userInfo } = action.payload;
      state.bluetoothConnectionInitialValues = { serialNumber, type, meterId, setUpOrganization, manufacturer };
      state.personalAccountInitialValues = userInfo;
    });

    builder.addCase(connectConcentratorBluetooth.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentBluetoothMeterId = action.payload;
    });

    builder.addCase(
      bluetoothConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.tansonomyTree = action.payload;
      }
    );
  },
});

export const powerMeterBluetootConcentratorhReducer = powerMeterBluetoothConcentratorSlice.reducer;

export const {
  resetBluetoothConnectionState,
  setBluetoothConnectionInitialValues,
  addMetersIdToArr,
  removeMetersIdFromArr,
  setSortValue,
  selectAllMeters,
  removeSelectAllMeters,
  resetBluetoothConcentratorState,
  setUser,
} = powerMeterBluetoothConcentratorSlice.actions;
