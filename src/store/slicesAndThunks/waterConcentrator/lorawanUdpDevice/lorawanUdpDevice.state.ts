import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";
import {
  AllConcentratorMetersType,
  ConcentratorItemType,
  ConcentratorMeterType,
  ConcentratorMeters,
  WaterPersonalAccountInitialValuesType,
} from "../../../../ts/types/lorawanUdpDevice.types";

type waterMeterLorawanUdpDeviceConcentratorStateType = {
  allConcentrators: Array<ConcentratorItemType>;
  selectedConcentrator: null | ConcentratorItemType;
  selectedConcentratorMeters: null | ConcentratorMeters;
  selectedMeterObj: null | ConcentratorMeterType;
  allConcentratorMeters: AllConcentratorMetersType | null;
  isFetchingSelectedConcentratorMeters: boolean;
  currentPeriod: string;
  personalAccountInitialValues: WaterPersonalAccountInitialValuesType;
  tansonomyTree: OrganizationTree[];
  devEUI: string;
};

export const waterMeterLorawanUdpDeviceConcentratorState: waterMeterLorawanUdpDeviceConcentratorStateType = {
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
  devEUI: "",
};
