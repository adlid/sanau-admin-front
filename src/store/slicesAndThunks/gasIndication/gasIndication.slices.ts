import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gasIndicationState } from "./gasIndication.state";
import {
  MainGasTableDataType,
  ReadGasMeterMainTableType,
  GasGraphsNameType,
  IDetailGasMeterUdpInfoProps,
} from "../../../ts/types/indication.types";
import {
  IGasIndicationMetersListWithoutSelect,
  IGasIndicationMeterListItemWithSelect,
} from "../../../ts/interfaces/indication.interface";
import download from "downloadjs";
import {
  getDetailGasUdpSidebarInfoThunk,
  getGasMeterInfoGraph,
  getGasMeterInfoTable,
  indicationGasMetersListByGroupKey,
  saveGasMainTableExcel,
} from "./gasIndication.thunks";

const toggleSelectedFlag = (
  metersList: Array<IGasIndicationMeterListItemWithSelect>,
  id: string,
  selectedFlag: boolean
) => {
  return metersList.map((m) => {
    if (m.id === id) {
      return {
        ...m,
        selected: selectedFlag,
      };
    } else {
      return m;
    }
  });
};

const gasIndicationSlice = createSlice({
  name: "gasIndication",
  initialState: gasIndicationState,
  reducers: {
    selectAllMeters: (state) => {
      let ids: Array<string> = [];
      state.selectedAllIndicationMeters = true;
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: state.indicationMetersListArr.data.map((m) => {
            ids.push(m.id);
            return { ...m, selected: true };
          }),
        };
      }

      state.metersId = ids;
    },

    removeSelectAllMeters: (state) => {
      state.selectedAllIndicationMeters = false;
      state.metersId = [];
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: state.indicationMetersListArr.data.map((m) => ({ ...m, selected: false })),
        };
      }
    },

    addMetersIdToArr: (state, action: PayloadAction<any>) => {
      state.metersId = [...state.metersId, action.payload];
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: toggleSelectedFlag(state.indicationMetersListArr.data, action.payload, true),
        };
      }
    },

    removeMetersIdFromArr: (state, action: PayloadAction<any>) => {
      const filteredArr = state.metersId.filter((id) => id !== action.payload);
      state.metersId = filteredArr;
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: toggleSelectedFlag(state.indicationMetersListArr.data, action.payload, false),
        };
      }
    },

    toggleGetTableDataFetching: (state) => {
      state.getTableDataFetching = true;
    },
    toggleSetTableDataNotFetching: (state) => {
      state.getTableDataFetching = false;
    },
    toggleGetTableConsiderDataFetching: (state) => {
      state.getTableConsiderDataFetching = true;
    },

    resetGasIndicationState: () => {
      return gasIndicationState;
    },

    getSelectedGraphName: (state, action: PayloadAction<GasGraphsNameType>) => {
      state.selectedGraphName = action.payload;
    },

    getSelectedGraphItem: (state, action: PayloadAction<any>) => {
      state.selectedGraphItem = action.payload;
    },

    setCurrentReadMeterName: (state, action: PayloadAction<any>) => {
      state.currentReadMeterName = action.payload;
    }

  },

  extraReducers: (builder) => {
    builder.addCase(
      indicationGasMetersListByGroupKey.fulfilled,
      (state, action: PayloadAction<IGasIndicationMetersListWithoutSelect>) => {
        if (state.metersId.length > 0) {
          let a = {
            ...action.payload,
            data: action.payload.data.map((m) => {
              const ivan = state.metersId.find((m2) => {
                return m2 === m.id;
              });
              if (ivan) {
                return { ...m, selected: true };
              } else {
                return { ...m, selected: false };
              }
            }),
          };
          state.indicationMetersListArr = a;
        } else {
          state.indicationMetersListArr = {
            ...action.payload,
            data: action.payload.data.map((m) => ({ ...m, selected: false })),
          };
        }
      }
    );

    builder.addCase(
      getDetailGasUdpSidebarInfoThunk.fulfilled,
      (state, action: PayloadAction<IDetailGasMeterUdpInfoProps>) => {
        state.detailUdpMeterData = action.payload;
      }
    );

    builder.addCase(getGasMeterInfoTable.pending, (state) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getGasMeterInfoTable.rejected, (state) => {
      state.getTableDataFetching = false;
    });

    builder.addCase(getGasMeterInfoTable.fulfilled, (state, action: PayloadAction<ReadGasMeterMainTableType>) => {
      state.mainTableData = action.payload;
      state.getTableDataFetching = false;
    });

    builder.addCase(getGasMeterInfoGraph.fulfilled, (state, action: PayloadAction<Array<MainGasTableDataType>>) => {
      state.mainGraphData = action.payload;
    });

    builder.addCase(saveGasMainTableExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });
  },
});

export const gasIndicationReducer = gasIndicationSlice.reducer;

export const {
  setCurrentReadMeterName,
  selectAllMeters,
  removeSelectAllMeters,
  addMetersIdToArr,
  removeMetersIdFromArr,
  resetGasIndicationState,
  toggleGetTableDataFetching,
  toggleSetTableDataNotFetching,
  toggleGetTableConsiderDataFetching,
  getSelectedGraphName,
  getSelectedGraphItem,
} = gasIndicationSlice.actions;
