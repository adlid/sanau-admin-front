import { instance } from "./axios.instance";
import { UserLogsType, DeviceLogsType, ErrorLogsType } from "../ts/types/logs.types"


export const logsAPI = {

  getUsersLogs: async (userLogsBody: UserLogsType) => {
    const { sortBy, page, ...items } = userLogsBody
    try {
      return await instance.post(`/admin-system/logs/user/search?sortBy=${sortBy}&page=${page - 1}`, items);
    } catch (error: any) {
      throw error.response;
    }
  },
  getDevicesLogs: async (deviceLogsBody: DeviceLogsType) => {
    const { sortBy, page, ...items } = deviceLogsBody
    try {
      return await instance.post(`/admin-system/logs/system/search?sortBy=${sortBy}&page=${page - 1}`, items);
    } catch (error: any) {
      throw error.response;
    }
  },
  getErrorsLogs: async (errorLogsBody: ErrorLogsType) => {
    const { sortBy, page, ...items } = errorLogsBody
    try {
      return await instance.post(`/admin-system/logs/error/search?sortBy=${sortBy}&page=${page - 1}`, items);
    } catch (error: any) {
      throw error.response;
    }
  },

}