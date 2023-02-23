import { instance } from "../axios.instance";
import {
  GPRStype,
  GPRSTableData,
  GPRSDescription,
  GPRSInfoType,
  DinRailType,
  DinRailAttributes,
} from "../../ts/types/gprs.types";
import {
  dinRailExcellFilterType,
  dinRailFilterType,
  gprsFilterType,
  readDinRailFilterType,
} from "../../ts/types/indication.types";
import { OrganizationTree } from "../../ts/types/groupcontrol.types";

export const powerMeterDinRailAPI = {
  getDinRailTableData: async (body: dinRailFilterType) => {
    try {
      return await instance.post(`/dinrail/read/record?page=${body.page}&size=10`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  getDinRailGraphData: async (body: dinRailFilterType) => {
    try {
      return await instance.post(`/dinrail/read/record/graph`, body);
    } catch (error: any) {
      throw error.response;
    }
  },

  saveExcelDinRailMeters: async (body: dinRailExcellFilterType) => {
    try {
      return await instance.post(`/dinrail/read/record/excel`, body, { responseType: "arraybuffer" });
    } catch (error: any) {
      throw error.response;
    }
  },

  //  READ DINRAIL DATA
  dinRailReadCurrent: async (meterId: string[], type: string) => {
    try {
      return await instance.post("/dinrail/read/instantaneous", { meterId, type });
    } catch (error: any) {
      throw error.response;
    }
  },

  dinRailReadHourly: async (body: readDinRailFilterType) => {
    try {
      return await instance.post("/dinrail/read/hourly", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  dinRailReadyDaily: async (body: readDinRailFilterType) => {
    try {
      return await instance.post("/dinrail/read/daily", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  dinRailReadMonthly: async (body: readDinRailFilterType) => {
    try {
      return await instance.post("/dinrail/read/monthly", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  // CONFIGURE DINRAIL METER

  dinRailMetersList: async (text: string, queryType: string, folderId: string) => {
    try {
      return await instance.get(`/dinrail/list`, {
        params: {
          folderId,
          queryType,
          text
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  activateDinRailMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/dinrail/activate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivateDinRailMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/dinrail/deactivate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  connectDinRail: async (body: DinRailType) => {
    try {
      return await instance.post("/dinrail/create", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  changeDinRailAttributes: async (body: DinRailAttributes) => {
    try {
      return await instance.post("/dinrail/attribute", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  changeDinRailUserInfo: async (body: GPRSInfoType) => {
    try {
      return await instance.post("/dinrail/add/userInfo", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  dinRailPersonalAccountSearch: async (personalAccountNumber: string) => {
    try {
      return await instance.post("/admin-system/user/by/personalAccountNumber", {
        personalAccountNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  dinRailGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "dinrail",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveDinRailGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  detailDinRailInfo: async (id: string) => {
    try {
      return await instance.get(`/dinrail/detail?id=${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  getFoldersDINRAIL: async ( text: string) => {
    try {
      return await instance.get(`/dinrail/filter/folder`, {
        params: {
          text
        }
      })
    } catch (error: any) {
      throw error.response;
    }
  },

  createFolderDINRAIL: async (name: string) => {
    try {
      return await instance.post(`/dinrail/create/folder`, { name })
    } catch (error: any) {
      throw error.response;
    }
  },
};
