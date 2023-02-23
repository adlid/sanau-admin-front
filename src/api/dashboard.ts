import { instance } from "./axios.instance";

export const dashboardAPI = {
  getUserInfo: async () => {
    try {
      return await instance.get("/admin-system/user/total/count");
    } catch (error: any) {
      throw error.response;
    }
  },

  getMeterInfo: async () => {
    try {
      return await instance.get("/admin-system/meter/total/count");
    } catch (error: any) {
      throw error.response;
    }
  },

  getMeterServices: async () => {
    try {
      return await instance.get("/meter-status/statuses");
    } catch (error: any) {
      throw error.response;
    }
  },

  toggleMeterServices: async (serviceId: string) => {
    try {
      return await instance.put(`/meter-status/edit/${serviceId}`);
    } catch (error: any) {
      throw error.response;
    }
  },
};
