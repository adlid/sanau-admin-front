import { instance } from "../axios.instance";
import { OtanType, GPRSTableData, GPRSDescription, GPRSInfoType, OtanAttributesType } from "../../ts/types/gprs.types";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";
import { string } from "yup";

export const powerMeterOtanAPI = {
  // create
  connectOtan: async (otanBody: OtanType) => {
    try {
      return await instance.post("/otan/create", otanBody);
    } catch (error: any) {
      throw error.response;
    }
  },

  // save edited data
  detailOtanInfo: async (id: string) => {
    try {
      return await instance.get(`/otan/detail?id=${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },
  changeOtanDescription: async (gprsBody: GPRSDescription) => {
    try {
      return await instance.post("/otan/create/description", gprsBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  changeOtanUserInfo: async (gprsBody: GPRSInfoType) => {
    try {
      return await instance.post("/otan/add/userInfo", gprsBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  changeOtanAtttibutes: async (attributesBody: OtanAttributesType) => {
    try {
      return await instance.post("/otan/create/attribute", attributesBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  otanPersonalAccountSearch: async (personalAccountNumber: string) => {
    try {
      return await instance.post("/admin-system/user/by/personalAccountNumber", {
        personalAccountNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  otanMetersList: async (text: string, queryType: string, folderId: string) => {
    try {
      return await instance.get("/otan/list", {
        params: {
          folderId, queryType, text
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  // activate-deactivate
  activateOtanMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/otan/activate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivateOtanMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/otan/deactivate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  // taksonomy
  otanConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "otan",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveOtanConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },


  getFoldersOTAN: async (text: string) => {
    try {
      return await instance.get(`/otan/filter/folder`, {
        params: {
          text
        }
      })
    } catch (error: any) {
      throw error.response;
    }
  },

  createFolderOTAN: async (name: string) => {
    try {
      return await instance.post(`/otan/create/folder`, { name })
    } catch (error: any) {
      throw error.response;
    }
  },

};
