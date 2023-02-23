import {
  IIndicationMetersListWithSelect,
  IBluetoothMeterListItemWithSelect,
  IBluetoothMeterTable,
  BluetoothGraphData,
} from "../../../ts/interfaces/indication.interface";
import {
  BluetoothFilterType,
  uspdFilterType,
  ReadMeterMainTableType,
  MainTableDataType,
  GraphType,
  GraphsNameType,
  LoraActiveTableItem,
  LoraVoltageTableItem,
  LoraPowerActive,
  LorawanGraphsNameType,
  GPRSGraphsNameType,
  DinRailGraphsNameType,
  UsdpTableDataResponseType,
  UsdpGraphDataResponseType,
  GPRSGraphNamePhaseType,
  LorawanGraphsNameTypeNew,
} from "../../../ts/types/indication.types";
import {
  GPRSMainTableType,
  GPRSGraphType,
  OtanCurrentTableType,
  OtanGraphType,
  OtanDailyTableType,
  OtanHourlyTableType,
  GPRSEventsTableType,
  GPRSGraphResponse,
  GPRSTableResponse,
  NewOtanGraphType,
  NewOtanDailyTableType,
  NewOtanHourlyTableType,
  NewOtanCurrentTableType,
} from "../../../ts/types/gprsReadingTypes";
import { ILorawanRequestAnswerHourly, ILorawanRequestAnswerGraph, ILorawanTableDataNew, ILorawanGraphDataNew } from "../../../ts/interfaces/powerMeterConcentrator";
import {
  IDinRailGraphData,
  IDinRailGraphDataNew,
  IDinRailReadCurrentTableData,
  IDinRailTableData,
  IDinRailTableDataNew,
  PaginationData,
} from "../../../ts/types/dinRailTypes";

type powerIndicationStateType = {
  getTableDataFetching: boolean;
  getTableConsiderDataFetching: boolean;
  getTableEventsDataFetching: boolean;
  indicationMetersListArr: IIndicationMetersListWithSelect | null;
  selectedAllIndicationMeters: boolean;
  metersId: Array<string>;
  mainTableData: null | ReadMeterMainTableType;
  mainGraphData: null | Array<GraphType>;
  mainTableConsiderData: null | Array<MainTableDataType>;
  selectedGraphName: GraphsNameType;
  selectedGraphNameGPRS: GPRSGraphsNameType;
  selectedGraphPhase: GPRSGraphNamePhaseType;
  selectedGraphNameOtan: string;
  selectedGraphNumber: null | string;

  // USPD
  uspdTableData: null | Array<UsdpTableDataResponseType>;
  uspdGraphData: null | Array<UsdpGraphDataResponseType>;
  uspdCurrentDeviceName: null | string;
  uspdDataFetching: boolean;

  // bluetooth
  bluetoothGraph: Array<BluetoothGraphData>;
  bluetoothMeterList: IBluetoothMeterListItemWithSelect | null;
  bluetoothMeterTableGraphData: null | IBluetoothMeterTable;
  selectedMeterType: string;

  // lorawan
  loraTableData: Array<LoraActiveTableItem>;
  loraTableDataVoltage: Array<LoraVoltageTableItem>;
  loraTablePower: Array<LoraPowerActive>;
  currentReadMeterName: any;

  //gprs
  GPRSEventsTableData: Array<GPRSEventsTableType>;
  GPRSTableData: null | Array<GPRSMainTableType>;
  GPRSGraphData: null | Array<GPRSGraphType>;

  // new by Islam: GPRS
  GPRSTableDataNew: null | Array<GPRSTableResponse>;
  GPRSGraphDataNew: null | Array<GPRSGraphResponse>;
  currentGPRSItemDeviceName: null | number;
  GPRSPaginationNew: {
    page: number;
    size: number;
  };

  // by Islam: USPD
  currentUspdMeterId: null | string;
  // selectAllGPRSMeters: boolean;

  GPRSEventsTablePagination: {
    elementsSize: number;
    hasNext: boolean;
    page: number;
    size: number;
    totalElementsOnPage: number;
    totalPage: number;
  };
  GPRSTablePagination: {
    elementsSize: number;
    hasNext: boolean;
    page: number;
    size: number;
    totalElementsOnPage: number;
    totalPage: number;
  };

  // otan
  OtanTableCurrentData: null | Array<NewOtanCurrentTableType>;
  OtanTableHourlyData: null | Array<NewOtanHourlyTableType>;
  OtanTableDailyData: null | Array<NewOtanDailyTableType>;
  OtanGraphData: null | Array<NewOtanGraphType>;
  OtanTablePagination: {
    elementsSize: number;
    hasNext: boolean;
    page: number;
    size: number;
    totalElementsOnPage: number;
    totalPage: number;
  };

  // dinRail
  DinRailReadCurrentTableData: Array<IDinRailReadCurrentTableData>;
  DinRailTablePagination: PaginationData | null;
  DinRailTableData: Array<IDinRailTableDataNew>;
  DinRailGraphData: Array<IDinRailGraphDataNew>;
  selectedGraphNameDinRail: DinRailGraphsNameType;

  //filter
  bluetoothFilter: BluetoothFilterType;
  uspdFilter: uspdFilterType;
  lorawanFilter: uspdFilterType;
  //lorawan
  lorawanHourlyData: null | ILorawanRequestAnswerHourly | Array<GPRSTableResponse>;
  lorawanGraph: null | Array<ILorawanRequestAnswerGraph> | Array<GPRSGraphResponse>;
  selectedGraphNameLorawan: LorawanGraphsNameTypeNew;

  // new states by Islam
  lorawanTableDataNew: null | Array<ILorawanTableDataNew>;
  lorawanGraphDataNew: null | Array<ILorawanGraphDataNew>;
  currentLorawanItemDeviceName: null | string;
};

