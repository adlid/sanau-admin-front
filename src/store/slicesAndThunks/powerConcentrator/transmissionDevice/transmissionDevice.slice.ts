import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { powerMeterTransmissionDeviceConcentratorState } from "./transmissionDevice.state";
import {
  getAllConcentratorMeters,
  addInfoToConcentrator,
  getAllConcentrators,
  getСoncentratorMetersPower,
  createConcentrator,
  editToConcentrator,
  resetConcentrator,
  getSidebarConcentratorDate,
  changeConcentratorTimeDate,
  uspdConcentratorGroupControlThunk,
  createConcentratorNewMeter,
  uploadUSPDExcelThunk,
} from "./transmissionDevice.thunk";
import {
  AllConcentratorMetersType,
  CreateConcentratorType,
  ConcentratorItemType,
  ConcentratorMeterType,
  ScheduleType,
} from "../../../../ts/types/dataTransmissionsDevice.types";
import { DateType } from "../../../../ts/types/indication.types";
import { ICreateConcentrtorMeter, IMeterSettingsInitialValues } from "../../../../ts/interfaces/powerMeterConcentrator";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

const powerMeterTransmissionDeviceConcentratorSlice = createSlice({
  name: "concentrator",
  initialState: powerMeterTransmissionDeviceConcentratorState,
  reducers: {
    getAllConcentratorIPandPort: (state, action: PayloadAction<CreateConcentratorType>) => {
      state.concentratorIPandPort = action.payload;
    },
    resetConcentratorState: () => {
      return powerMeterTransmissionDeviceConcentratorState;
    },
    setSelectedConcentrator: (state, action: PayloadAction<ConcentratorItemType>) => {
      state.selectedConcentrator = action.payload;
    },
    setSelectedMeterObj: (state, action: PayloadAction<ConcentratorMeterType>) => {
      state.selectedMeterObj = action.payload;
    },
    addOneMeterIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [action.payload];
    },
    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      if(!state.selectedMeters.includes(action.payload)) {
        state.selectedMeters = [...state.selectedMeters, action.payload];
      }
      state.selectedConcentratorMeters = state.selectedConcentratorMeters.map((m) => {
        if (m.id === action.payload) {
          return { ...m, selected: true };
        } else {
          return m;
        }
      });
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.selectedConcentratorMeters = state.selectedConcentratorMeters.map((m) => {
        if (m.id === action.payload) {
          return { ...m, selected: false };
        } else {
          return m;
        }
      });
    },
    selectAllMeters: (state) => {
      let ids: Array<string> = [];
      state.selectedAllMeters = true;
      state.selectedConcentratorMeters = state.selectedConcentratorMeters.map((m) => {
        ids.push(m.id);
        return { ...m, selected: true };
      });
      state.selectedMeters = ids;
    },
    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMeters = [];
      state.selectedConcentratorMeters = state.selectedConcentratorMeters.map((m) => {
        return { ...m, selected: false };
      });
    },

    isFetchingModalAC: (state, action: PayloadAction<boolean>) => {
      state.isFetchingModal = action.payload;
    },
    setMeterType: (state, action: PayloadAction<any>) => {
      state.meterType = action.payload;
    },
    setScheduleValues: (state, action: PayloadAction<ScheduleType>) => {
      state.schedule = action.payload;
    },
    toggleIsConcentratorReset: (state, action: PayloadAction<boolean>) => {
      state.isConcentratorReset = action.payload;
    },
    toggleIsConcentratorChangeDate: (state, action: PayloadAction<boolean>) => {
      state.isConcentratorChangeDate = action.payload;
      state.sideBarConcentratorDate = null;
    },
    toggleIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setMeterSettings: (state, action: PayloadAction<ICreateConcentrtorMeter>) => {
      state.meterSettings = action.payload;
    },
    setMeterSettingsInitialValues: (state, action: PayloadAction<IMeterSettingsInitialValues>) => {
      state.meterSettingsInitialValues = action.payload;
    },
    setSocketMessage: (state, action: PayloadAction<any>) => {
      state.socketMessages = [action.payload, ...state.socketMessages];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createConcentrator.fulfilled, (state) => {
      state.isConcentratorConnected = true;
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(getAllConcentratorMeters.fulfilled, (state, action: PayloadAction<AllConcentratorMetersType>) => {
      state.isFetchingSelectedConcentratorMeters = false;
      state.allConcentratorMeters = action.payload;
      state.schedule = action.payload.pollSettings;
    });
    builder.addCase(addInfoToConcentrator.pending, (state) => {
      state.isFetchingUSPD = true;
    });
    builder.addCase(addInfoToConcentrator.fulfilled, () => {
      return powerMeterTransmissionDeviceConcentratorState;
    });
    builder.addCase(getAllConcentrators.fulfilled, (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
      state.allConcentrators = action.payload;
      state.isFetchingModal = false;
    });
    builder.addCase(getСoncentratorMetersPower.pending, (state) => {
      state.isFetchingSelectedConcentratorMeters = true;
    });

    builder.addCase(
      getСoncentratorMetersPower.fulfilled,
      (state, action: PayloadAction<Array<ConcentratorMeterType>>) => {
        state.selectedConcentratorMeters = action.payload.map((m) => ({
          ...m,
          selected: state.selectedMeters.includes(m.id),
        }));
        state.isFetchingModal = false;
        state.selectedAllMeters = false;
        state.isFetchingSelectedConcentratorMeters = false;
        // state.selectedMeters = [];
      }
    );
    builder.addCase(getСoncentratorMetersPower.rejected, (state) => {
      state.isFetchingModal = false;
      state.selectedAllMeters = false;
      state.isFetchingSelectedConcentratorMeters = false;
      state.selectedMeters = [];
    });

    builder.addCase(editToConcentrator.pending, (state) => {
      state.isFetchingConcentratorEdit = true;
    });
    builder.addCase(editToConcentrator.fulfilled, () => {
      return powerMeterTransmissionDeviceConcentratorState;
    });
    builder.addCase(editToConcentrator.rejected, (state) => {
      state.isFetchingConcentratorEdit = false;
    });
    builder.addCase(resetConcentrator.fulfilled, (state) => {
      state.isConcentratorReset = true;
      state.isFetchingModal = false;
    });
    builder.addCase(resetConcentrator.rejected, (state) => {
      state.isFetchingModal = false;
    });
    builder.addCase(getSidebarConcentratorDate.fulfilled, (state, action: PayloadAction<DateType>) => {
      state.sideBarConcentratorDate = action.payload;
    });
    builder.addCase(changeConcentratorTimeDate.fulfilled, (state) => {
      state.isFetchingModal = false;
      state.isConcentratorChangeDate = true;
    });
    builder.addCase(changeConcentratorTimeDate.rejected, (state) => {
      state.isFetchingModal = false;
    });

    builder.addCase(
      uspdConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.tansonomyTree = action.payload;
      }
    );

    builder.addCase(createConcentratorNewMeter.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentUSPDMeterId = action.payload;
    });

    builder.addCase(uploadUSPDExcelThunk.pending, (state) => {
      state.isExcelLoading = true;
    });
    builder.addCase(uploadUSPDExcelThunk.rejected, (state) => {
      state.isExcelLoading = false;
    });
    builder.addCase(uploadUSPDExcelThunk.fulfilled, (state) => {
      state.isExcelLoading = false;
    });
  },
});

export const powerMeterTransmissionDeviceReducer = powerMeterTransmissionDeviceConcentratorSlice.reducer;

export const {
  getAllConcentratorIPandPort,
  toggleIsConcentratorChangeDate,
  toggleIsConcentratorReset,
  resetConcentratorState,
  setSelectedConcentrator,
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  isFetchingModalAC,
  setMeterType,
  setScheduleValues,
  setSelectedMeterObj,
  addOneMeterIdToArr,
  toggleIsSidebarOpen,
  setMeterSettings,
  setMeterSettingsInitialValues,
  setSocketMessage,
} = powerMeterTransmissionDeviceConcentratorSlice.actions;
