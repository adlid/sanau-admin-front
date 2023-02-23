import { instance } from "../axios.instance";
import {
  getConcentratorMeterParamsType,
  ILorawanEditGatewayProps,
  searchConcentratorMeterParamsType,
  WaterCounterpartyValuesType,
  WaterDescriptionValuesType,
} from "../../ts/types/lorawanUdpDevice.types";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";
import {
  ILorawanDailyConsiderData,
  IRelayToggle,
  ISendRequestAnswer,
  ISendRequestAnswerHourly,
  ISendRequestAnswerHourlyGraph,
  ISendRequestLorawanReadData,
} from "../../ts/interfaces/powerMeterConcentrator";

export const powerMeterLorawanUdpDeviceConcentratorAPI = {
  getAllConcentrators: async () => {
    try {
      return await instance.get("/admin-system/electric/gateways");
    } catch (error: any) {
      throw error.response;
    }
  },

  searchConcentrators: async (query: string) => {
    try {
      return await instance.post("/lorawan-electric/search/gateways", { query });
    } catch (error: any) {
      throw error.response;
    }
  },

  getLorawanСoncentratorMeters: async (params: getConcentratorMeterParamsType) => {
    try {
      return await instance.post(`/admin-system/electric/gateway/meters?page=${params.page - 1}&size=10`, {
        id: params.id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  searchLorawanСoncentratorMeters: async (params: searchConcentratorMeterParamsType) => {
    try {
      return await instance.post(`/admin-system/electric/gateway/meters?text=${params.query}&queryType=${params.type}`,
        {
          id: params.id
        }
      );
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

  powerConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "network",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  savePowerConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedDescriptionPowerConcentrator: async (data: WaterDescriptionValuesType) => {
    try {
      return await instance.put("/lorawan-electric/edit/meter", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedCounterpartyPowerConcentrator: async (data: WaterCounterpartyValuesType) => {
    try {
      return await instance.put("/lorawan-electric/assign/meter", data);
    } catch (error: any) {
      throw error.response;
    }
  },

  getDescriptionPowerConcentratorDevEUI: async (id: string) => {
    try {
      return await instance.post("/lorawan-electric/devEUI/by/id", { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  requestLoravanReadData: async (body: ISendRequestLorawanReadData) => {
    try {
      return await instance.post("/lorawan-electric/read-data", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  sendRequestLorabanConsider: async (body: ISendRequestAnswer) => {
    try {
      return await instance.post("/lorawan-electric/send/request", body);
    } catch (error: any) {
      throw error.response;
    }
  },
  requestAnswerLorabanConsider: async (body: ISendRequestAnswer) => {
    try {
      return await instance.post("/lorawan-electric/answer", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getAnswerLorawanDailyConsiderData: async (body: ILorawanDailyConsiderData) => {
    const { page, ...rest } = body;
    try {
      return await instance.post(`/network-server/read-daily?page=${page - 1}&size=10`, rest);
    } catch (error: any) {
      throw error.response;
    }
  },

  requestAnswerLorabanHourly: async (body: ISendRequestAnswerHourly) => {
    const { page, ...items } = body;
    try {
      return await instance.post(`/lorawan-electric/hourly?page=${page - 1}&size=10`, items);
    } catch (error: any) {
      throw error.response;
    }
  },

  requestAnswerLorabanGraph: async (body: ISendRequestAnswerHourlyGraph) => {
    try {
      return await instance.post(`/lorawan-electric/graph`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  requestAnswerLoravanRelay: async (body: IRelayToggle) => {
    try {
      return await instance.post("/lorawan-electric/event/request", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  responseAnswerLoravanRelay: async (body: IRelayToggle) => {
    try {
      return await instance.post("/lorawan-electric/event/response", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  editPowerLorawanGateway: async (body: ILorawanEditGatewayProps) => {
    try {
      return await instance.put("/lorawan-electric/edit/gateway", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getMeterInfoByDevEUI: async (devEUI: string) => {
    try {
      return await instance.get(`/lorawan-electric/info/${devEUI}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivateActivateLoraConcentrator: async (id: string) => {
    try {
      return await instance.put("/lorawan-electric/deactivate", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivateLoraConcentratorMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/lorawan-electric/deactivate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  activateLoraConcentratorMeters: async (id: Array<string>) => {
    try {
      return await instance.put("lorawan-electric/activate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  updatePowerGateway: async () => {
    try {
      return await instance.get("lorawan-electric/update/gateways");
    } catch (error: any) {
      throw error.response;
    }
  }
};
