import { instance } from "../axios.instance";
import { GPRStype, GPRSTableData, GPRSDescription, GPRSInfoType } from "../../ts/types/gprs.types";
import { gprsGetDataEventsType, gprsGetDataType } from "../../ts/types/indication.types"

export const powerMeterGPRsAPI = {
  connectGPRS: async (gprsBody: GPRStype) => {
    try {
      return await instance.post("/gprs/create/meter", gprsBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  getGPRSData: async (gprsDataBody: GPRSTableData) => {
    try {
      return await instance.post("/gprs/read/direct", gprsDataBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  changeGPRSdescription: async (gprsBody: GPRSDescription) => {
    try {
      return await instance.post("/gprs/create/description", gprsBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  changeGPRSuserInfo: async (gprsBody: GPRSInfoType) => {
    try {
      return await instance.post("/gprs/add/userInfo", gprsBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  GPRSpersonalAccountSearch: async (personalAccountNumber: string) => {
    try {
      return await instance.post("/admin-system/user/by/personalAccountNumber", {
        personalAccountNumber,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  GPRSMetersList: async (text: string, queryType: string, folderId: string, type: "DIRECT" | "DYNAMIC") => {
    try {
      return await instance.get("/gprs/list", {
        params: {
          folderId,
          queryType,
          text,
          type
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  //temp andrey (https://gitlab.com/quybit/sanau-saas/sanau-saas-admin-getaway/-/blob/develop/docs/gprsRead.md)
  GPRSReadCurrent: async (metersId: string[], type: string) => {
    try {
      return await instance.post("/gprs/read/current", {
        meterId: metersId,
        type: type,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  //temp andrey (https://gitlab.com/quybit/sanau-saas/sanau-saas-admin-getaway/-/blob/develop/docs/gprsRead.md)
  GPRSReadHourly: async (
    metersId: string[],
    dateFrom: string,
    dateTo: string,
    type: string,
    timeFrom: string,
    timeTo: string
  ) => {
    try {
      return await instance.post("/gprs/read/hourly", {
        meterId: metersId,
        dateFrom,
        dateTo,
        type,
        timeFrom,
        timeTo,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  //temp andrey Read daily
  GPRSReadyDaily: async (metersId: string[], dateFrom: string, dateTo: string, type: string) => {
    try {
      return await instance.post("/gprs/read/daily", {
        meterId: metersId,
        dateFrom: dateFrom,
        dateTo: dateTo,
        type: type,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  //temp andrey read monthly
  GPRSReadMonthly: async (metersId: string[], dateFrom: string, dateTo: string, type: string) => {
    try {
      return await instance.post("/gprs/read/monthly", {
        meterId: metersId,
        dateFrom,
        dateTo,
        type,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  activateGPRSMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/gprs/activate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivateGPRSMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/gprs/deactivate/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  getGPRSTableData: async (body: gprsGetDataType) => {
    try {
      return await instance.post("/gprs/read/record", body, {
        params: {
          page: body.page ?? 0,
          size: body.size ?? 10
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  getGPRSGraphData: async (body: gprsGetDataType) => {
    try {
      return await instance.post("/gprs/read/record/graph", body, {
        params: {
          page: 0,
          size: 10
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  getGPRSTableEventsData: async (body: gprsGetDataEventsType) => {
    try {
      return await instance.post("/gprs/full/event", body, {
        params: {
          page: body.page ?? 0,
          size: body.size ?? 10
        }
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  getFoldersGPRS: async (text: string) => {
    try {
      return await instance.get(`/gprs/filter/folder`, {
        params: {
          text
        }
      })
    } catch (error: any) {
      throw error.response;
    }
  },

  createFolderGPRS: async (name: string) => {
    try {
      return await instance.post(`/gprs/create/folder`, { name })
    } catch (error: any) {
      throw error.response;
    }
  },

  syncMetersGprsDynamic: async () => {
    try {
      return await instance.get(`/gprs/save/dynamic/meters`)
    } catch (error: any) {
      throw error.response;
    }
  }
};
