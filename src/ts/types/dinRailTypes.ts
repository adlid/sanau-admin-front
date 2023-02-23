import { GPRSuserInfoValuesType } from "./gprs.types";
import { DateType } from "./indication.types";

export interface IDinRailReadCurrentTableData {
  positiveActiveEnergy: number;
  negativeActiveEnergy: number;
  positiveReactiveEnergy: number;
  negativeReactiveEnergy: number;
  voltagePhaseA: number;
  voltagePhaseB: number;
  voltagePhaseC: number;
  currentPhaseA: number;
  currentPhaseB: number;
  currentPhaseC: number;
  powerPhaseA: number;
  powerPhaseB: number;
  powerPhaseC: number;
  meterType: string;
  deviceId: number;
  fixedAt: string;
  meterId: string;
  activeEnergy: null | string;
  reactiveEnergy: null | string;
  power: null | string;
  voltage: null | string;
  current: null | string;
}

export interface IDinRailTableData {
  positiveActiveTotal: number;
  positiveActiveT1: number;
  positiveActiveT2: number;
  positiveActiveT3: number;
  positiveActiveT4: number;
  reverseActiveTotal: number;
  reverseActiveT1: number;
  reverseActiveT2: number;
  reverseActiveT3: number;
  reverseActiveT4: number;
  positiveReactiveTotal: number;
  positiveReactiveT1: number;
  positiveReactiveT2: number;
  positiveReactiveT3: number;
  positiveReactiveT4: number;
  reverseReactiveTotal: number;
  reverseReactiveT1: number;
  reverseReactiveT2: number;
  reverseReactiveT3: number;
  reverseReactiveT4: number;
  fixedAt: string;
  meterId: string;
  deviceId: number;
}

export type IDinRailTableDataNew = {
  data: {
    data: Array<IDinRailTableData>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
  }
  deviceName: number
}

export interface PaginationData {
  page: number;
  size: number;
  hasNext: boolean;
  totalPage: number;
  totalElementsOnPage: number;
  elementsSize: number;
}

export interface IDinRailGraphData {
  positiveActiveEnergy: {
    value: number;
    fixedAt: string;
  };
  reverseActiveEnergy: {
    value: number;
    fixedAt: string;
  };
  positiveReactiveEnergy: {
    value: number;
    fixedAt: string;
  };
  reverseReactiveEnergy: {
    value: number;
    fixedAt: string;
  };
  fixedAt: string;
  deviceId: number;
}

export type IDinRailGraphDataNew = {
  data: Array<IDinRailGraphData>
  deviceName: number
}

export interface IDinRailDetailData {
  id: string;
  ip: string;
  deviceId: string;
  port: string;
  password: string;
  networkAddress: string;
  timer: string;
  schedule: string;
  version: string;
  type: "ONE_PHASE" | "THREE_PHASE" | "";
  voltage: number;
  voltagePhaseA: string;
  voltagePhaseB: string;
  voltagePhaseC: string;
  active: boolean;
  isHeadMeter: boolean;
  headMeterId: string;
}

export interface IDinRailMeterListItem extends IDinRailDetailData {
  updatedAt?: string;
  selected?: boolean;
  userInfo?: GPRSuserInfoValuesType;
}
