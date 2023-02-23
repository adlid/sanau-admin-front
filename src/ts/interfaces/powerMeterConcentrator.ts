import { DateType } from "../types/indication.types";
import { LoraActiveTableItem, LoraVoltageTableItem, LoraPowerActive, LoraCosType } from "../types/indication.types";

export interface IBluetoothConcentratorMeter {
  id: string;
  active: string;
  createdAt: string;
  fullName: string;
  lastFixDate: string;
  location: string;
  organization: string;
  personalAccountNumber: string;
  position: string;
  roleName: string;
  serialNumber: string;
  type: string;
}

export interface IBluetoothConcentratorMeterWithSelectFlag extends IBluetoothConcentratorMeter {
  selected: boolean;
}

export interface IBluetoothConcentratorAllMeter {
  elementsSize: number;
  hasNext: boolean;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
}

export interface IBluetoothConcentratorAllMeterWithSelect extends IBluetoothConcentratorAllMeter {
  data: Array<IBluetoothConcentratorMeterWithSelectFlag>;
}

export interface IBluetoothConcentratorAllMeterWithoutSelect extends IBluetoothConcentratorAllMeter {
  data: Array<IBluetoothConcentratorMeter>;
}

export interface IBluetoothNewFilter {
  sortBy: string;
  page: number;
  field: string;
  query: string;
  createFrom: DateType;
  createTo: DateType;
  fixFrom: DateType;
  fixTo: DateType;
}

export interface IActivateDeactiveBluetoothConcentrator extends IBluetoothNewFilter {
  ids: Array<string>;
  value: "activate" | "deactivate";
}

export interface IConcentratorBodyRequest {
  name: string;
  city: string;
  region: string;
  address: string;
  zeroDay: number;
  zeroTime: number;
  pollsPerDay: number;
  startTime: number;
  interval: number;
  deviceId: string;
  domainIp: string;
  domainPort: string;
  mode: string;
  ethernetIp: string;
  ethernetMask: string;
  ethernetGateway: string;
  apnName: string;
  apnUsername: string;
  apnPassword: string;
}

export interface IEditConcentrator extends IConcentratorBodyRequest {
  id: string;
}

export interface IAddInfoToConcentrator extends IConcentratorBodyRequest {
  ip: string;
  port: string;
}

