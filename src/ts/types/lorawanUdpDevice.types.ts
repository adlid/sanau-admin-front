import { DateType } from "@date-io/type";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { GPRSAmperageType, GPRSEnergyType, GPRSPowerType, GPRSVoltageType } from "./gprsReadingTypes";

export interface ILoraMeterInfo {
  devEUI: string;
  type: string;
  serial: string;
  manufacturer: string;
  setUpOrganization: string;
  checkTime: MaterialUiPickersDate | null;
}

export type ConcentratorItemType = {
  id: string;
  active: boolean;
  gatewayID: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  firstSeenAt: string;
  lastSeenAt: string;
  organizationID: number;
  networkServerID: number;
  networkServerName: string;
  city: string;
  address: string;
};

export type GasConcentratorItemType = {
  id: string;
  updateAt: string;
  createdAt: string;
  stationId: string;
  stationIp: string;
  port: string;
};

export const UserRoles: any = {
  ROLE_USER: "Физическое лицо",
  ROLE_LEGAL: "Юридическое лицо",
};

export type ConcentratorMeters = {
  page: number;
  size: number;
  hasNext: boolean;
  totalPage: number;
  totalElementsOnPage: number;
  elementsSize: number;
  data: ConcentratorMeterType[];
};

export type GasConcentratorMeters = {
  page: number;
  size: number;
  hasNext: boolean;
  totalPage: number;
  totalElementsOnPage: number;
  elementsSize: number;
  data: GasConcentratorMeterType[];
};

export type GasConcentratorMeterType = {
  active: boolean;
  id: string;
  barcode: string;
  manufacturer: string | null;
  setUpOrganization: string | null;
  dateReleased: string | null;
  verificationDate: string | null;
  setUpDate: string | null;
  meterName: string | null;
  typeOfMeter: string | null;
  typeOfSize: string | null;
  direction: string | null;
  centerDistance: string | null;
  connectingThreadDiameter: string | null;
  reportCycle: string | null;
  softwareVersion: string | null;
  batteryVoltage: number | null;
  temperature: number | null;
  imsi: string | null;
  pincode: string | null;
  userInfo?: {
    id: string;
    personalAccountNumber: string;
    roleName: "ROLE_USER" | "ROLE_LEGAL";
    firstname: string;
    lastname: string;
    fathersname: string;
    organizationName?: string;
    position?: string;
    phoneNumber: string;
    email: string;
    city: string;
    district: string;
    street: string;
    house: string;
    flat: string;
  };
};

export type ConcentratorMeterType = {
  selected: boolean;
  relay: boolean;
  fixedAt: string;
  period: string;
  type: string;
  manufacturer: string;
  setUpOrganization: string;
  checkTime: string;
  currentTime: string;
  impulses: string;
  roleName: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  index: number;
  serial: string;
  id: string;
  deviceName: string;
  devEUI: string;
  devAddress: string;
  gatewayID: string;
  active: boolean;
  userId: null | string;
  createdAt: string;
  lastFixDate: string;
  electricityBattery: number;
  waterIndication: number;
  alertStatus: boolean;
  waterPipeInstallationPositionReverseAlarm: boolean;
  flowSensorFailureOrAtcAlarm: boolean;
  temperatureSensorFaultAlarm: boolean;
  waterPipeLeakageFaultAlarm: boolean;
  valveFailureAlarm: boolean;
  reverseFlowAlarm: boolean;
  batteryPowerAlarm: boolean;
  signalIntensity: number;
  personalAccountNumber: string;
};

export type getMeterReportPeriodType = {
  status: string;
  period: string;
};

export type changeMeterReportPeriodType = {
  meterId: string;
  period: string;
};

export type meterMountingType = {
  serialNumber: string;
  oldMeterSerialNumber: string;
  meterType: string;
  assemblingDate: MaterialUiPickersDate;
  type: string;
  proceed: true;
};

export type changeMeterDateAndTimeType = {
  meterId: string;
  period: string;
};

export type changeMeterImpulsesNumberType = {
  meterId: string;
  impulses: string;
};

export interface getConcentratorMeterParamsType {
  id: string;
  page: number;
}

export type searchConcentratorMeterParamsType = {
  id: string;
  page: number;
  query: string;
  type: string;
};

export type GasDescriptionValuesType = {
  barcode: string;
  type: string;
  serialNumber: string;
  manufacturer: string;
  setUpOrganization: string;
  checkTime?: any;
};

export type WaterDescriptionValuesType = {
  devEUI: string;
  manufacturer: string;
  setUpOrganization: string;
  checkTime?: any;
  serial: string;
  type: any;
};

export type IWaterLorawanChangeDateTimeProps = {
  meterId: string;
  date: string;
  time: string;
};

export type ILorawanEditGatewayProps = {
  id: string;
  city: string;
  address: string;
};

export type WaterCounterpartyValuesType = {
  meterId?: string;
  personalAccountNumber: string;
  roleName: "ROLE_USER" | "ROLE_LEGAL";
  firstname: string;
  lastname: string;
  fathersname: string;
  organizationName?: string;
  phoneNumber: string;
  email: string;
  position?: string;
  city: string;
  district: string;
  street: string;
  house: string;
  flat: string;
};

export type GasCounterpartyValuesType = {
  barcode: string;
  personalAccountNumber: string;
  userInfo: {
    personalAccountNumber: string;
    roleName: "ROLE_USER" | "ROLE_LEGAL";
    firstname: string;
    lastname: string;
    fathersname: string;
    organizationName?: string;
    position?: string;
    phoneNumber: string;
    email: string;
    city: string;
    district: string;
    street: string;
    house: string;
    flat: string;
  };
};

export type WaterPersonalAccountInitialValuesType = {
  devEUI: string;
  manufacturer: string;
  setUpOrganization: string;
  serial: string;
  type: any;

  personalAccountNumber: string;
  roleName: "ROLE_USER" | "ROLE_LEGAL";
  firstname: string;
  lastname: string;
  fathersname: string;
  organizationName: string;
  phoneNumber: string;
  email: string;
  position: string;
  city: string;
  district: string;
  street: string;
  house: string;
  flat: string;
};

export type GasPersonalAccountInitialValuesType = {
  devEUI: string;
  manufacturer: string;
  setUpOrganization: string;
  serial: string;
  type: any;

  personalAccountNumber: string;
  roleName: "ROLE_USER" | "ROLE_LEGAL";
  firstname: string;
  lastname: string;
  fathersname: string;
  organizationName: string;
  phoneNumber: string;
  email: string;
  position: string;
  city: string;
  district: string;
  street: string;
  house: string;
  flat: string;
};

export type PowerPersonalAccountInitialValuesType = {
  devEUI: string;
  manufacturer: string;
  setUpOrganization: string;
  serial: string;
  type: any;

  personalAccountNumber: string;
  roleName: "ROLE_USER" | "ROLE_LEGAL";
  firstname: string;
  lastname: string;
  fathersname: string;
  organizationName: string;
  phoneNumber: string;
  email: string;
  position: string;
  city: string;
  district: string;
  street: string;
  house: string;
  flat: string;
};

// previous

export type CreateConcentratorType = {
  ip: string;
  port: string;
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

//lorawan table
export type LorawanMainTableType = {
  deviceId: number;
  fixedAt: DateType;
  index: number;
  amperage: GPRSAmperageType;
  positiveActiveEnergy: GPRSEnergyType;
  positiveReactiveEnergy: GPRSEnergyType;
  power: GPRSPowerType;
  reverseActiveEnergy: GPRSEnergyType;
  reverseReactiveEnergy: GPRSEnergyType;
  voltage: GPRSVoltageType;
};