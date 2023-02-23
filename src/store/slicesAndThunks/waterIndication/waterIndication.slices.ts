import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { waterIndicationState } from "./waterIndication.state";
import {
  indicationWaterMetersList,
  getWaterMeterInfoTable,
  getWaterMeterInfoGraph,
  saveWaterMainTableExcel,
  getHourlyWaterMeterInfoTable,
  getHourlyWaterMeterInfoGraph,
  indicationWaterMetersListByGroupKey,
} from "./waterIndication.thunks";
import {
  MainWaterTableDataType,
  ReadWaterMeterMainTableType,
  WaterGraphsNameType,
} from "../../../ts/types/indication.types";
import {
  IWaterIndicationMetersListWithoutSelect,
  IWaterIndicationMeterListItemWithSelect,
} from "../../../ts/interfaces/indication.interface";
import download from "downloadjs";

const toggleSelectedFlag = (
  metersList: Array<IWaterIndicationMeterListItemWithSelect>,
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

const waterIndicationSlice = createSlice({
  name: "waterIndication",
  initialState: waterIndicationState,
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

    resetWaterIndicationState: () => {
      return waterIndicationState;
    },

    getSelectedGraphName: (state, action: PayloadAction<WaterGraphsNameType>) => {
      state.selectedGraphName = action.payload;
    },

    getSelectedGraphItem: (state, action: PayloadAction<any>) => {
      state.selectedGraphItem = action.payload;
    },

    setCurrentReadMeterName: (state, action: PayloadAction<any>) => {
      state.currentReadMeterName = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      indicationWaterMetersListByGroupKey.fulfilled,
      (state, action: PayloadAction<IWaterIndicationMetersListWithoutSelect>) => {
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
      indicationWaterMetersList.fulfilled,
      (state, action: PayloadAction<IWaterIndicationMetersListWithoutSelect>) => {
        state.indicationMetersListArr = {
          ...action.payload,
          data: action.payload.data.map((m) => ({ ...m, selected: false })),
        };
      }
    );
    builder.addCase(getWaterMeterInfoTable.fulfilled, (state, action: PayloadAction<ReadWaterMeterMainTableType>) => {
      state.mainTableData = action.payload;
    });
    builder.addCase(getWaterMeterInfoGraph.fulfilled, (state, action: PayloadAction<Array<MainWaterTableDataType>>) => {
      state.mainGraphData = action.payload;
    });

    builder.addCase(
      getHourlyWaterMeterInfoTable.fulfilled,
      (state, action: PayloadAction<ReadWaterMeterMainTableType>) => {
        state.hourlyTableData = action.payload;
      }
    );
    builder.addCase(
      getHourlyWaterMeterInfoGraph.fulfilled,
      (state, action: PayloadAction<Array<MainWaterTableDataType>>) => {
        state.mainHourlyGraphData = action.payload;
      }
    );

    builder.addCase(saveWaterMainTableExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });
  },
});

export const waterIndicationReducer = waterIndicationSlice.reducer;

export const {
  setCurrentReadMeterName,
  selectAllMeters,
  removeSelectAllMeters,
  addMetersIdToArr,
  removeMetersIdFromArr,
  resetWaterIndicationState,
  toggleGetTableDataFetching,
  toggleSetTableDataNotFetching,
  toggleGetTableConsiderDataFetching,
  getSelectedGraphName,
  getSelectedGraphItem,
} = waterIndicationSlice.actions;
