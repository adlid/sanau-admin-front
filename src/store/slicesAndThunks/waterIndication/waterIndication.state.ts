import { IWaterIndicationMetersListWithSelect } from "../../../ts/interfaces/indication.interface";

import {
  WaterGraphsNameType,
  MainWaterTableDataType,
  ReadWaterMeterMainTableType,
} from "../../../ts/types/indication.types";

type WaterIndicationStateType = {
  getTableDataFetching: boolean;
  getTableConsiderDataFetching: boolean;
  indicationMetersListArr: IWaterIndicationMetersListWithSelect | null;
  selectedAllIndicationMeters: boolean;
  metersId: Array<string>;
  mainTableData: null | ReadWaterMeterMainTableType;
  hourlyTableData: null | ReadWaterMeterMainTableType;
  mainGraphData: null | Array<MainWaterTableDataType>;
  mainHourlyGraphData: null | Array<MainWaterTableDataType>;
  selectedGraphName: WaterGraphsNameType;
  selectedGraphItem: string;
  currentReadMeterName: any;
};

export const waterIndicationState: WaterIndicationStateType = {
  getTableDataFetching: false,
  getTableConsiderDataFetching: false,
  indicationMetersListArr: null,
  selectedAllIndicationMeters: false,
  metersId: [],
  mainTableData: null,
  hourlyTableData: null,
  mainGraphData: null,
  mainHourlyGraphData: null,
  selectedGraphName: "consumption",
  selectedGraphItem: "",
  currentReadMeterName: "",
};
