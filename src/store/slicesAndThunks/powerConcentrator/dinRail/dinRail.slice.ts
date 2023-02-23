import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dinRailState } from "./dinRail.state";
import {
  connectConcentratorDinRail,
  createFolderDinRail,
  detailDinRailInfoThunk,
  dinRailGroupControlThunk,
  dinRailPersonalAccountSearch,
  getDinRailMetersList,
  getFoldersDinRail,
} from "./dinRail.thunk";
import { GPRSuserInfoValuesType } from "../../../../ts/types/gprs.types";
import { IDinRailDetailData, IDinRailMeterListItem } from "../../../../ts/types/dinRailTypes";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import { addMetersToFolderThunk } from "../../powerIndication/powerIndication.thunks";

const DinRailStateSlice = createSlice({
  name: "DinRailStateSlice",
  initialState: dinRailState,
  reducers: {
    addOneMeterIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [action.payload];
    },
    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = [...state.selectedMeters, action.payload];
      state.dinRailMetersList = state.dinRailMetersList.map((m) => {
        if (m.id === action.payload) {
          return { ...m, selected: true };
        } else {
          return m;
        }
      });
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedMeters = state.selectedMeters.filter((id) => id !== action.payload);
      state.dinRailMetersList = state.dinRailMetersList.map((m) => {
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
      state.dinRailMetersList = state.dinRailMetersList.map((m) => {
        ids.push(m.id);
        return { ...m, selected: true };
      });
      state.selectedMeters = ids;
    },
    removeSelectAllMeters: (state) => {
      state.selectedAllMeters = false;
      state.selectedMeters = [];
      state.dinRailMetersList = state.dinRailMetersList.map((m) => {
        return { ...m, selected: false };
      });
    },

    isFetchingModalAC: (state, action: PayloadAction<boolean>) => {
      state.isFetchingModal = action.payload;
    },

    setSelectedFolderIdDinRail: (state, action: PayloadAction<string>) => {
      state.selectedFolderId = action.payload
    },
    resetFolderListDinRail: (state) => {
      state.foldersList = []
    }, 
    setSelectedEditDinRailMeterId: (state, action) => {
      state.selectedDinRailEditMeterId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(connectConcentratorDinRail.fulfilled, (state, action: PayloadAction<IDinRailDetailData>) => {
      state.dinRailResponseInitialValues = action.payload;
    });
    builder.addCase(dinRailPersonalAccountSearch.fulfilled, (state, action: PayloadAction<GPRSuserInfoValuesType>) => {
      state.dinRailUserInfoValues = action.payload;
    });
    builder.addCase(getDinRailMetersList.pending, (state) => {
      state.DinRailLoading = true;
    });
    builder.addCase(addMetersToFolderThunk.pending, (state) => {
      state.DinRailLoading = true;
    });
    builder.addCase(addMetersToFolderThunk.fulfilled, (state) => {
      state.DinRailLoading = true;
    });
    builder.addCase(getDinRailMetersList.fulfilled, (state, action: any) => {
      const { data, ...rest } = action.payload;
      state.dinRailMetersList = data.map((m: any) => ({ ...m, selected: state.selectedMeters.includes(m.id) }));
      state.dinRailMetersListPagination = { ...rest };
      state.DinRailLoading = false;
    });
    builder.addCase(dinRailGroupControlThunk.fulfilled, (state, action: PayloadAction<Array<OrganizationTree>>) => {
      state.taksonomyTree = action.payload;
    });
    builder.addCase(detailDinRailInfoThunk.fulfilled, (state, action: PayloadAction<any>) => {
      const { userInfo, ...rest } = action.payload;
      state.dinRailUserInfoValues = userInfo;
      state.dinRailResponseInitialValues = { ...rest };
    });

    builder.addCase(getFoldersDinRail.fulfilled, (state, action) => {
      state.foldersList = action.payload;
    });

    builder.addCase(createFolderDinRail.pending, (state) => {
      state.folderLoading = true;
    });
    builder.addCase(createFolderDinRail.rejected, (state) => {
      state.folderLoading = false;
    });
    builder.addCase(createFolderDinRail.fulfilled, (state) => {
      state.folderLoading = false;
    });
  },
});

export const DinRailStateSliceReducer = DinRailStateSlice.reducer;

export const {
  addOneMeterIdToArr,
  addMetersIdToArr,
  removeMetersIdFromArr,
  selectAllMeters,
  removeSelectAllMeters,
  isFetchingModalAC,
  setSelectedFolderIdDinRail,
  resetFolderListDinRail,
  setSelectedEditDinRailMeterId
} = DinRailStateSlice.actions;
