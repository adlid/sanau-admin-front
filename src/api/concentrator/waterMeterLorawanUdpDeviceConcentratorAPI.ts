import { instance } from "../axios.instance";
import {
  changeMeterImpulsesNumberType,
  changeMeterReportPeriodType,
  getConcentratorMeterParamsType,
  IWaterLorawanChangeDateTimeProps,
  ILorawanEditGatewayProps,
  searchConcentratorMeterParamsType,
  WaterCounterpartyValuesType,
  WaterDescriptionValuesType,
} from "../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";

export const waterMeterLorawanUdpDeviceConcentratorAPI = {
  getAllConcentrators: async () => {
    try {
      return await instance.get("/admin-system/lorawan/gateways");
    } catch (error: any) {
      throw error.response;
    }
  },

  searchConcentrators: async (query: string) => {
    try {
      return await instance.post("/admin-system/search/water/gateways", { query });
    } catch (error: any) {
      throw error.response;
    }
  },

  getСoncentratorMeters: async (params: getConcentratorMeterParamsType) => {
    try {
      return await instance.post(`/admin-system/gateway/meters?page=${params.page - 1}&size=10`, {
        id: params.id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  searchСoncentratorMeters: async (params: searchConcentratorMeterParamsType) => {
    try {
      return await instance.post(`/admin-system/search/water/meters?page=${params.page - 1}&size=10`, {
        id: params.id,
        query: params.query,
        type: params.type,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  changeMeterReportPeriod: async (params: changeMeterReportPeriodType) => {
    try {
      return await instance.post(`/admin-system/water/set/report/period`, params);
    } catch (error: any) {
      throw error.response;
    }
  },

  changeMeterImpulsesNumber: async (params: changeMeterImpulsesNumberType) => {
    try {
      return await instance.post(`/admin-system/water/impulses/set`, params);
    } catch (error: any) {
      throw error.response;
    }
  },

  readMeterReportPeriod: async (meterId: string) => {
    try {
      return await instance.post(`/admin-system/water/meter/period`, { meterId });
    } catch (error: any) {
      throw error.response;
    }
  },

  getMeterReportPeriod: async (meterId: string) => {
    try {
      return await instance.post(`/admin-system/water/meter/period`, { meterId });
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

  waterConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "water-lorawan",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveWaterConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedDescriptionWaterConcentrator: async (data: WaterDescriptionValuesType) => {
    try {
      return await instance.put("/admin-system/edit/water/meter", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedCounterpartyWaterConcentrator: async (data: WaterCounterpartyValuesType) => {
    try {
      return await instance.put("/admin-system/assign/water/meter", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  getDescriptionWaterConcentratorDevEUI: async (id: string) => {
    try {
      return await instance.post("/admin-system/water/devEUI", { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  changeWaterLorawanTimeDate: async (params: IWaterLorawanChangeDateTimeProps) => {
    try {
      return await instance.post("/admin-system/water/current/time/set", params);
    } catch (error: any) {
      throw error.response;
    }
  },

  editWaterLorawanGateway: async (params: ILorawanEditGatewayProps) => {
    try {
      return await instance.put("/admin-system/edit/water/gateway", params);
    } catch (error: any) {
      throw error.response;
    }
  },

  updateWaterLorawanGateway: async () => {
    try {
      return await instance.get("/admin-system/update/gateways");
    } catch (error: any) {
      throw error.response;
    }
  },

};
