import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { otanState } from "./otan.state";
import {
  connectConcentratorOtan,
  otanPersonalAccountSearch,
  getOtanMetersList,
  detailOtanInfoThunk,
  otanConcentratorGroupControlThunk,
  getFoldersOTAN,
} from "./otan.thunk";
import {
  GPRSResponseType,
  GPRSuserInfoValuesType,
  GPRSListResponseType,
  OtanListResponseType,
} from "../../../../ts/types/gprs.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import { addMetersToFolderThunk } from "../../powerIndication/powerIndication.thunks";

const OtanStateSlice = createSlice({
  name: "OtanStateSlice",
  initialState: otanState,
  reducers: {
    setSelectedEditOtanMeterId: (state, action) => {
      state.selectedOtanEditMeterId = action.payload;
    },
    addOneMeterIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [action.payload];
    },
    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [...state.selectedMeters, action.payload];
      state.otanMetersList = state.otanMetersList.map((m) => {
        if (m.id === action.payload) {
          return { ...m, selected: true };
        } else {
          return m;
        }
      });
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.otanMetersList = state.otanMetersList.map((m) => {
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
      state.otanMetersList = state.otanMetersList.map((m) => {
        ids.push(m.id);
        return { ...m, selected: true };
      });
      state.selectedMeters = ids;
    },
    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMeters = [];
      state.otanMetersList = state.otanMetersList.map((m) => {
        return { ...m, selected: false };
      });
    },

    isFetchingModalAC: (state, action: PayloadAction<boolean>) => {
      state.isFetchingModal = action.payload;
    },

    setSelectedFolderIdOtan: (state, action: PayloadAction<string>) => {
      state.selectedFolderId = action.payload
    },
    resetFolderListOtan: (state) => {
      state.foldersList = []
    }
  },

  extraReducers: (builder) => {
    builder.addCase(connectConcentratorOtan.fulfilled, (state, action: PayloadAction<OtanListResponseType>) => {
      state.otanDetailValues = action.payload;
    });
    builder.addCase(otanPersonalAccountSearch.fulfilled, (state, action: PayloadAction<GPRSuserInfoValuesType>) => {
      if (state.otanDetailValues) state.otanDetailValues.userInfo = action.payload;
    });
    builder.addCase(getOtanMetersList.pending, (state) => {
      state.otanloading = true;
    });
    builder.addCase(addMetersToFolderThunk.pending, (state) => {
      state.otanloading = true;
    });
    builder.addCase(addMetersToFolderThunk.fulfilled, (state) => {
      state.otanloading = false;
    });
    builder.addCase(getOtanMetersList.fulfilled, (state, action: PayloadAction<Array<OtanListResponseType>>) => {
      state.otanMetersList = action.payload.map((m) => ({ ...m, selected: state.selectedMeters.includes(m.id) }));
      state.otanloading = false;
    });
    builder.addCase(detailOtanInfoThunk.fulfilled, (state, action: PayloadAction<OtanListResponseType>) => {
      state.otanDetailValues = action.payload;
    });
    builder.addCase(
      otanConcentratorGroupControlThunk.fulfilled,
      (state, action: PayloadAction<Array<OrganizationTree>>) => {
        state.taksonomyTree = action.payload;
      }
    );
    builder.addCase(getFoldersOTAN.fulfilled, (state, action) => {
      state.foldersList = action.payload;
    });
  },
});

export const OtanStateSliceReducer = OtanStateSlice.reducer;

export const {
  addOneMeterIdToArr,
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  isFetchingModalAC,
  resetFolderListOtan,
  setSelectedFolderIdOtan,
  setSelectedEditOtanMeterId
} = OtanStateSlice.actions;
