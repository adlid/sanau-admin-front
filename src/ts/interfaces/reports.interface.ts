import { DateType } from "../types/indication.types";

export interface IDownloadReportParamsProps {
  id: string;
  from: DateType;
  to: DateType;
}

export interface IDownloadAllElectrocityReportParamsProps {
  from: DateType;
  to: DateType;
  meterId: Array<string>;
}

export interface IDownloadReportWaterMeters {
  meterId: string[]
  from: DateType,
  to: DateType
}

export interface IDownloadReportWaterMetersFolders {
  from: DateType;
  to: DateType;
  folders: string[]
}

export interface IGetTokenLorawanWater {
  meterId: string[]
  dateFrom: DateType
  dateTo: DateType
}

export interface IDownloadNewReportParamsProps {
  from: DateType;
  to: DateType;
  meterId: Array<string>;
  type: "HOURLY" | "DAILY" | "MONTHLY";
  meterType: "USPD" | "GPRS" | "LORAWAN" | "BLUETOOTH" | "GAS";
  folderName?: string;
}

export interface IDownloadNewReport2ParamsProps extends IDownloadNewReportParamsProps {
  parameter: "A+" | "A-" | "R+" | "R-"
}

export interface IGasReportParams {
  from: DateType;
  to: DateType;
  meterId: Array<string>;
}
