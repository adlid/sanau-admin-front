import {
  AllConcentratorMetersType,
  CreateConcentratorType,
  ConcentratorItemType,
  ConcentratorMeterType,
  ScheduleType,
} from "../../../../ts/types/dataTransmissionsDevice.types";
import { ICreateConcentrtorMeter, IMeterSettingsInitialValues } from "../../../../ts/interfaces/powerMeterConcentrator";

import { DateType } from "../../../../ts/types/indication.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

type powerMeterTransmissionDeviceConcentratorStateType = {
  allConcentratorMeters: AllConcentratorMetersType | null;
  concentratorIPandPort: CreateConcentratorType;
  isConcentratorConnected: boolean;
  allConcentrators: Array<ConcentratorItemType>;
  selectedConcentrator: null | ConcentratorItemType;
  selectedConcentratorMeters: Array<ConcentratorMeterType>;
  selectedMeterObj: null | ConcentratorMeterType; //for delete
  selectedMeters: Array<string>;
  selectedAllMeters: boolean;
  isFetchingModal: boolean;
  isFetchingSelectedConcentratorMeters: boolean;
  isFetchingConcentratorEdit: boolean;
  isFetchingUSPD: boolean;
  isSidebarOpen: boolean;
  meterType: string;
  schedule: ScheduleType;
  isConcentratorReset: boolean;
  isConcentratorChangeDate: boolean;
  sideBarConcentratorDate: null | DateType;
  meterSettings: null | ICreateConcentrtorMeter;
  tansonomyTree: OrganizationTree[];
  currentUSPDMeterId: string;
  meterSettingsInitialValues: IMeterSettingsInitialValues;
  socketMessages: Array<any>;
  // uspd
  uspdLogs: any;

  isExcelLoading: boolean;
};

export const powerMeterTransmissionDeviceConcentratorState: powerMeterTransmissionDeviceConcentratorStateType = {
  allConcentratorMeters: null,
  concentratorIPandPort: {
    ip: "",
    port: "",
    token: "",
  },
  allConcentrators: [],
  isConcentratorConnected: false,
  selectedConcentrator: null,
  selectedMeterObj: null,
  selectedConcentratorMeters: [],
  selectedMeters: [],
  selectedAllMeters: false,
  isFetchingModal: false,
  isFetchingSelectedConcentratorMeters: false,
  isFetchingConcentratorEdit: false,
  isFetchingUSPD: false,
  isSidebarOpen: false,
  meterType: "all",
  schedule: {
    zeroDay: 0,
    zeroTime: 0,
    pollsPerDay: 0,
    startTime: 0,
    interval: 0,
  },
  isConcentratorReset: false,
  isConcentratorChangeDate: false,
  sideBarConcentratorDate: null,
  meterSettings: null,
  tansonomyTree: [],
  currentUSPDMeterId: "",
  meterSettingsInitialValues: {
    meterName: "",
    setUpOrganization: "",
    manufacturer: "",
    meterGeneration: "",
    serial: "",
    box: "",
    mod: "",
    pos: "",
    primaryLine: "",
    firstLine: "",
    secondLine: "",
    thirdLine: "",
    phase: "",
    type: "",
    residue: false,
    creditResidue: false,
    password: false,
    head: false,
    //state
    state: "",
    prevDayEnd: false,
    saveMaxPower: false,
    activeEnergy: false,
    reactiveEnergy: false,
    threePhaseVoltage: false,
    threePhaseAmperage: false,
    activePower: false,
    eventLogs: false,
    errorFlagPrevDay: false,
    relayState: false,
    dailyFixingTime: false,
    monthlyFixingTime: false,
    relayingStatus: false,
  },
  socketMessages: [],
  // uspd
  uspdLogs: null,

  isExcelLoading: false,
};
