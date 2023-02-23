import { personalAccountInitialValuesType } from "../../../../ts/types/powerMeterBluetooth.types";
import { IBluetoothConcentratorAllMeterWithSelect } from "../../../../ts/interfaces/powerMeterConcentrator";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

type PowerMeterBluetoothConcentratorStateType = {
  bluetoothConnectionInitialValues: {
    serialNumber: string;
    type: string;
    meterId: string;
    manufacturer: string;
    setUpOrganization: string;
  };
  personalAccountInitialValues: personalAccountInitialValuesType;
  bluetoothConcentratorMeters: null | IBluetoothConcentratorAllMeterWithSelect;
  selectedMetersId: Array<string>;
  isFetchingModal: boolean;
  selectedAllMeters: boolean;
  sortValue: string;
  currentBluetoothMeterId: string;
  tansonomyTree: OrganizationTree[];
};

export const powerMeterBluetoothConcentratorState: PowerMeterBluetoothConcentratorStateType = {
  bluetoothConnectionInitialValues: {
    serialNumber: "",
    type: "ormanSinglePhase",
    meterId: "",
    manufacturer: "",
    setUpOrganization: "",
  },
  personalAccountInitialValues: {
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
  bluetoothConcentratorMeters: null,
  selectedMetersId: [],
  isFetchingModal: false,
  selectedAllMeters: false,
  sortValue: "default",
  currentBluetoothMeterId: "",
  tansonomyTree: [],
};
