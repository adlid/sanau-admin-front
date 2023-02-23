import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { powerIndicationState } from "./powerIndication.state";
import { ILorawanRequestAnswerHourly, ILorawanRequestAnswerGraph, ILorawanTableDataNew, ILorawanGraphDataNew } from "../../../ts/interfaces/powerMeterConcentrator";
import { getGPRSData } from "../powerConcentrator/gprs/gprs.thunk";
import { GPRSMainTableType, GPRSGraphType, GPRSGraphResponse, GPRSTableResponse } from "../../../ts/types/gprsReadingTypes";
import { DinRailGraphsNameType, GPRSGraphNamePhaseType, GPRSGraphsNameType, LorawanGraphsNameTypeNew } from "../../../ts/types/indication.types";

import {
  // indicationMetersList,
  getMeterInfoTable,
  getMeterInfoGraph,
  saveMainTableExcel,
  getMeterConsiderInfoTable,
  searchPowerIndicationMeters,
  getTokenForMeter,
  getBluetoothTableGraphValues,
  saveExcelBluetoothMeters,
  indicationPowerMetersListByGroupKey,
  requestAnswerLorabanConsider,
  getBluetoothGraphValues,
  requestAnswerLorabanHourly,
  requestAnswerLorabanHourlyGraph,
  getGPRSReadMonthly,
  getGPRSReadCurrent,
  getGPRSReadDaily,
  getGPRSReadHourly,
  getGPRSTableValuesThunk,
  getGPRSGraphValuesThunk,
  saveExcelGRPSMeters,
  saveExcelLorawanMetersThunk,
  getOtanReadCurrent,
  getOtanReadHourly,
  getOtanReadQuarterly,
  getOtanReadDaily,
  getOtanReadMonthly,
  getOtanHourlyTableValuesThunk,
  getOtanDailyTableValuesThunk,
  getOtanGraphValuesThunk,
  saveExcelOtanMeters,
  getGPRSEventsTableValuesThunk,
  readGPRSEventsTableValuesThunk,
  getDinRailReadCurrent,
  getDinRailReadHourly,
  getDinRailGraphValuesThunk,
  saveExcelDinRailMeters,
  getDinRailReadDaily,
  getDinRailReadMonthly,
  getDinRailTableValuesThunk,
  getGPRSTableDataNew,
  getGPRSGraphDataNew,
  getAllMeterIdsThunk,
  getUsdpTableData,
  getUsdpGraphData,
  requestLoravanReadDataThunk
} from "./powerIndication.thunks";
import {
  ReadMeterMainTableType,
  MainTableDataType,
  GraphType,
  GraphsNameType,
  LorawanGraphsNameType,
  BluetoothFilterType,
  uspdFilterType,
  LoraActiveTableItem,
  LoraVoltageTableItem,
  LoraPowerActive,
} from "../../../ts/types/indication.types";
import {
  IIndicationMetersListWithoutSelect,
  IIndicationMeterListItemWithSelect,
  IBluetoothMeterListItemWithoutSelect,
  IBluetoothMeterTable,
  BluetoothGraphData,
} from "../../../ts/interfaces/indication.interface";
import download from "downloadjs";

