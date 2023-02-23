import { AppStateType } from "../store"

import { createSelector } from 'reselect'


const getMeters = (state: AppStateType) => {
    return state.powerMeterTransmissionDeviceConcentrator.selectedConcentratorMeters
}

const getMetersType = (state: AppStateType) => {
    return state.powerMeterTransmissionDeviceConcentrator.meterType
}


export const getFilteredMeters = createSelector(getMeters, getMetersType, (meters, meterType) => {
    if(meterType === "all"){
        return meters
    } else if(meterType === "active"){
        return meters.filter(m => m.active)
    } else if(meterType === "deactive"){
        return meters.filter(m => !m.active)
    }  else return []

})