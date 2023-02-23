import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { string } from "yup/lib/locale";

export type DateType = null | Date | MaterialUiPickersDate | string;

export type GraphsNameType = "activeEnergy" | "reactiveEnergy" | "power" | "voltage";
export type LorawanGraphsNameType =
  | "activeEnergyTotal"
  | "amperageTotal"
  | "cosTotal"
  | "powerActiveTotal"
  | "powerReactiveTotal"
  | "powerTotal"
  | "reactiveEnergyTotal"
  // | "totalActivePower"
  // | "totalPower"
  // | "totalReactivePower"
  | "voltageTotal";
export type LorawanGraphsNameTypeNew =
  | "amperage"
  | "positiveActiveEnergy"
  | "positiveReactiveEnergy"
  | "power"
  | "reverseActiveEnergy"
  | "reverseReactiveEnergy"
  | "voltage";
export type WaterGraphsNameType = "waterIndication" | "electricityBattery" | "signalIntensity" | "consumption";
export type GasGraphsNameType = "consumption" | "battery" | "temperature" | "batteryMilliVolt" | "usegascount";
export type GPRSGraphsNameType =
  | "amperage"
  | "positiveActiveEnergy"
  | "positiveReactiveEnergy"
  | "power"
  | "reverseActiveEnergy"
  | "reverseReactiveEnergy"
  | "voltage";

export type GPRSGraphNamePhaseType =
  | "phaseA"
  | "phaseB"
  | "phaseC";

export type DinRailGraphsNameType =
  | "positiveActiveEnergy"
  | "reverseActiveEnergy"
  | "positiveReactiveEnergy"
  | "reverseReactiveEnergy";

export interface IDetailGasMeterUdpInfoProps {
  id: string;
  barcode: string;
  serial: number;
  cmdStatus: number;
  isExistCmd: number;
  cmdName: string;
  finallyPackage: number;
  active: boolean;
  deviceName: string;
  type: string;
  serialNumber: string;
  manufacturer: string;
  setUpOrganization: string;
  checkTime: string;
  createdAt: string;
  updatedAt: string;
  roleName: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  personalAccountNumber: string;
  array: {
    id: string;
    state: number;
    jfMode: number;
    signalIntensity: number;
    meterTime: string;
    cumulunt: number;
    batteryMilliVolt: number;
    spareBatteryMilliVolt: number;
    remainderGasAmount: number;
    price: number;
    wirelessPayCount: number;
    purchaseGasGross: number;
    totalUse: number;
    isValveClose: number;
    isBatteryBad: number;
    isMagneticDisturbance: number;
    isRevealGas: number;
    isRemoteCloseValve: number;
    isFlowException: number;
    isValveErr: number;
    isInnerBatErr: number;
    arrearsCloseValue: number;
    isTilt: number;
    dieMeter: number;
    disassemble: number;
    pulseBreak: number;
    reedErr: number;
    isCkgvClose: number;
    communicationFault: number;
    isWycgqFault: number;
    isShock: number;
    isCkqkf: number;
    securityCheckFailure: number;
    scrapFailure: number;
    ljOutLimitsFailure: number;
    alarmCloseValue: number;
    signalNoise: number;
    standardCumulunt: number;
    temperature: number;
    pressure: number;
    jtUseGas: number;
    cardNo: string;
    iccId: string;
    imei: string;
    cid: string;
    pci: string;
    wddd: number;
    reportMode: string;
    softwareVerNum: string;
    timezone: string;
    collectionTime: string;
    caliber: string;
    workTime: string;
    nbWorkTime: string;
    pinCode: string;
    ecl: string;
    txtPower: string;
    imsi: string;
    frequencyPoint: string;
    csq: string;
    isLowTemperatureAlarm: number;
    isHighTemperatureAlarm: number;
    workCumulunt: number;
    timeOfDataReceive: string;
  };
}

