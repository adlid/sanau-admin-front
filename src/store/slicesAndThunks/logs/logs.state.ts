import {UsersLogsResponseType, DevicesLogsResponseType, ErrorLogsResponseType} from "../../../ts/types/logs.types"



type LogsStateType = {
    usersLogs: UsersLogsResponseType | null
    deviceLogs: DevicesLogsResponseType | null
    errorsLogs: null | ErrorLogsResponseType
    loading: boolean
}


export const logsState:LogsStateType = {
    usersLogs: null,
    deviceLogs: null,
    errorsLogs: null,
    loading: false
}