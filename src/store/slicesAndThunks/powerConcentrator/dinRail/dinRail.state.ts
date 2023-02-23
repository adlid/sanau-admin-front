import { IDinRailDetailData, IDinRailMeterListItem } from "../../../../ts/types/dinRailTypes";
import { GPRSuserInfoValuesType } from "../../../../ts/types/gprs.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

type DinRailStateType = {
  dinRailResponseInitialValues: IDinRailDetailData;
  dinRailUserInfoValues: GPRSuserInfoValuesType;
  dinRailMetersList: Array<IDinRailMeterListItem>;
  dinRailMetersListPagination: {
    page: number;
    size: number;
    hasNext: boolean;
    totalPage: number;
    totalElementsOnPage: number;
    elementsSize: number;
  };
  isFetchingModal: boolean;
  selectedMeters: Array<string>;
  selectedAllMeters: boolean;
  taksonomyTree: Array<OrganizationTree>;
  selectedFolderId: string;
  foldersList: { id: string, name: string }[];
  folderLoading: boolean;
  selectedDinRailEditMeterId: string | null;
  DinRailLoading: boolean;
};

export const dinRailState: DinRailStateType = {
  selectedDinRailEditMeterId: null,
  selectedFolderId: "",
  foldersList: [],
  folderLoading: false,
  dinRailResponseInitialValues: {
    id: "",
    ip: "",
    deviceId: "",
    port: "",
    password: "",
    networkAddress: "",
    timer: "",
    schedule: "",
    version: "",
    type: "",
    voltage: 0,
    voltagePhaseA: "",
    voltagePhaseB: "",
    voltagePhaseC: "",
    active: false,
    isHeadMeter: false,
    headMeterId: "",
  },
  dinRailUserInfoValues: {
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
  dinRailMetersList: [],
  dinRailMetersListPagination: {
    page: 1,
    size: 10,
    hasNext: false,
    totalPage: 1,
    totalElementsOnPage: 0,
    elementsSize: 0,
  },
  isFetchingModal: false,
  selectedMeters: [],
  selectedAllMeters: false,
  taksonomyTree: [],
  DinRailLoading: false
};
