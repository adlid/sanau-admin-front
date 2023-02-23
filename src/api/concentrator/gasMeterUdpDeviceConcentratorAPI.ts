import { instance } from "../axios.instance";
import {
  changeMeterImpulsesNumberType,
  changeMeterReportPeriodType,
  getConcentratorMeterParamsType,
  IWaterLorawanChangeDateTimeProps,
  GasCounterpartyValuesType,
  GasDescriptionValuesType,
  meterMountingType,
} from "../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";

export const gasMeterUdpDeviceConcentratorAPI = {
  getAllConcentrators: async () => {
    try {
      return await instance.get("/gas/stations");
    } catch (error: any) {
      throw error.response;
    }
  },

  getСoncentratorMeters: async (page: number) => {
    try {
      return await instance.get(`/gas-java/list`);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedDescriptionGasConcentrator: async (data: GasDescriptionValuesType) => {
    try {
      return await instance.post("/gas-java/create/description", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedCounterpartyGasConcentrator: async (data: GasCounterpartyValuesType) => {
    try {
      return await instance.post("/gas-java/add/userInfo", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  personalAccountSearch: async (personalAccountNumber: string) => {
    try {
      return await instance.post("/admin-system/user/by/personalAccountNumber", {
        personalAccountNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  gasConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "gas-udp",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveGasConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  getDescriptionGasConcentratorBarcode: async (id: string) => {
    try {
      return await instance.get(`/gas-java/detail?id=${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  meterMounting: async (params: meterMountingType) => {
    try {
      return await instance.post(`/assemble-management/assemble`, params);
    } catch (error: any) {
      throw error.response;
    }
  },

  connectMeter: async (barcode: string) => {
    try {
      return await instance.put("/gas-java/create", { barcode });
    } catch (error: any) {
      throw error.response;
    }
  },
  activateMeter: async (selectedMeters: Array<string>) => {
    try {
      return await instance.put("/gas-java/activate/meter", { id: selectedMeters });
    } catch (error: any) {
      throw error.response;
    }
  },
  deactivateMeter: async (selectedMeters: Array<string>) => {
    try {
      return await instance.put("/gas-java/deactivate/meter", { id: selectedMeters });
    } catch (error: any) {
      throw error.response;
    }
  },
};