const toggleSelectedFlag = (
  metersList: Array<IIndicationMeterListItemWithSelect>,
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

const powerIndicationSlice = createSlice({
  name: "indication",
  initialState: powerIndicationState,
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
          data: state.indicationMetersListArr.data.map((m) => ({
            ...m,
            selected: false,
          })),
        };
      }
      state.selectedMeterType = "";
    },

    addMetersIdToArr: (state, action: PayloadAction<{ id: string; type: string }>) => {
      state.metersId = [...state.metersId, action.payload.id];
      state.selectedMeterType = action.payload.type;
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: toggleSelectedFlag(state.indicationMetersListArr.data, action.payload.id, true),
        };
      }
    },

    removeMetersIdFromArr: (state, action: PayloadAction<{ id: string; type: string }>) => {
      state.selectedAllIndicationMeters = false;
      const filteredArr = state.metersId.filter((id) => id !== action.payload.id);
      state.metersId = filteredArr;
      if (state.indicationMetersListArr !== null) {
        state.indicationMetersListArr = {
          ...state.indicationMetersListArr,
          data: toggleSelectedFlag(state.indicationMetersListArr.data, action.payload.id, false),
        };
      }
      if (filteredArr.length === 0) {
        state.selectedMeterType = "";
      } else {
        state.selectedMeterType = action.payload.type;
      }
    },

    setSelectAllMeters: (state) => {
      state.selectedAllIndicationMeters = true;
    },
    resetSelectAllMeters: (state) => {
      state.selectedAllIndicationMeters = false;
      state.metersId = []
    },

    toggleGetTableDataFetching: (state, action: PayloadAction<boolean>) => {
      state.getTableDataFetching = action.payload;
    },
    toggleGetTableConsiderDataFetching: (state, action: PayloadAction<boolean>) => {
      state.getTableConsiderDataFetching = action.payload;
    },
    resetIndicationStatePower: () => {
      return powerIndicationState;
    },
    getSelectedGraphName: (state, action: PayloadAction<GraphsNameType>) => {
      state.selectedGraphName = action.payload;
    },
    getSelectedGraphNameLorawan: (state, action: PayloadAction<LorawanGraphsNameTypeNew>) => {
      state.selectedGraphNameLorawan = action.payload;
    },
    getSelectedGraphNameGPRS: (state, action: PayloadAction<GPRSGraphsNameType>) => {
      state.selectedGraphNameGPRS = action.payload;
    },
    getSelectedGraphNamePhase: (state, action: PayloadAction<GPRSGraphNamePhaseType>) => {
      state.selectedGraphPhase = action.payload;
    },
    getSelectedGraphNameDinRail: (state, action: PayloadAction<DinRailGraphsNameType>) => {
      state.selectedGraphNameDinRail = action.payload;
    },

    getGraphSerialNumber: (state, action: PayloadAction<any>) => {
      state.selectedGraphNumber = action.payload;
    },

    setSelectedMeterType: (state, action: PayloadAction<any>) => {
      state.selectedMeterType = action.payload;
    },

    setBluetoothFilter: (state, action: PayloadAction<BluetoothFilterType>) => {
      state.bluetoothFilter = action.payload;
    },
    setUspdFilter: (state, action: PayloadAction<uspdFilterType>) => {
      state.uspdFilter = action.payload;
    },
    setLorawanFilter: (state, action: PayloadAction<uspdFilterType>) => {
      state.lorawanFilter = action.payload;
    },
    resetLorawanHourlyData: (state) => {
      state.lorawanHourlyData = null;
    },

    setCurrentReadMeterName: (state, action: PayloadAction<any>) => {
      state.currentReadMeterName = action.payload;
    },
    setUspdFilterGroupValue: (state, action) => {
      state.uspdFilter.groupValue = action.payload;
    },
    setUspdFilterParameterValue: (state, action) => {
      state.uspdFilter.parameterValue = action.payload;
    },
    setUspdFilterDateFrom: (state, action) => {
      state.uspdFilter.dateFrom = action.payload;
    },
    setUspdFilterDateTo: (state, action) => {
      state.uspdFilter.dateTo = action.payload;
    },
    setUspdFilterStartHour: (state, action) => {
      state.uspdFilter.startHour = action.payload;
    },
    setUspdFilterFinishHour: (state, action) => {
      state.uspdFilter.finishHour = action.payload;
    },


    // by Islam
    setCurrentGPRSItemDeviceName: (state, action) => {
      state.currentGPRSItemDeviceName = action.payload
    },

    setCurrentUspdMeterId: (state, action) => {
      state.currentUspdMeterId = action.payload;
    },

    setCurrentLorawanItemDeviceName: (state, action) => {
      state.currentLorawanItemDeviceName = action.payload
    },

    setCurrentUspdDeviceName: (state, action) => {
      state.uspdCurrentDeviceName = action.payload;
    },

    setOtanTablePagination: (state, action) => {
      state.OtanTablePagination = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(
      indicationPowerMetersListByGroupKey.fulfilled,
      (state, action: PayloadAction<IIndicationMetersListWithoutSelect>) => {
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

    builder.addCase(getMeterInfoTable.fulfilled, (state, action: PayloadAction<ReadMeterMainTableType>) => {
      state.mainTableData = action.payload;
    });

    builder.addCase(getMeterInfoGraph.fulfilled, (state, action: PayloadAction<Array<GraphType>>) => {
      state.mainGraphData = action.payload;
    });

    builder.addCase(getMeterConsiderInfoTable.pending, (state) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(
      getMeterConsiderInfoTable.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: Array<MainTableDataType>;
          graph: Array<GraphType>;
        }>
      ) => {
        state.mainGraphData = action.payload.graph;
        state.mainTableConsiderData = action.payload.data;
        state.mainTableData = null;
        state.getTableConsiderDataFetching = false;
      }
    );

    builder.addCase(getMeterConsiderInfoTable.rejected, (state) => {
      state.getTableConsiderDataFetching = false;
    });
    builder.addCase(getTokenForMeter.pending, (state) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getTokenForMeter.fulfilled, (state) => {
      state.getTableDataFetching = false;
    });
    builder.addCase(getTokenForMeter.rejected, (state) => {
      state.getTableDataFetching = false;
    });

    builder.addCase(saveMainTableExcel.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(saveExcelGRPSMeters.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(saveExcelLorawanMetersThunk.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    builder.addCase(
      searchPowerIndicationMeters.fulfilled,
      (state, action: PayloadAction<IIndicationMetersListWithoutSelect>) => {
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

    //builder bluetooth
    builder.addCase(getBluetoothTableGraphValues.fulfilled, (state, action: PayloadAction<IBluetoothMeterTable>) => {
      state.bluetoothMeterTableGraphData = action.payload;
    });
    builder.addCase(getBluetoothGraphValues.fulfilled, (state, action: PayloadAction<Array<BluetoothGraphData>>) => {
      state.bluetoothGraph = action.payload;
    });

    builder.addCase(saveExcelBluetoothMeters.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    //lorawan
    builder.addCase(
      requestAnswerLorabanConsider.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: unknown;
          type: string;
        }>
      ) => {
        if (action.payload.type === "voltageByPhase" || action.payload.type === "amperageByPhase") {
          state.loraTableDataVoltage = action.payload.data as Array<LoraVoltageTableItem>;
        } else if (
          action.payload.type === "totalActivePower" ||
          action.payload.type === "totalReactivePower" ||
          action.payload.type === "totalPower"
        ) {
          state.loraTablePower = action.payload.data as Array<LoraPowerActive>;
        } else {
          state.loraTableData = action.payload.data as Array<LoraActiveTableItem>;
        }
        state.getTableConsiderDataFetching = false
      }
    );

    builder.addCase(requestAnswerLorabanConsider.rejected, (state) => {
      state.getTableConsiderDataFetching = false;
    });

    // builder.addCase(
    //   requestAnswerLorabanHourly.fulfilled,
    //   (
    //     state,
    //     action: PayloadAction<{
    //       data: ILorawanRequestAnswerHourly;
    //       type: string;
    //     }>
    //   ) => {
    //     state.lorawanHourlyData = action.payload.data;
    //   }
    // );



    // new by Islam
    builder.addCase(
      requestAnswerLorabanHourly.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: Array<ILorawanTableDataNew>;
          type: string;
        }>
      ) => {
        state.currentLorawanItemDeviceName = action.payload.data[0].deviceName;
        state.lorawanTableDataNew = action.payload.data;
        state.getTableConsiderDataFetching = false;
      }
    );

    builder.addCase(
      requestLoravanReadDataThunk.rejected,
      (state) => {
        state.getTableConsiderDataFetching = false;
      }
    )

    builder.addCase(
      requestAnswerLorabanHourly.rejected,
      (state) => {
        state.getTableConsiderDataFetching = false;
      }
    )

    builder.addCase(
      requestAnswerLorabanHourlyGraph.fulfilled,
      (state, action) => {
        state.lorawanGraphDataNew = action.payload;
        state.getTableConsiderDataFetching = false
      }
    );

    builder.addCase(
      requestAnswerLorabanHourlyGraph.rejected,
      (state) => {
        state.getTableConsiderDataFetching = false
      }
    );

    // builder.addCase(
    //   requestAnswerLorabanHourlyGraph.fulfilled,
    //   (state, action: PayloadAction<Array<ILorawanRequestAnswerGraph>>) => {
    //     state.lorawanGraph = action.payload;
    //   }
    // );

    //gprs
    // builder.addCase(
    //   getGPRSData.fulfilled,
    //   (state, action: PayloadAction<{ data: Array<GPRSMainTableType>; graph: Array<GPRSGraphType> }>) => {
    //     state.GPRSGraphData = action.payload.graph;
    //     state.GPRSTableData = action.payload.data;
    //     // state.GPRSTablePagination = action.payload;
    //     state.getTableConsiderDataFetching = false;
    //   }
    // );

    // New API response, by Islam:
    builder.addCase(
      getGPRSTableDataNew.pending, (state, actions) => {
        state.getTableConsiderDataFetching = true;
      }
    );
    builder.addCase(
      getGPRSGraphDataNew.pending, (state, action) => {
        state.getTableConsiderDataFetching = true;
      }
    );
    builder.addCase(
      getGPRSTableDataNew.fulfilled,
      (state, action: any) => {
        state.GPRSTableDataNew = action.payload;
        state.getTableConsiderDataFetching = false;
      }
    );
    builder.addCase(
      getGPRSGraphDataNew.fulfilled,
      (state, action: any) => {
        state.GPRSGraphDataNew = action.payload;
        state.getTableConsiderDataFetching = false;
      }
    );
    builder.addCase(
      getAllMeterIdsThunk.fulfilled,
      (state, action: any) => {
        state.metersId = action.payload;
        state.getTableDataFetching = false;
        state.getTableConsiderDataFetching = false;
      }
    );
    //Gprs read current
    builder.addCase(getGPRSReadCurrent.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
      state.GPRSGraphData = null;
    });
    builder.addCase(getGPRSReadCurrent.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = action.payload;
    });
    builder.addCase(getGPRSReadCurrent.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = null;
      state.GPRSGraphData = null;
    });
    //gprs hourly
    builder.addCase(getGPRSReadHourly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getGPRSReadHourly.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = action.payload.data;
      state.GPRSGraphData = action.payload.graph;
    });
    builder.addCase(getGPRSReadHourly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = null;
      state.GPRSGraphData = null;
    });
    //gprs read data show
    builder.addCase(getGPRSTableValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getGPRSTableValuesThunk.fulfilled, (state, action) => {
      const { data, ...rest } = action.payload;
      state.GPRSTableData = data;
      state.GPRSTablePagination = { ...rest };
      state.getTableDataFetching = false;
    });
    builder.addCase(getGPRSTableValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.GPRSTableData = null;
    });

    builder.addCase(getGPRSGraphValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getGPRSGraphValuesThunk.fulfilled, (state, action) => {
      state.GPRSGraphData = action.payload;
      state.getTableDataFetching = false;
    });
    builder.addCase(getGPRSGraphValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.GPRSGraphData = null;
    });
    //gprs daily
    builder.addCase(getGPRSReadDaily.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getGPRSReadDaily.fulfilled, (state, action) => {
      state.GPRSTableDataNew = action.payload.data;
      state.GPRSGraphDataNew = action.payload.graph;
      state.getTableConsiderDataFetching = false;
    });
    builder.addCase(getGPRSReadDaily.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = null;
      state.GPRSGraphData = null;
    });
    //gprs monthly
    builder.addCase(getGPRSReadMonthly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getGPRSReadMonthly.fulfilled, (state, action) => {
      state.GPRSTableData = action.payload.data;
      state.GPRSGraphData = action.payload.graph;
      state.getTableConsiderDataFetching = false;
    });
    builder.addCase(getGPRSReadMonthly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.GPRSTableData = null;
      state.GPRSGraphData = null;
    });
    //gprs get events
    builder.addCase(getGPRSEventsTableValuesThunk.pending, (state, action) => {
      state.getTableEventsDataFetching = true;
    });
    builder.addCase(getGPRSEventsTableValuesThunk.fulfilled, (state, action) => {
      const { data, ...rest } = action.payload;
      state.GPRSEventsTablePagination = { ...rest };
      state.GPRSEventsTableData = data;
      state.getTableEventsDataFetching = false;
    });
    builder.addCase(getGPRSEventsTableValuesThunk.rejected, (state, action) => {
      state.getTableEventsDataFetching = false;
      state.GPRSEventsTableData = [];
      state.GPRSEventsTablePagination = {
        elementsSize: 10,
        hasNext: false,
        page: 0,
        size: 0,
        totalElementsOnPage: 0,
        totalPage: 0,
      };
    });
    //gprs read events
    builder.addCase(readGPRSEventsTableValuesThunk.pending, (state, action) => {
      state.getTableEventsDataFetching = true;
    });
    builder.addCase(readGPRSEventsTableValuesThunk.fulfilled, (state, action) => {
      state.GPRSEventsTablePagination = {
        elementsSize: 10,
        hasNext: false,
        page: 1,
        size: 10,
        totalElementsOnPage: 10,
        totalPage: 1,
      };
      state.GPRSEventsTableData = action.payload;
      state.getTableEventsDataFetching = false;
    });
    builder.addCase(readGPRSEventsTableValuesThunk.rejected, (state, action) => {
      state.getTableEventsDataFetching = false;
      state.GPRSEventsTableData = [];
      state.GPRSEventsTablePagination = {
        elementsSize: 10,
        hasNext: false,
        page: 0,
        size: 0,
        totalElementsOnPage: 0,
        totalPage: 0,
      };
    });

    // ----------------------- OTAN ----------------------- //
    // otan read current
    builder.addCase(getOtanReadCurrent.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
      state.OtanGraphData = null;
    });
    builder.addCase(getOtanReadCurrent.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableCurrentData = action.payload.instantaneousReadings;
      state.OtanGraphData = null;
    });
    builder.addCase(getOtanReadCurrent.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableCurrentData = null;
      state.OtanGraphData = null;
    });

    // otan hourly
    builder.addCase(getOtanReadHourly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getOtanReadHourly.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableHourlyData = action.payload.data;
      state.OtanGraphData = action.payload.graph;
    });
    builder.addCase(getOtanReadHourly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableHourlyData = null;
      state.OtanGraphData = null;
    });

    // otan quarterly
    builder.addCase(getOtanReadQuarterly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getOtanReadQuarterly.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableHourlyData = action.payload.data;
      state.OtanGraphData = action.payload.graph;
    });
    builder.addCase(getOtanReadQuarterly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableHourlyData = null;
      state.OtanGraphData = null;
    });

    // otan daily
    builder.addCase(getOtanReadDaily.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getOtanReadDaily.fulfilled, (state, action) => {
      state.OtanTableDailyData = action.payload.data;
      state.OtanGraphData = action.payload.graph;
      state.getTableConsiderDataFetching = false;
    });
    builder.addCase(getOtanReadDaily.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableDailyData = null;
      state.OtanGraphData = null;
    });

    // otan monthly
    builder.addCase(getOtanReadMonthly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getOtanReadMonthly.fulfilled, (state, action) => {
      state.OtanTableDailyData = action.payload.data;
      state.OtanGraphData = action.payload.graph;
      state.getTableConsiderDataFetching = false;
    });
    builder.addCase(getOtanReadMonthly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.OtanTableDailyData = null;
      state.OtanGraphData = null;
    });

    // otan read data show daily monthly
    builder.addCase(getOtanDailyTableValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getOtanDailyTableValuesThunk.fulfilled, (state, action) => {
      state.OtanTableDailyData = action.payload;
      // state.OtanTablePagination = { ...rest };
      state.getTableDataFetching = false;
    });
    builder.addCase(getOtanDailyTableValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.OtanTableDailyData = null;
    });

    // otan read data show hourly and quarterly
    builder.addCase(getOtanHourlyTableValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getOtanHourlyTableValuesThunk.fulfilled, (state, action) => {
      state.OtanTableHourlyData = action.payload;
      // state.OtanTablePagination = { ...rest };
      state.getTableDataFetching = false;
    });
    builder.addCase(getOtanHourlyTableValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.OtanTableHourlyData = null;
    });

    // otan graphs
    builder.addCase(getOtanGraphValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getOtanGraphValuesThunk.fulfilled, (state, action) => {
      state.OtanGraphData = action.payload;
      state.getTableDataFetching = false;
    });
    builder.addCase(getOtanGraphValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.OtanGraphData = null;
    });
    builder.addCase(saveExcelOtanMeters.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });

    // ----------------------- DINRAIL ----------------------- //
    // dinrail read current
    builder.addCase(getDinRailReadCurrent.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
      state.DinRailGraphData = [];
      state.DinRailReadCurrentTableData = [];
    });
    builder.addCase(getDinRailReadCurrent.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailReadCurrentTableData = action.payload.data;
    });
    builder.addCase(getDinRailReadCurrent.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailReadCurrentTableData = [];
    });

    // dinrail read hourly
    builder.addCase(getDinRailReadHourly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getDinRailReadHourly.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = action.payload.data;
      state.DinRailGraphData = action.payload.graph;
    });
    builder.addCase(getDinRailReadHourly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = [];
      state.DinRailGraphData = [];
    });

    // dinrail read daily
    builder.addCase(getDinRailReadDaily.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getDinRailReadDaily.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = action.payload.data;
      state.DinRailGraphData = action.payload.graph;
    });
    builder.addCase(getDinRailReadDaily.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = [];
      state.DinRailGraphData = [];
    });

    // dinrail read monthly
    builder.addCase(getDinRailReadMonthly.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getDinRailReadMonthly.fulfilled, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = action.payload.data;
      state.DinRailGraphData = action.payload.graph;
    });
    builder.addCase(getDinRailReadMonthly.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = [];
      state.DinRailGraphData = [];
    });

    // dinrail get existing table data
    builder.addCase(getDinRailTableValuesThunk.pending, (state, action) => {
      state.getTableConsiderDataFetching = true;
    });
    builder.addCase(getDinRailTableValuesThunk.fulfilled, (state, action) => {
      const { data, ...rest } = action.payload;
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = data;
      state.DinRailTablePagination = { ...rest };
    });
    builder.addCase(getDinRailTableValuesThunk.rejected, (state, action) => {
      state.getTableConsiderDataFetching = false;
      state.DinRailTableData = [];
    });

    // dinrail get graphs data
    builder.addCase(getDinRailGraphValuesThunk.pending, (state, action) => {
      state.getTableDataFetching = true;
    });
    builder.addCase(getDinRailGraphValuesThunk.fulfilled, (state, action) => {
      state.DinRailGraphData = action.payload;
      state.getTableDataFetching = false;
    });
    builder.addCase(getDinRailGraphValuesThunk.rejected, (state, action) => {
      state.getTableDataFetching = false;
      state.DinRailGraphData = [];
    });
    builder.addCase(saveExcelDinRailMeters.fulfilled, (_, action) => {
      const blob = new Blob([action.payload]);
      download(blob, "Отчет.xlsx");
    });


    // uspd
    builder.addCase(getUsdpTableData.pending, (state) => {
      state.uspdDataFetching = true
    });
    builder.addCase(getUsdpTableData.fulfilled, (state, action) => {
      state.uspdDataFetching = false;
      state.uspdTableData = action.payload;
    });
    builder.addCase(getUsdpTableData.rejected, (state) => {
      state.uspdDataFetching = false;
    });

    builder.addCase(getUsdpGraphData.pending, (state) => {
      state.uspdDataFetching = true
    });
    builder.addCase(getUsdpGraphData.fulfilled, (state, action) => {
      state.uspdDataFetching = false;
      state.uspdGraphData = action.payload;
    });
    builder.addCase(getUsdpGraphData.rejected, (state) => {
      state.uspdDataFetching = false;
    });
  },
});

export const powerIndicationReducer = powerIndicationSlice.reducer;

export const {
  selectAllMeters,
  removeSelectAllMeters,
  addMetersIdToArr,
  removeMetersIdFromArr,
  resetIndicationStatePower,
  toggleGetTableDataFetching,
  toggleGetTableConsiderDataFetching,
  getSelectedGraphName,
  getGraphSerialNumber,
  setBluetoothFilter,
  setUspdFilter,
  setLorawanFilter,
  resetLorawanHourlyData,
  getSelectedGraphNameLorawan,
  getSelectedGraphNameGPRS,
  getSelectedGraphNameDinRail,
  setCurrentReadMeterName,
  setUspdFilterGroupValue,
  setUspdFilterParameterValue,
  setUspdFilterDateFrom,
  setUspdFilterDateTo,
  setUspdFilterStartHour,
  setUspdFilterFinishHour,
  setSelectedMeterType,
  setCurrentGPRSItemDeviceName,
  setSelectAllMeters,
  resetSelectAllMeters,
  setCurrentUspdMeterId,
  setCurrentLorawanItemDeviceName,
  setCurrentUspdDeviceName,
  getSelectedGraphNamePhase,
  setOtanTablePagination
} = powerIndicationSlice.actions;
