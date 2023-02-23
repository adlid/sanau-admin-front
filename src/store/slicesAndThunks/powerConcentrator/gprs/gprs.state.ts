import { GPRSResponseType, GPRSuserInfoValuesType, GPRSListResponseType } from "../../../../ts/types/gprs.types";

type GPRSstateType = {
  GPRSResponseInitialValues: GPRSResponseType;
  GPRSstep1Values: {
    ip: string;
    port: string;
    deviceId: string;
  };
  GPRSuserInfoValues: GPRSuserInfoValuesType;
  GPRSMetersList: Array<GPRSListResponseType>;
  isFetchingModal: boolean;
  selectedMeters: Array<string>;
  selectedAllMeters: boolean;
  selectedFolderId: string;
  foldersList: { id: string, name: string }[];
  folderLoading: boolean;

  selectedGprsEditMeterId: string | null;
  GPRSloading: boolean;
};

export const GPRSstate: GPRSstateType = {
  selectedGprsEditMeterId: null,
  foldersList: [],
  folderLoading: false,
  selectedFolderId: "",
  GPRSResponseInitialValues: {
    attributes: {
      activeEnergy: false,
      amperageLimit: 0,
      apnName: "",
      apnPassword: "",
      apnUsername: "",
      closeDay: 0,
      closeHour: 0,
      domainIp: "",
      impulseNumber: 0,
      instantPower: false,
      localIp: "",
      maxPower: false,
      networkSettings: false,
      pagingDelay: 0,
      payloadLimit: 0,
      pingIp: "",
      powerLimit: 0,
      reactiveEnergy: false,
      reserveT1: "",
      reserveT2: "",
      reserveT3: null,
      reserveT4: null,
      status: false,
      t1: "",
      t2: "",
      t3: null,
      t4: null,
      tariffScheduleDate: "",
      totalEnergy: false,
      transitionDelay: 0,
      voltageLimit: 0,
    },
    description: {
      manufacturer: "",
      meterName: "",
      setUpOrganization: "",
      verificationDate: "",
    },
    information: {
      batteryVoltage: 0,
      binCode: "",
      disbalance: false,
      meterConstant: 0,
      programVersion: "",
      programming: false,
      relay: false,
      temperature: 0,
      timeInNetwork: 0,
    },
  },
  GPRSstep1Values: {
    ip: "10.145.196.139",
    port: "8001",
    deviceId: "874684",
  },
  GPRSuserInfoValues: {
    city: "",
    district: "",
    email: "",
    fathersname: "",
    firstname: "",
    flat: "",
    house: "",
    lastname: "",
    organizationName: "",
    personalAccountNumber: "",
    phoneNumber: "",
    position: "",
    roleName: "",
    street: "",
  },
  GPRSMetersList: [],
  isFetchingModal: false,
  selectedMeters: [],
  selectedAllMeters: false,
  GPRSloading: false,
};