export type IndicationMeterListItem = {
  active: boolean;
  autoRead: boolean;
  checkDate: DateType;
  createdAt: DateType;
  id: string;
  lastFixDate: DateType;
  manufacturer: null | string;
  meterType: string;
  serial: number;
  user: null;
};

export type ReadMeterInfoFilterType = {
  from: DateType | string; //remove string soon
  to: DateType | string;
  meterId: Array<string>;
  type: string | null;
  timeFrom: string;
  timeTo: string;
};

export type ReadWaterMeterInfoFilterType = {
  dateFrom: DateType | string;
  dateTo: DateType | string;
  meterId: Array<string>;
  type?: string | null;
};

export type ReadHourlyWaterMeterInfoFilterType = {
  from: DateType | string;
  to: DateType | string;
  meterId: Array<string>;
};

export type ReadGasMeterInfoFilterType = {
  from: DateType | string;
  to: DateType | string;
  meterId: Array<string>;
  type?: string | null;
};

export type GetGasMeterDetailSidebarInfoPropsType = {
  barcode: string;
  arrayId: string;
};

export type ReadMeterConsiderInfoFilterType = {
  dateFrom: DateType | string;
  dateTo: DateType | string;
  id: Array<string>;
  type: string | null;
  timeFrom: string;
  timeTo: string;
  selectedMeterType?: string;
};

export type ActiveEnergyMainTablePart = {
  createdAt: Date;
  currentLessThanPrev: boolean;
  fixedAt: Date;
  incorrectData: boolean;
  successfulRead: boolean;
  diff: number;
  syncAt: Date;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  total: number;
  totalGreaterOrLess: boolean;
  type: string;
};

export type PowerMainTablePart = {
  reatedAt: Date;
  fixedAt: Date;
  diff: number;
  incorrectData: boolean;
  instantKw: number;
  maxKw: number;
  maxKwFixedTime: Date;
  successfulRead: boolean;
  syncAt: Date;
  type: string;
  activePower: number;
  coefficient: number;
  createdAt: Date;
  frequency: number;
  fullPower: number;
  reactivePower: number;
};

export type StatusesMainTablePart = {
  meterError: number;
  communicationError: number;
  incorrectData: boolean;
  successfulRead: boolean;
  createdAt: DateType;
  syncAt: DateType;
  fixedAt: DateType;
  relay: boolean;
};

export type EventsMainTablePart = {
  cover: DateType;
  powerOn: DateType;
  powerOff: DateType;
  type: string;
  incorrectData: boolean;
  successfulRead: boolean;
  createdAt: DateType;
  syncAt: DateType;
  fixedAt: DateType;
  coverCount: number;
  powerOffCount: number;
  powerOnCount: number;
};

export type VoltageMainTablePart = {
  diff: number;
  phaseA: number;
  phaseB: number;
  phaseC: number;
  type: string;
  incorrectData: boolean;
  successfulRead: boolean;
  createdAt: DateType;
  syncAt: DateType;
  fixedAt: DateType;
};

export type AmperageMainTablePart = {
  diff: number;
  phaseA: number;
  phaseB: number;
  phaseC: number;
  type: string;
  incorrectData: boolean;
  successfulRead: boolean;
  createdAt: DateType;
  syncAt: DateType;
  fixedAt: DateType;
};

export type ReactiveEnergyTablePart = {
  total: number;
  diff: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  type: string;
  totalGreaterOrLess: boolean;
  currentLessThanPrev: boolean;
  incorrectData: boolean;
  successfulRead: boolean;
  createdAt: DateType;
  syncAt: DateType;
  fixedAt: DateType;
};

//consider info
export type MainTableDataType = {
  activeEnergy: null | ActiveEnergyMainTablePart;
  amperage: null | AmperageMainTablePart;
  event: null | EventsMainTablePart;
  fixedAt: string;
  power: PowerMainTablePart;
  reactiveEnergy: null | ReactiveEnergyTablePart;
  serial: number;
  voltage: null | VoltageMainTablePart;
  status: null | StatusesMainTablePart;
  index: number;
};

