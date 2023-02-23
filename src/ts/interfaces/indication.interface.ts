import { DateType } from "../types/indication.types";

export interface IIndicationMeterListItem {
  active: boolean;
  autoRead: boolean;
  checkDate: DateType;
  createdAt: DateType;
  id: string;
  devEUI: string;
  lastFixDate: DateType;
  manufacturer: null | string;
  type: string;
  serial: number;
  user: null;
  serialNumber: string;
  isActive: boolean;
}

export interface IBluetoothMeterItem {
  active: string;
  createdAt: string;
  fullName: string;
  indication: string;
  lastFixDate: string;
  location: string;
  organization: string;
  personalAccountNumber: string;
  position: string;
  roleName: string;
  serialNumber: string;
  type: string;
}

export interface BluetoothGraphData {
  indication: string;
  lastFixDate: string;
  serialNumber: string;
}

export interface IIndicationMetersList {
  elementSize: number;
  hasNext: false;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
}

export interface IIndicationMeterListItemWithSelect extends IIndicationMeterListItem {
  title?: string;
  selected: boolean;
}

export interface IBluetoothMeterItemWithSelect extends IBluetoothMeterItem {
  selected: boolean;
}

export interface IIndicationMetersListWithoutSelect extends IIndicationMetersList {
  data: Array<IIndicationMeterListItem>;
}

export interface IIndicationMetersListWithSelect extends IIndicationMetersList {
  data: Array<IIndicationMeterListItemWithSelect>;
}

export interface IBluetoothMeterListItemWithoutSelect extends IIndicationMetersList {
  data: Array<IBluetoothMeterItem>;
}

export interface IBluetoothMeterListItemWithSelect extends IIndicationMetersList {
  data: Array<IBluetoothMeterItemWithSelect>;
}

export interface IBluetoothMeterTable extends IIndicationMetersList {
  data: Array<BluetoothGraphData>;
}

// water
export interface IWaterIndicationMeterListItem {
  battery: number;
  id: string;
  deviceName: string;
  devEUI: string;
  devAddress: string;
  gatewayID: string;
  lastFixDate: DateType;
  createdAt: DateType;
  active: boolean;
  userId: string;
  isActive: boolean;
  personalAccountNumber: string;
  commonType: string;
  verificationDate: string;
  title: string;
  location: string;
  fullName: string;
  roleName: string;
  phoneNumber: string;
  email: string;

  electricityBattery: number;
  waterIndication: number;
  signalIntensity: number;
  waterPipeInstallationPositionReverseAlarm: boolean;
  flowSensorFailureOrAtcAlarm: boolean;
  temperatureSensorFaultAlarm: boolean;
  waterPipeLeakageFaultAlarm: boolean;
  valveFailureAlarm: boolean;
  reverseFlowAlarm: boolean;
  batteryPowerAlarm: boolean;
}

export interface IWaterIndicationMeterListItemWithSelect extends IWaterIndicationMeterListItem {
  selected: boolean;
}

export interface IWaterIndicationMetersListWithoutSelect extends IIndicationMetersList {
  data: Array<IWaterIndicationMeterListItem>;
}

export interface IWaterIndicationMetersListWithSelect extends IIndicationMetersList {
  data: Array<IWaterIndicationMeterListItemWithSelect>;
}

// gas
export interface IGasIndicationMeterListItem {
  barcode: string;
  status: string;
  battery: number;
  id: string;
  deviceName: string;
  devEUI: string;
  devAddress: string;
  gatewayID: string;
  lastFixDate: DateType;
  createdAt: DateType;
  active: boolean;
  userId: string;
  isActive: boolean;
  personalAccountNumber: string;
  commonType: string;
  verificationDate: string;
  title: string;
  location: string;
  fullName: string;
  roleName: string;
  phoneNumber: string;
  email: string;
  electricityBattery: number;
  waterIndication: number;
  signalIntensity: number;
  waterPipeInstallationPositionReverseAlarm: boolean;
  flowSensorFailureOrAtcAlarm: boolean;
  temperatureSensorFaultAlarm: boolean;
  waterPipeLeakageFaultAlarm: boolean;
  valveFailureAlarm: boolean;
  reverseFlowAlarm: boolean;
  batteryPowerAlarm: boolean;
}

export interface IGasIndicationMeterListItemWithSelect extends IGasIndicationMeterListItem {
  selected: boolean;
}

export interface IGasIndicationMetersListWithoutSelect extends IIndicationMetersList {
  data: Array<IGasIndicationMeterListItem>;
}

export interface IGasIndicationMetersListWithSelect extends IIndicationMetersList {
  data: Array<IGasIndicationMeterListItemWithSelect>;
}
