import { instance } from "./axios.instance";

export const releHistoryAPI = {
  getReleHistory: async () => {
    try {
      return await instance.get(`/lorawan-electric/rele/history`);
    } catch (error: any) {
      throw error.response;
    }
  },
  
};
