import { MonitoringDataResponse } from "../../../ts/types/monitoring.types"



type MonitoringStateType = {
    monitoringData: null | MonitoringDataResponse
}


export const monitoringState: MonitoringStateType = {
    monitoringData: null
}