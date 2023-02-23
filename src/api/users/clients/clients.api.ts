import {
  ICreateClientProps,
  IEditClientProps,
  IGetClientsFilteredListProps,
} from "../../../ts/interfaces/users.interface";
import { instance } from "../../axios.instance";

export const clientsAPI = {
  clientsListFilter: async (values: IGetClientsFilteredListProps) => {
    try {
      return await instance.post(
        `/user-management/search?sortBy=${values.sortBy || "def"}&page=${values.page - 1}&size=10`,
        values.options
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  createYL: async (values: ICreateClientProps) => {
    try {
      return await instance.post(`/user-management/register/ul`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  createFL: async (values: ICreateClientProps) => {
    try {
      return await instance.post(`/user-management/register/fl`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  deactivate: async (id: string) => {
    try {
      return await instance.put(`/user-management/deactivate/user`, { id });
    } catch (error: any) {
      throw error.response;
    }
  },

  detail: async (id: string) => {
    try {
      return await instance.get(`/user-management/ul/personal/area/${id}`);
    } catch (error: any) {
      throw error.response;
    }
  },

  editFL: async (values: IEditClientProps) => {
    try {
      return await instance.put(`/user-management/edit/fl`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  editYL: async (values: IEditClientProps) => {
    try {
      return await instance.put(`/user-management/edit/ul`, values);
    } catch (error: any) {
      throw error.response;
    }
  },

  blockUnblock: async (id: string) => {
    try {
      return await instance.put(`/user-management/block/unblock/user`, { id });
    } catch (error: any) {
      throw error.response;
    }
  },
};
