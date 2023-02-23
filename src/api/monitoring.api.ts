import { instance } from "./axios.instance"

import { MonitoringToken } from "../ts/types/monitoring.types"



export const monitoringAPI = {
    getMonitoringToken: async (body: MonitoringToken) => {
        try {
            return await instance.post(`/indications-monitoring/generate/token`, body);
        } catch (error: any) {
            throw error.response;
        }
    },
    getMonitoringData: async (token: string) => {
        try {
            return await instance.get(`/indications-monitoring/filter/${token}`);
        } catch (error: any) {
            throw error.response;
        }
    }
}

