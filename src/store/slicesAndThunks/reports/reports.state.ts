import { ConcentratorItemType } from "../../../ts/types/dataTransmissionsDevice.types";

type ReportsStateType = {
  concentratorsListArr: Array<ConcentratorItemType>;
  selectedId: Array<string>;
  selectedFolders: Array<string>;
  selectedGateway: string;
  meterType: "GPRS" | "USPD" | "LORAWAN" | "GAS" | "BLUETOOTH";

  selectedAllReport: boolean;

  selectedFolderName: string;
};

export const reportsState: ReportsStateType = {
  concentratorsListArr: [],
  selectedId: [],
  selectedFolders: [],
  selectedGateway: "",
  meterType: "GPRS",

  selectedAllReport: false,
  
  selectedFolderName: ""
};
