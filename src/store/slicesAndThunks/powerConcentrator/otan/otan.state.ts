import { OtanListResponseType } from "../../../../ts/types/gprs.types";
import { OrganizationTree } from "../../../../ts/types/groupcontrol.types";

type OtanStateType = {
  otanStep1Values: {
    ip: string;
    port: string;
    deviceId: string;
  };
  otanMetersList: Array<OtanListResponseType>;
  otanDetailValues: null | OtanListResponseType;
  isFetchingModal: boolean;
  selectedMeters: Array<string>;
  selectedAllMeters: boolean;
  taksonomyTree: OrganizationTree[];
  selectedFolderId: string;
  foldersList: { id: string, name: string }[];
  folderLoading: boolean;
  selectedOtanEditMeterId: string | null
  otanloading: boolean;
};

export const otanState: OtanStateType = {
  selectedOtanEditMeterId: null,
  foldersList: [],
  folderLoading: false,
  selectedFolderId: "",
  otanStep1Values: {
    ip: "",
    port: "",
    deviceId: "",
  },
  otanDetailValues: null,
  otanMetersList: [],
  isFetchingModal: false,
  selectedMeters: [],
  selectedAllMeters: false,
  taksonomyTree: [],
  otanloading: false
};