//water

export type MainWaterTableDataType = {
  hourlyDataTime?: DateType;
  consumption?: any;
  waterIndication: number;
  electricityBattery: number;
  signalIntensity: number;
  fixedAt: string;
  id: number;
  alertStatus: boolean;
  waterPipeInstallationPositionReverseAlarm: boolean;
  flowSensorFailureOrAtcAlarm: boolean;
  temperatureSensorFaultAlarm: boolean;
  waterPipeLeakageFaultAlarm: boolean;
  valveFailureAlarm: boolean;
  reverseFlowAlarm: boolean;
  batteryPowerAlarm: boolean;
  meterId: string;
  createdAt: string;
  devEUI: string;
  deviceName: string;
  gatewayID: string;
  commonType: string;
  verificationDate: string;
  location: string;
  fullName: string;
  roleName: string;
  phoneNumber: string;
  email: string;
};

//gas

export type MainGasTableDataType = {
  // new
  index: number;
  fixedAt: string;
  usegascount: string;
  barcode: string;
  // old
  batteryMilliVoltWithFloatingPoint: string;
  isValveCloseOrOpen: string;
  id: string;
  useGasCount: number;
  alarmCloseValue: number;
  arrearsCloseValue: number;
  battery: string;
  batteryMilliVolt: number;
  caliber: string;
  cardNo: string;
  cid: string;
  collectionTime: string;
  communicationFault: number;
  consumption: number;
  csq: "26";
  cumulunt: number;
  dieMeter: number;
  disassemble: number;
  ecl: number;
  frequencyPoint: string;
  gasModel: { barcode: string };

  iccId: string;
  imei: string;
  imsi: string;
  isBatteryBad: number;
  isCkgvClose: number;
  isCkqkf: number;
  isFlowException: number;
  isHighTemperatureAlarm: number;
  isInnerBatErr: number;
  isLowTemperatureAlarm: number;
  isMagneticDisturbance: number;
  isRemoteCloseValve: number;
  isRevealGas: number;
  isShock: number;
  isTilt: number;
  isValveClose: number;
  isValveErr: number;
  isWycgqFault: number;
  jfMode: number;
  jtUseGas: number;
  ljOutLimitsFailure: number;
  meterTime: string;
  nbWorkTime: string;
  pci: string;
  pinCode: string;
  pressure: number;
  price: number;
  pulseBreak: number;
  purchaseGasGross: number;
  reedErr: number;
  remainderGasAmount: number;
  reportMode: string;
  scrapFailure: number;
  securityCheckFailure: number;
  signalIntensity: number;
  signalNoise: number;
  softwareVerNum: string;
  spareBatteryMilliVolt: number;
  standardCumulunt: number;
  state: number;
  temperature: number;
  timeOfDataReceive: string;
  timezone: string;
  totalUse: number;
  txtPower: string;
  wddd: number;
  wirelessPayCount: number;
  workCumulunt: number;
  workTime: string;
  location: string;
  fullName: string;
  roleName: string;
  phoneNumber: string;
  email: string;
};

export type ReadMeterMainTableType = {
  elementsSize: number;
  hasNext: boolean;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
  data: Array<MainTableDataType>;
};

export type ReadWaterMeterMainTableType = {
  elementsSize: number;
  hasNext: boolean;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
  data: Array<MainWaterTableDataType>;
};

export type ReadGasMeterMainTableType = {
  elementsSize: number;
  hasNext: boolean;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
  data: Array<MainGasTableDataType>;
};

export type GetGasTableDataType = {
  meterId: Array<string>;
  type: string;
  dateFrom: any;
  timeFrom?: string;
  dateTo: any;
  timeTo?: string;
  page?: number;
};

export type GetMainTableDataType = {
  token: string;
  page: number;
};

