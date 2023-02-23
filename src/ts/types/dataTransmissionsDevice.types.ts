import { DateType } from "./indication.types";
import { ICreateConcentrtorMeter } from "../interfaces/powerMeterConcentrator";

export type CreateConcentratorType = {
  ip: string;
  port: string;
  token: string;
};

export type ConcentratorMetersTypes = {
  serial: number;
  svr: number;
};

export type AllConcentratorMetersType = {
  deviceId: number;
  numberOfMeters: number;
  meters: Array<ConcentratorMetersTypes>;
  pollSettings: ScheduleType;
  concentratorApnSettings: ConcentratorApnSettingsType;
  concentratorDomainIpPortSettings: ConcentratorDomainIpPortSettingsType;
  concentratorNetworkSettings: concentratorNetworkSettingsType;
};

export interface ConcentratorItemType {
  selected?: boolean;
  active: boolean;
  address: string;
  apnName: string;
  apnPassword: string;
  apnUsername: string;
  city: string;
  createdAt: string;
  deviceId: number;
  domainIp: string;
  domainPort: number;
  ethernetGateway: string;
  ethernetIp: string;
  ethernetMask: string;
  id: string;
  interval: number;
  ip: string;
  lastFixDate: string;
  mode: string;
  name: string;
  pollsPerDay: number;
  port: number;
  region: string;
  schedule: string;
  startTime: number;
  totalMeters: number;
  zeroDay: number;
  zeroTime: number;
}

export type ConcentratorMeterType = {
  active: boolean;
  fathersname: null | string;
  firstname: null | string;
  id: string;
  lastname: null | string;
  personalAccountNumber: null | string;
  serial: number;
  svr: number;
  userId: null | string;
  selected: boolean;
  meterSettings: ICreateConcentrtorMeter;
};

export type ActivateDeactivatePopupsType = {
  concentratorId: string;
  id: Array<string>;
};

export type ScheduleType = {
  interval: number;
  pollsPerDay: number;
  startTime: number;
  zeroDay: number;
  zeroTime: number;
};

export type ConcentratorApnSettingsType = {
  apnName: string;
  apnPassword: string;
  apnUsername: string;
};

export type ConcentratorDomainIpPortSettingsType = {
  domainIp: string;
  domainPort: number;
};

export type concentratorNetworkSettingsType = {
  ethernetGateway: string;
  ethernetIp: string;
  ethernetMask: string;
  mode: string;
};

export type ChangeTimeConcentratorType = {
  id: string;
  localDate: string;
  localTime: string;
};

export type PowerConcentratorMeterSearch = {
  id: string;
  search: string;
  queryType: string;
};
