import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import {
  AllConcentratorMetersType,
  ConcentratorItemType,
  ConcentratorMeterType,
  ConcentratorMeters,
  PowerPersonalAccountInitialValuesType,
  ILoraMeterInfo,
} from "../../../../ts/types/lorawanUdpDevice.types";

type powerMeterLorawanUdpDeviceConcentratorStateType = {
  allConcentrators: Array<ConcentratorItemType>;
  selectedConcentrator: null | ConcentratorItemType;
  selectedConcentratorMeters: ConcentratorMeters;
  selectedMeters: Array<string>;
  selectedAllMeters: boolean;
  selectedMeterObj: null | ConcentratorMeterType;
  allConcentratorMeters: AllConcentratorMetersType | null;
  isFetchingSelectedConcentratorMeters: boolean;
  personalAccountInitialValues: PowerPersonalAccountInitialValuesType;
  tansonomyTree: OrganizationTree[];
  devEUI: string;
  loraMeterInfo: ILoraMeterInfo;
};

export const powerMeterLorawanUdpDeviceConcentratorState: powerMeterLorawanUdpDeviceConcentratorStateType = {
  allConcentrators: [],
  selectedConcentrator: null,
  selectedConcentratorMeters: {
    page: 0,
    size: 0,
    hasNext: false,
    totalPage: 0,
    totalElementsOnPage: 0,
    elementsSize: 0,
    data: [],
  },
  selectedMeterObj: null,
  selectedMeters: [],
  selectedAllMeters: false,
  allConcentratorMeters: null,
  isFetchingSelectedConcentratorMeters: false,
  personalAccountInitialValues: {
    setUpOrganization: "",
    manufacturer: "",
    devEUI: "",
    serial: "",
    type: "",
    personalAccountNumber: "",
    roleName: "ROLE_LEGAL",
    firstname: "",
    lastname: "",
    fathersname: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
    position: "",
    city: "",
    district: "",
    street: "",
    house: "",
    flat: "",
  },
  tansonomyTree: [],
  devEUI: "",
  loraMeterInfo: { devEUI: "", type: "", serial: "", manufacturer: "", setUpOrganization: "", checkTime: null },
};
