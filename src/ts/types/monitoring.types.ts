import { DateType } from "./indication.types";

export type MonitoringToken = {
  meterId: Array<string>;
  from: any;
  to: any;
  type: string;
  meterType: string;
};

export type MonitoringDataResponse = {
  info: Array<{
    date: string;
    dateFormat: string;
    monthName: string;
    name: string;
    serialNumber: string;
    data: Array<MonitoringType>;
  }>;
  type: string;
};

export type MonitoringType = {
  indicationDayPercentageInfo: {
    date: string;
    info: string;
    time: string;
  };
  date: string;
  qtyOfCorrectData: number;
  qtyOfInvalidData: number;
  qtyOfUnreadData: number;
  time: string;
};
