import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reportsState } from "./reports.state";
import {
  getAllUspdConcentrators,
  saveAllElectocityReportExcel,
  saveDiffUSPDLorawanReportExcel,
  saveGasReportExcelThunk,
  saveLorawanWaterReportsExcelThunk,
  saveNewReport1Excel,
  saveNewReport2Excel,
  saveNewReport3Excel,
  saveNewReport4Excel,
  saveNewReport5Excel,
  saveNewReport6Excel,
  saveUSPDReportExcel, saveWaterReportsExcelThunk, saveWaterReportsFolderExcelThunk,
} from "./reports.thunks";
import { ConcentratorItemType } from "../../../ts/types/dataTransmissionsDevice.types";
import download from "downloadjs";

const toggleSelectedFlag = (metersList: Array<ConcentratorItemType>, id: string, selectedFlag: boolean) => {
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

const reportsSlice = createSlice({
  name: "reports",
  initialState: reportsState,
  reducers: {
    setSelectedGateway: (state, action: PayloadAction<any>) => {
      state.selectedGateway = action.payload;
    },

    changeMeterType: (state, action) => {
      state.meterType = action.payload;
    },

    selectAllConcentrators: (state) => {
      let ids: Array<string> = [];
      state.concentratorsListArr = state.concentratorsListArr.map((m) => {
        ids.push(m.id);
        return { ...m, selected: true };
      });
      state.selectedId = ids;
    },

    removeSelectAllConcentrators: (state) => {
      state.concentratorsListArr = state.concentratorsListArr.map((m) => ({ ...m, selected: false }));
      state.selectedId = [];
      state.selectedFolders = [];
    },

    addIdToArr: (state, action: PayloadAction<any>) => {
      state.selectedId = [...state.selectedId, action.payload];
      state.concentratorsListArr = toggleSelectedFlag(state.concentratorsListArr, action.payload, true);
    },
    removeIdFromArr: (state, action: PayloadAction<any>) => {
      state.selectedId = state.selectedId.filter((id) => id !== action.payload);
      state.concentratorsListArr = toggleSelectedFlag(state.concentratorsListArr, action.payload, false);
    },

    addKeyToFolders: (state, action: PayloadAction<any>) => {
      state.selectedFolders = [...state.selectedFolders, action.payload];
    },
    removeKeyFromFolder: (state, action: PayloadAction<any>) => {
      state.selectedFolders = state.selectedFolders.filter((key) => key !== action.payload);
    },

    resetReportsState: () => {
      return reportsState;
    },

    setSelectedAllReport: (state, action) => {
      state.selectedAllReport = action.payload
    },

    setSelectedFolderName: (state, action) => {
      state.selectedFolderName = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getAllUspdConcentrators.fulfilled, (state, action: PayloadAction<Array<ConcentratorItemType>>) => {
      state.concentratorsListArr = action.payload.map((m) => ({ ...m, selected: false }));
    });

    builder.addCase(saveUSPDReportExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(saveDiffUSPDLorawanReportExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(saveAllElectocityReportExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(saveWaterReportsExcelThunk.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    })
    builder.addCase(saveWaterReportsFolderExcelThunk.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    })

    // added by Islam for Баланс воды с разностью
    builder.addCase(saveLorawanWaterReportsExcelThunk.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    })

    builder.addCase(saveNewReport1Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveNewReport2Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveNewReport3Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveNewReport4Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveNewReport5Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveNewReport6Excel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
    builder.addCase(saveGasReportExcelThunk.fulfilled, (_, action) => {
      const blob = new Blob([action.payload])
      download(blob, 'Отчет.xlsx')
    });
  },
});

export const reportsReducer = reportsSlice.reducer;

export const {
  setSelectedGateway,
  selectAllConcentrators,
  removeSelectAllConcentrators,
  addIdToArr,
  removeIdFromArr,
  resetReportsState,
  addKeyToFolders,
  removeKeyFromFolder,
  changeMeterType,
  setSelectedAllReport,
  setSelectedFolderName
} = reportsSlice.actions;
