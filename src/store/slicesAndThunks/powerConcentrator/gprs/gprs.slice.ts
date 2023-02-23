import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GPRSListResponseType, GPRSResponseType, GPRSuserInfoValuesType } from "../../../../ts/types/gprs.types";
import { addMetersToFolderThunk } from "../../powerIndication/powerIndication.thunks";
import { GPRSstate } from "./gprs.state";
import { connectConcentratorGPRS, createFolderGPRS, getFoldersGPRS, getGPRSMetersList, GPRSpersonalAccountSearch, syncGprsMetersDynamic } from "./gprs.thunk";

const GPRSstateSlice = createSlice({
  name: "concentrator/bluetooth",
  initialState: GPRSstate,
  reducers: {
    setSelectedEditGprsMeterId: (state, action) => {
      state.selectedGprsEditMeterId = action.payload;
    },

    addOneMeterIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [action.payload];
    },
    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [...state.selectedMeters, action.payload];
      state.GPRSMetersList = state.GPRSMetersList.map((m) => {
        if (m.id === action.payload) {
          return { ...m, selected: true };
        } else {
          return m;
        }
      });
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.GPRSMetersList = state.GPRSMetersList.map((m) => {
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
      state.GPRSMetersList = state.GPRSMetersList.map((m) => {
        ids.push(m.id);
        return { ...m, selected: true };
      });
      state.selectedMeters = ids;
    },
    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMeters = [];
      state.GPRSMetersList = state.GPRSMetersList.map((m) => {
        return { ...m, selected: false };
      });
    },

    isFetchingModalAC: (state, action: PayloadAction<boolean>) => {
      state.isFetchingModal = action.payload;
    },

    setSelectedFolderIdGPRS: (state, action: PayloadAction<string>) => {
      state.selectedFolderId = action.payload
    },
    resetFolderListGPRS: (state) => {
      state.foldersList = []
    }
  },

  extraReducers: (builder) => {
    builder.addCase(connectConcentratorGPRS.fulfilled, (state, action: PayloadAction<GPRSResponseType>) => {
      state.GPRSResponseInitialValues = action.payload;
    });
    builder.addCase(GPRSpersonalAccountSearch.fulfilled, (state, action: PayloadAction<GPRSuserInfoValuesType>) => {
      state.GPRSuserInfoValues = action.payload;
    });
    builder.addCase(getGPRSMetersList.pending, (state) => {
      state.GPRSloading = true;
    });
    builder.addCase(addMetersToFolderThunk.pending, (state) => {
      state.GPRSloading = true;
    });
    builder.addCase(addMetersToFolderThunk.fulfilled, (state) => {
      state.GPRSloading = false;
    });
    builder.addCase(getGPRSMetersList.fulfilled, (state, action: PayloadAction<Array<GPRSListResponseType>>) => {
      state.GPRSMetersList = action.payload.map((m) => ({ ...m, selected: state.selectedMeters.includes(m.id) }));
      state.GPRSloading = false;
    });

    builder.addCase(syncGprsMetersDynamic.pending, (state) => {
      state.GPRSloading = true;
    });
    builder.addCase(syncGprsMetersDynamic.fulfilled, (state) => {
      state.GPRSloading = false;
    });

    builder.addCase(getFoldersGPRS.fulfilled, (state, action) => {
      state.foldersList = action.payload;
    });

    builder.addCase(createFolderGPRS.pending, (state) => {
      state.folderLoading = true;
    });
    builder.addCase(createFolderGPRS.rejected, (state) => {
      state.folderLoading = false;
    });
    builder.addCase(createFolderGPRS.fulfilled, (state) => {
      state.folderLoading = false;
    });
  },
});

export const GPRSstateSliceReducer = GPRSstateSlice.reducer;

export const {
  addOneMeterIdToArr,
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  isFetchingModalAC,
  setSelectedFolderIdGPRS,
  resetFolderListGPRS,
  setSelectedEditGprsMeterId
} = GPRSstateSlice.actions;
