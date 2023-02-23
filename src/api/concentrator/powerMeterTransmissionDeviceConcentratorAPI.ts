import { instance } from "../axios.instance";
import { CreateConcentratorType, PowerConcentratorMeterSearch } from "../../ts/types/dataTransmissionsDevice.types";
import {
  IEditConcentrator,
  IAddInfoToConcentrator,
  ICreateConcentrtorMeter,
  IEditConcentrtorMeter,
} from "../../ts/interfaces/powerMeterConcentrator";
import { ChangeTimeConcentratorType } from "../../ts/types/dataTransmissionsDevice.types";
import { IUploadUSPDExcel, OrganizationTree } from "../../ts/types/groupcontrol.types";




export const powerMeterTransmissionDeviceConcentratorAPI = {
  createConcentrator: async (concentratorAddBody: CreateConcentratorType) => {
    try {
      return await instance.post("/admin-system/create/concentrator", concentratorAddBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  getAllConcentratorMeters: async (concentratorAddBody: CreateConcentratorType) => {
    try {
      return await instance.post("/admin-system/concentrator/meters", concentratorAddBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  addInfoToConcentrator: async (concentratorAddBody: IAddInfoToConcentrator) => {
    try {
      return await instance.put("/admin-system/create/concentrator", concentratorAddBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  getAllConcentrators: async (text: string) => {
    try {
      return await instance.get(`/admin-system/all/concentrators?text=${text}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  getСoncentratorMeters: async (body: PowerConcentratorMeterSearch) => {
    try {
      return await instance.post(`/admin-system/meters/by/concentrator?queryType=${body.queryType}&text=${body.search}`, {
        id: body.id
      });
    } catch (error: any) {
      throw error.response;
    }
  },


  deactivateActivateConcentrator: async (id: string) => {
    try {
      return await instance.put("/admin-system/activate/deactivate/concentrator", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  deactivateConcentratorMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/admin-system/deactivate/list/of/electric/meters", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  activateConcentratorMeters: async (id: Array<string>) => {
    try {
      return await instance.put("/admin-system/activate/list/of/electric/meters", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  editConcentrator: async (concentratorBody: IEditConcentrator) => {
    try {
      return await instance.put("/admin-system/edit/concentrator", concentratorBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  deleteConcentratorMeter: async (id: string) => {
    try {
      return await instance.post("/admin-system/delete/meter", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  resetConcentrator: async (id: string) => {
    try {
      return await instance.post("/admin-system/concentrator/restart", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  getSidebarConcentratorDate: async (id: string) => {
    try {
      return await instance.post("/admin-system/concentrator/receive/date", {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },
  changeConcentratorTimeDate: async (body: ChangeTimeConcentratorType) => {
    try {
      return await instance.post("/admin-system/edit/concentrator/date", body);
    } catch (error: any) {
      throw error.response;
    }
  },

  createConcentratorNewMeter: async (concentratorMaterBody: ICreateConcentrtorMeter) => {
    try {
      return await instance.post("/admin-system/create/meter", concentratorMaterBody);
    } catch (error: any) {
      throw error.response;
    }
  },
  editConcentratorMeter: async (concentratorMaterBody: IEditConcentrtorMeter) => {
    try {
      return await instance.post("/admin-system/edit/meter", concentratorMaterBody);
    } catch (error: any) {
      throw error.response;
    }
  },

  uspdConcentratorGroupControl: async (id: string) => {
    try {
      return await instance.post("/admin-system/group/meter/united/meter/list", {
        specificType: "uspd",
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  saveUSDPConcentratorGroupControl: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  uploadUSPDConcentratorExcel: async (data: FormData) => {
    try {
      return await instance.post("/upload/connection/by/excel", data)
    } catch (error: any) {
      throw error.response;
    }
  },

  updateMeterName: async (data: { id: string, type: string, meterName: string }) => {
    try {
      return await instance.post("/admin-system/update/meter/name", data)
    } catch (error: any) {
      throw error.response;
    }
  }
};
