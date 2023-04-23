import { instance } from "../../axios.instance";

export const userAPI = {
  getUserInfo: async () => {
    try {
      return await instance.get(`/admin-system/user-profile`);
    } catch (error: any) {
      throw error.response;
    }
  },
  getAuthHistory: async () => {
    try {
      return await instance.get(
        `/admin-system/user-profile/authentication-history `
      );
    } catch (error: any) {
      throw error.response;
    }
  },
  edit: async (values: {
    id: string;
    firstname: string;
    lastname: string;
    fathersname: string;
    phoneNumber: string | number;
  }) => {
    try {
      return await instance.post("/admin-system/user-profile/update", values);
    } catch (error: any) {
      throw error.response;
    }
  },
};
