import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import {
  AllConcentratorMetersType,
  GasConcentratorItemType,
  GasConcentratorMeterType,
  GasConcentratorMeters,
  GasPersonalAccountInitialValuesType,
} from "../../../../ts/types/lorawanUdpDevice.types";

type gasMeterUdpDeviceConcentratorStateType = {
  allConcentrators: Array<GasConcentratorItemType>;
  selectedConcentrator: null | GasConcentratorItemType;
  selectedConcentratorMeters: null | GasConcentratorMeters;
  selectedMeterObj: null | GasConcentratorMeterType;
  allConcentratorMeters: AllConcentratorMetersType | null;
  isFetchingSelectedConcentratorMeters: boolean;
  currentPeriod: string;
  personalAccountInitialValues: GasPersonalAccountInitialValuesType;
  tansonomyTree: OrganizationTree[];
  barcode: string;
  selectedMeters: string[];
};

export const gasMeterUdpDeviceConcentratorState: gasMeterUdpDeviceConcentratorStateType = {
  allConcentrators: [],
  selectedConcentrator: null,
  selectedConcentratorMeters: null,
  selectedMeterObj: null,
  allConcentratorMeters: null,
  isFetchingSelectedConcentratorMeters: false,
  currentPeriod: "",
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
  barcode: "",
  selectedMeters: [],
};