export interface ICreateConcentrtorMeterBody {
  verificationTime: string;
  verificationDate: string;
  meterName: string;
  manufacturer: string;
  setUpOrganization: string;
  primaryLine: number;
  firstLine: number;
  secondLine: number;
  thirdLine: number;
  phase: string;
  box: number;
  mod: number;
  pos: number;
  password: boolean;
  head: boolean;
  type: string;
  creditResidue: boolean;
  residue: boolean;
  prevDayEnd: boolean;
  saveMaxPower: boolean;
  numberOfTariffs: number;
  state: string;
  serial: number;
  serialLength: number;
  meterGeneration: string;
  desc1: Idesc1;
  desc3: Idesc3;
  desc4: Idesc3;
  desc5: Idesc3;
  desc6: Ides6;
  userInfo: {
    personalAccountNumber: string;
    roleName: string;
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
}

export interface ICreateConcentrtorMeter extends ICreateConcentrtorMeterBody {
  concId: string;
}

export interface IEditConcentrtorMeter extends ICreateConcentrtorMeterBody {
  id: string;
}

export interface Idesc1 {
  instantPower: boolean;
  numberOfDaysWithoutEnergy: boolean;
  lastDayReactiveSum: boolean;
  lastDayActiveSum: boolean;
  suppressErrorLogging: boolean;
  lastMonthReactiveSum: boolean;
  lastMonthActiveSum: boolean;
}

export interface Idesc3 {
  activeEnergy: boolean;
  reactiveEnergy: boolean;
  eventLogs: boolean;
  threePhaseVoltage: boolean;
  threePhaseAmperage: boolean;
  activePower: boolean;
  relayingStatus: boolean;
  relayState: boolean;
}

export interface Ides6 {
  errorFlagToday: boolean;
  errorFlagPrevDay: boolean;
  errorFlagPrevMonth: boolean;
  dailyFixingTime: boolean;
  monthlyFixingTime: boolean;
}

export interface ISendRequestAnswer {
  id?: any;
  type: string;
}

export interface ISendRequestLorawanReadData {
  meterId: Array<string>;
  startDate: DateType;
  endDate: DateType;
  startTime: string;
  endTime: string;
  format: string;
  type: string;
}

export interface ISendRequestAnswerHourlyGraph extends ISendRequestAnswer {
  startDate: DateType;
  endDate: DateType;
  startTime: string;
  endTime: string;
  format: string;
  meterId?: any;
}
export interface ILorawanDailyConsiderData {
  meterId: Array<{ id: string }>;
  from: DateType;
  to: DateType;
  type: string;
  page: number;
}

export interface ISendRequestAnswerHourly extends ISendRequestAnswerHourlyGraph {
  page: number;
  meterId?: any;
  type: string;
}

export interface IRelayToggle {
  id: string;
  type: string;
}

export interface IMeterSettingsInitialValues {
  meterName: string;
  setUpOrganization: string;
  manufacturer: string;
  meterGeneration: string;
  serial: string;
  box: string;
  mod: string;
  pos: string;
  primaryLine: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  phase: string;
  type: string;
  residue: boolean;
  creditResidue: boolean;
  password: boolean;
  head: boolean;
  //state
  state: string;
  prevDayEnd: boolean;
  saveMaxPower: boolean;
  activeEnergy: boolean;
  reactiveEnergy: boolean;
  threePhaseVoltage: boolean;
  threePhaseAmperage: boolean;
  activePower: boolean;
  eventLogs: boolean;
  errorFlagPrevDay: boolean;
  relayState: boolean;
  dailyFixingTime: boolean;
  monthlyFixingTime: boolean;
  relayingStatus: boolean;
}

export interface ILorawanRequestAnswerHourlyItem {
  activeEnergyTotal: Array<LoraActiveTableItem>;
  activeEnergyMinus: Array<LoraActiveTableItem>;
  amperageByPhase: Array<LoraVoltageTableItem>;
  reactiveEnergyTotal: Array<LoraActiveTableItem>;
  reactiveEnergyMinus: Array<LoraActiveTableItem>;
  totalActivePower: Array<LoraPowerActive>;
  totalPower: Array<LoraPowerActive>;
  totalReactivePower: Array<LoraPowerActive>;
  voltageByPhase: Array<LoraVoltageTableItem>;
  totalCos: Array<LoraCosType>;
  meterLists: Array<{
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
}

export interface ILorawanRequestAnswerHourly extends IBluetoothConcentratorAllMeter {
  data: Array<ILorawanRequestAnswerHourlyItem>;
  withData: boolean;
}

export interface ILorawanRequestAnswerGraph {
  activeEnergyTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  amperageTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  cosTotal?: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  devEUI?: string;
  meterLists?: null | Array<{
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerActiveTotal?: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerReactiveTotal?: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  reactiveEnergyTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  totalActivePower: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  totalPower: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  totalReactivePower: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  voltageTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  meterId: string;
  withData?: boolean;
}

interface ILorawanGraphItem {
  activeEnergyTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  amperageTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  cosTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  devEUI?: string;
  meterId: string;
  meterLists?: null | Array<{
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerActiveTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerReactiveTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  powerTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  reactiveEnergyTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  voltageTotal: null | Array<{
    consumption: number;
    createdAt: string;
    devEUI: string;
    fixedAt: string;
  }>;
  withData: boolean;
}

// by Islam new for lorawan:


export type LorawanAmperageVoltageDataType = {
  active: boolean
  consumption: number
  createdAt: string
  devEUI: string | null
  fixedAt: string
  phaseA: number
  phaseB: number
  phaseC: number
}

export type LorawanReactiveEnergyDataType = {
  active: boolean
  consumption: number
  diff: number
  createdAt: string
  devEUI: string | null
  fixedAt: string
  t1: number
  t2: number
  t3: number
  t4: number
  total: number
}

export type LorawanPowerDataType = {
  activePower: number
  fixedAt: string
  fullPower: number
  reactivePower: string
  type: string
  coefficient: number
  frequency: number
}

export type LorawanTableDataItemNew = {
  amperage: LorawanAmperageVoltageDataType
  deviceId: string
  fixedAt: string
  index: number
  positiveActiveEnergy: LorawanReactiveEnergyDataType
  positiveReactiveEnergy: LorawanReactiveEnergyDataType
  power: LorawanPowerDataType
  reverseActiveEnergy: LorawanReactiveEnergyDataType
  reverseReactiveEnergy: LorawanReactiveEnergyDataType
  voltage: LorawanAmperageVoltageDataType
}

export interface ILorawanTableDataBodyWithPagination extends IBluetoothConcentratorAllMeter {
  data: Array<LorawanTableDataItemNew>
  withData: boolean
}

export interface ILorawanTableDataNew {
  data: ILorawanTableDataBodyWithPagination
  deviceName: string
}

export interface ILorawanGraphItemNew {
  amperage: {
    fixedAt: string | null
    phaseA: number
    phaseB: number
    phaseC: number
    value: number
  }
  deviceId: string | null
  fixedAt: string | null
  positiveActiveEnergy: {
    fixedAt: string | null
    value: number
  }
  positiveReactiveEnergy: {
    fixedAt: string | null
    value: number
  }
  power: {
    fixedAt: string | null
    value: number 
    type: string
  }
  reverseActiveEnergy: {
    fixedAt: string | null
    value: number
  }
  reverseReactiveEnergy: {
    fixedAt: string | null
    value: number
  }
  voltage: {
    fixedAt: string | null
    phaseA: number
    phaseB: number
    phaseC: number
    value: number
  }
}

export interface ILorawanGraphDataNew {
  data: Array<ILorawanGraphItemNew>
  deviceName: string
}
