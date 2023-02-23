import { DateType } from "./indication.types"


export type UserLogsType = {
    fullName: string,
    from: DateType,
    to: DateType,
    role: Array<string>
    action: Array<string>
    page: number,
    sortBy: string
}



export type DeviceLogsType = {
    serialNumber: string,
    from: DateType,
    to: DateType,
    meterCommonType: Array<string>
    meterSpecificType: Array<string>
    serviceName: Array<string>
    action: Array<string>,
    page: number,
    sortBy: string
}

export type ErrorLogsType = {
    query: string,
    from: DateType,
    to: DateType,
    receivingService: Array<string>
    serviceName: Array<string>
    action: Array<string>,
    page: number,
    sortBy: string
}




export type UserLogItem = {
    action: string
    createdAt: string
    fullName: string
    id: string
    userRole: string
    managedUserFullName: null | string
    meterCommonType: null | string
    meterSerialNumber: null | string
    meterSpecificType: null | string
}


export type UsersLogsResponseType = {
    data: Array<UserLogItem>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
}

export type DeviceLogItem = {
    action: string
    createdAt: string
    id: string
    meterCommonType: string
    meterSerialNumber: string
    meterSpecificType: string
    serviceName: string
}


export type DevicesLogsResponseType = {
    data: Array<DeviceLogItem>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
}


export type ErrorLogsResponseType = {
    data: Array<ErrorLogItem>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
}


type ErrorLogItem = {
    action: string
    createdAt: string
    id: string
    meterCommonType: string
    meterSerialNumber: string
    meterSpecificType: string
    receivingService: string
    serviceName: string
    
}