export const powerIndicationState: powerIndicationStateType = {
  getTableDataFetching: false,
  getTableConsiderDataFetching: false,
  getTableEventsDataFetching: false,
  indicationMetersListArr: null,
  selectedAllIndicationMeters: false,
  metersId: [],
  mainTableData: null,
  mainGraphData: null,
  mainTableConsiderData: null,
  selectedGraphName: "activeEnergy",
  selectedGraphPhase: "phaseA",
  selectedGraphNumber: null,
  currentReadMeterName: "",

  // uspd
  uspdTableData: null,
  uspdGraphData: null,
  uspdCurrentDeviceName: null,
  uspdDataFetching: false,

  //bluetooth
  bluetoothMeterList: null,
  bluetoothMeterTableGraphData: null,
  bluetoothGraph: [],
  selectedMeterType: "",
  loraTableData: [],
  loraTableDataVoltage: [],
  loraTablePower: [],
  //filters
  bluetoothFilter: {
    dateFrom: null,
    dateTo: null,
  },
  uspdFilter: {
    dateFrom: null,
    dateTo: null,
    groupValue: "",
    parameterValue: "",
    startHour: "",
    finishHour: "",
  },
  lorawanFilter: {
    dateFrom: null,
    dateTo: null,
    groupValue: "",
    parameterValue: "",
    startHour: "00:00",
    finishHour: "23:59",
  },
  lorawanHourlyData: null,
  lorawanGraph: null,
  selectedGraphNameLorawan: "positiveActiveEnergy",

  lorawanTableDataNew: null,
  lorawanGraphDataNew: null,
  currentLorawanItemDeviceName: null,

  //gprs
  GPRSEventsTableData: [],
  GPRSTableData: null,
  GPRSGraphData: null,
  GPRSTablePagination: {
    elementsSize: 10,
    hasNext: false,
    page: 0,
    size: 0,
    totalElementsOnPage: 0,
    totalPage: 0,
  },
  GPRSEventsTablePagination: {
    elementsSize: 10,
    hasNext: false,
    page: 0,
    size: 0,
    totalElementsOnPage: 0,
    totalPage: 0,
  },
  selectedGraphNameGPRS: "positiveActiveEnergy",

  GPRSGraphDataNew: null,
  GPRSTableDataNew: null,
  currentGPRSItemDeviceName: null,
  currentUspdMeterId: null,
  GPRSPaginationNew: {
    page: 0,
    size: 10
  },
  // selectAllGPRSMeters: false,

  // otan
  OtanTableCurrentData: null,
  OtanTableHourlyData: null,
  OtanTableDailyData: null,
  OtanGraphData: null,
  OtanTablePagination: {
    elementsSize: 0,
    hasNext: false,
    page: 0,
    size: 0,
    totalElementsOnPage: 0,
    totalPage: 0,
  },
  selectedGraphNameOtan: "positiveActiveEnergy",

  // DINRAIL
  DinRailReadCurrentTableData: [],
  DinRailTablePagination: null,
  DinRailTableData: [],
  DinRailGraphData: [],
  selectedGraphNameDinRail: "positiveActiveEnergy",
};
