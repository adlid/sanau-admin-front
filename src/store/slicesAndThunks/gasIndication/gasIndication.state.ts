import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { IGasIndicationMetersListWithSelect } from "../../../ts/interfaces/indication.interface";

import {
  GasGraphsNameType,
  IDetailGasMeterUdpInfoProps,
  MainGasTableDataType,
  ReadGasMeterMainTableType,
} from "../../../ts/types/indication.types";

type gasFilterTimeType = {
  timeFrom: MaterialUiPickersDate | null;
  timeTo: MaterialUiPickersDate | null;
}

type GasIndicationStateType = {
  getTableDataFetching: boolean;
  getTableConsiderDataFetching: boolean;
  indicationMetersListArr: IGasIndicationMetersListWithSelect | null;
  selectedAllIndicationMeters: boolean;
  metersId: Array<string>;
  mainTableData: null | ReadGasMeterMainTableType;
  hourlyTableData: null | ReadGasMeterMainTableType;
  mainGraphData: null | Array<MainGasTableDataType>;
  mainHourlyGraphData: null | Array<MainGasTableDataType>;
  selectedGraphName: GasGraphsNameType;
  selectedGraphItem: string;
  detailUdpMeterData: null | IDetailGasMeterUdpInfoProps;
  currentReadMeterName: any;

  gasFilters: gasFilterTimeType;
};

export const gasIndicationState: GasIndicationStateType = {
  getTableDataFetching: false,
  getTableConsiderDataFetching: false,
  indicationMetersListArr: null,
  selectedAllIndicationMeters: false,
  metersId: [],
  mainTableData: null,
  hourlyTableData: null,
  mainGraphData: null,
  mainHourlyGraphData: null,
  selectedGraphName: "usegascount",
  selectedGraphItem: "",
  detailUdpMeterData: null,
  currentReadMeterName: "",

  gasFilters: {
    timeFrom: null,
    timeTo: null
  }
};