export interface IMetersListByGroupKey {
  page: number;
  field: string;
  query: string;
  key: string;
}

export type GraphItemType = {
  fixedAt: DateType;
  value: number;
};

export type GraphType = {
  activeEnergy: null | GraphItemType;
  reactiveEnergy: null | GraphItemType;
  power: null | GraphItemType;
  amperage: null | GraphItemType;
  voltage: null | GraphItemType;
  serial: number;
};

export type PowerIndicationMetersSearchBodyType = {
  page: number;
  value: string;
};

export type BluetoothBodyType = {
  id: Array<string>;
  role: "ROLE_OPERATOR";
  lastFixFrom: DateType;
  lastFixTo: DateType;
};

export interface IWaterHourlyDataConsider {
  meterId: string;
  date: DateType;
}

export interface getHourlyWaterMeterInfoProps {
  token: string;
  pageNum: number;
}
export interface IParametersWaterHourlyMeterData {
  token: string;
}

//lora

export type LoraActiveTableItem = {
  active: true;
  consumption: number;
  createdAt: string;
  devEUI: string;
  fixedAt: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  total: number;
};

export type LoraVoltageTableItem = {
  createdAt: string;
  fixedAt: string;
  devEUI: string;
  phaseA: number;
  phaseB: number;
  phaseC: number;
};

export type LoraPowerActive = {
  active: boolean;
  consumption: number;
  createdAt: string;
  devEUI: string;
  fixedAt: string;
  instantKw: number;
};

export type LoraCosType = {
  active: boolean;
  consumption: number;
  cos: number;
  createdAt: string;
  devEUI: string;
  fixedAt: string;
};

//filters
export type BluetoothFilterType = {
  dateFrom: MaterialUiPickersDate | null;
  dateTo: MaterialUiPickersDate | null;
};

export type uspdFilterType = {
  dateFrom: MaterialUiPickersDate | null;
  dateTo: MaterialUiPickersDate | null;
  groupValue: string;
  parameterValue: string;
  startHour: string;
  finishHour: string;
};

export type gprsFilterType = {
  page: number;
  meterId: Array<string>;
  from: any;
  to: any;
  type: string | null;
  selectedMeterType?: string;
  parameterValue?: string;
};

export interface dinRailExcellFilterType {
  meterId: Array<string>;
  from: any;
  to: any;
  type: string;
  parameterValue?: string;
  timeFrom?: any;
  timeTo?: any;
}

export interface dinRailFilterType extends dinRailExcellFilterType {
  page: number;
}

export type readDinRailFilterType = {
  meterId: Array<string>;
  type: string;
  dateFrom: any;
  dateTo: any;
  timeFrom?: any;
  timeTo?: any;
};

export type gprsExcellType = {
  meterId: Array<string>;
  from: any;
  to: any;
  type: string | null;
};

export type gprsGetDataType = {
  meterId: Array<string>;
  from: any;
  to: any;
  type: string | null;
  parameterValue: string,
  page?: number,
  size?: number
};

export type gprsGetDataEventsType = {
  meterId: Array<string>;
  from: any;
  to: any;
  type: string | null;
  page?: number,
  size?: number
};

export type getAllMetersIdType = {
  groupId: string
  meterType: string
}


// usdp read meter
export type UspdTableItemDataType = {
  elementsSize: number;
  hasNext: boolean;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
  data: Array<MainTableDataType>;
};

export type UsdpTableDataResponseType = {
  deviceName: number;
  data: UspdTableItemDataType
}

export type UspdGraphItemDataType = {
  activeEnergy: null | GraphItemType;
  reactiveEnergy: null | GraphItemType;
  power: null | GraphItemType;
  amperage: null | GraphItemType;
  voltage: null | GraphItemType;
  serial: number;
  fixedAt: string | null;
}

export type UsdpGraphDataResponseType = {
  deviceName: number;
  data: Array<UspdGraphItemDataType>
}
// 