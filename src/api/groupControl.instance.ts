import { instance } from "./axios.instance";
import {
  IGetGroupTreeItemMaterIndicatorsListProps,
  IGetGroupTreeSearchParams,
  IGroupControlItemData,
  ISaveGroupItemMeterIndicatorsProps,
  OrganizationTree,
} from "../ts/types/groupcontrol.types";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel: any;

export const groupControlAPI = {
  getGroupTreeByType: async (type: string) => {
    if (cancel != undefined) {
      cancel();
    }

    try {
      return await instance.post(
        "/admin-system/group/meter/list",
        { type },
        {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        }
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  getGroupTreeBySearch: async (params: IGetGroupTreeSearchParams) => {
    if (cancel != undefined) {
      cancel();
    }

    try {
      return await instance.post(
        "/admin-system/group/meter/search",
        { ...params },
        {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        }
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  saveEditedGroupTree: async (fullGroupTree: OrganizationTree) => {
    try {
      return await instance.post("/admin-system/group/meter/list/save", fullGroupTree);
    } catch (error: any) {
      throw error.response;
    }
  },

  createGroupTreeItem: async (itemData: IGroupControlItemData) => {
    try {
      return await instance.post("/admin-system/group/meter/create", itemData);
    } catch (error: any) {
      throw error.response;
    }
  },

  getGroupTreeWithNewItemByKey: async (key: string) => {
    try {
      return await instance.post("/admin-system/group/meter/list/new", { key });
    } catch (error: any) {
      throw error.response;
    }
  },

  deleteGroupTreeItem: async (key: string) => {
    try {
      return await instance.post("/admin-system/group/meter/delete", { key });
    } catch (error: any) {
      throw error.response;
    }
  },

  getDetailGroupTreeItem: async (key: string) => {
    try {
      return await instance.post("/admin-system/group/meter/find/by/key", { key });
    } catch (error: any) {
      throw error.response;
    }
  },

  editGroupTreeItem: async (itemData: IGroupControlItemData) => {
    try {
      return await instance.post("/admin-system/group/meter/edit", itemData);
    } catch (error: any) {
      throw error.response;
    }
  },

  getGroupTreeItemMaterIndicatorsList: async (params: IGetGroupTreeItemMaterIndicatorsListProps) => {
    try {
      return await instance.post(
        `/admin-system/group/meter/united/meter/all/for/connection?page=${params.page - 1}&size=10`,
        params.filterData
      );
    } catch (error: any) {
      throw error.response;
    }
  },

  saveGroupItemMeterIndicators: async (params: ISaveGroupItemMeterIndicatorsProps) => {
    try {
      return await instance.post(`/admin-system/group/meter/united/meter/save/with/children`, params);
    } catch (error: any) {
      throw error.response;
    }
  },
};
