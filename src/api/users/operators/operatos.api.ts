import {
  IActivateOperatorProps,
  IChangeOperatorRightsProps,
  ICreateOperatorProps,
  ICreateTemplateProps,
  IDetailOperatorProps,
  IDetailTemplateProps,
  IEditOperatorProps,
  IEditTemplateProps,
  IOperatorsListProps,
} from "../../../ts/interfaces/users.interface";
import { instance } from "../../axios.instance";

export const operatorsAPI = {
  getOwnInfo: async () => {
    try {
      return await instance.get(`/admin-system/operator/get/info`);
    } catch (error: any) {
      throw error.response;
    }
  },

  changePassword: async (data: any) => {
    try {
      return await instance.post(`/admin-system/operator/change/password`, data);
    } catch (error: any) {
      throw error.response;
    }
  },

  operatorsList: async (pageNum: number) => {
    try {
      return await instance.get(`/admin-system/operators/list?page=${pageNum - 1}&size=10`);
    } catch (error: any) {
      throw error.response;
    }
  },

  operatorsListFilter: async (values: IOperatorsListProps) => {
    try {
      return await instance.post(
        `/admin-system/operators/filter/search?sortBy=${values.sortBy || "asc"}&page=${values.page - 1}&size=10`,
        values.options
      );
    } catch (error: any) {
      throw error.response.response;
    }
  },

  create: async (values: ICreateOperatorProps) => {
    try {
      return await instance.post(`/admin-system/register/operator`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  delete: async (id: string) => {
    try {
      return await instance.post(`/admin-system/operators/delete/by/id`, {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  detail: async (id: string) => {
    try {
      return await instance.post(`/admin-system/operators/detail`, { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  edit: async (values: IEditOperatorProps) => {
    try {
      return await instance.post(`/admin-system/operators/edit`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  activate: async (values: IActivateOperatorProps) => {
    try {
      return await instance.put(`/account/operator/activation`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  blockUnblock: async (id: string) => {
    try {
      return await instance.post(`/admin-system/operators/block/unblock`, {
        id,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  changeRights: async (values: IChangeOperatorRightsProps) => {
    try {
      return await instance.post(`/admin-system/operators/privileges/change`, values);
    } catch (error: any) {
      throw error.response;
    }
  },
};

export const templatesAPI = {
  privilegesList: async () => {
    try {
      return await instance.get("/admin-system/all/privileges");
    } catch (error: any) {
      throw error.response;
    }
  },

  templatesList: async () => {
    try {
      return await instance.get("/admin-system/all/templates");
    } catch (error: any) {
      throw error.response;
    }
  },

  search: async (name: string) => {
    try {
      return await instance.post("/admin-system/template/search/by/name", {
        name,
      });
    } catch (error: any) {
      throw error.response;
    }
  },

  create: async (values: ICreateTemplateProps) => {
    try {
      return await instance.post("/admin-system/create/template", values);
    } catch (error: any) {
      throw error.response;
    }
  },

  delete: async (id: string) => {
    try {
      return await instance.post("/admin-system/template/delete/by/id", { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  detail: async (id: string) => {
    try {
      return await instance.post("/admin-system/template/get", { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  edit: async (values: IEditTemplateProps) => {
    try {
      return await instance.post("/admin-system/template/edit", values);
    } catch (error: any) {
      throw error.response;
    }
  },
};
