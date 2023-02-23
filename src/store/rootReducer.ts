import { combineReducers } from "@reduxjs/toolkit";

import { redirectAndNotificationReducers } from "./slicesAndThunks/redirectAndNotification/redirectAndNotification.slice";
import { authReducers } from "./slicesAndThunks/auth/auth.slice";

//power concentrator
import { powerMeterTransmissionDeviceReducer } from "./slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { powerMeterBluetootConcentratorhReducer } from "./slicesAndThunks/powerConcentrator/bluetooth/bluetooth.slice";
import { powerMeterLorawanUdpDeviceReducer } from "./slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { GPRSstateSliceReducer } from "./slicesAndThunks/powerConcentrator/gprs/gprs.slice";
import { OtanStateSliceReducer } from "./slicesAndThunks/powerConcentrator/otan/otan.slice";
import { DinRailStateSliceReducer } from "./slicesAndThunks/powerConcentrator/dinRail/dinRail.slice";

//water concentrator
import { waterMeterLorawanUdpDeviceReducer } from "./slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";

//gas concentrator
import { gasMeterUdpDeviceReducer } from "./slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";

//indication
import { powerIndicationReducer } from "./slicesAndThunks/powerIndication/powerIndication.slices";
import { waterIndicationReducer } from "./slicesAndThunks/waterIndication/waterIndication.slices";
import { gasIndicationReducer } from "./slicesAndThunks/gasIndication/gasIndication.slices";

//users
import { operatorsReducer } from "./slicesAndThunks/users/operators/operators.slices";
import { clientsReducer } from "./slicesAndThunks/users/clients/clients.slices";

//group control
import { groupControlReducer } from "./slicesAndThunks/groupControl/groupControl.slices";
import { newsReducer } from "./slicesAndThunks/news/news.slices";
import { dashboardReducer } from "./slicesAndThunks/dashboard/dashboard.slices";

//logs
import { logsReducers } from "./slicesAndThunks/logs/logs.slice";

// reports
import { reportsReducer } from "./slicesAndThunks/reports/reports.slices";

//monitoring
import { monitoringReducer } from "./slicesAndThunks/monitoring/monitoring.slice";

export const rootReducer = combineReducers({
  redirectNotistack: redirectAndNotificationReducers,
  auth: authReducers,

  // power concentrator
  powerMeterTransmissionDeviceConcentrator: powerMeterTransmissionDeviceReducer,
  powerMeterBluetootConcentrator: powerMeterBluetootConcentratorhReducer,
  powerMeterLorawanUdpConcentrator: powerMeterLorawanUdpDeviceReducer,
  powerMeterGPRSMeter: GPRSstateSliceReducer,
  powerMeterOtanMeter: OtanStateSliceReducer,
  powerMeterDinRailMeter: DinRailStateSliceReducer,

  // water concentrator
  waterMeterLorawanUdpDeviceConcentrator: waterMeterLorawanUdpDeviceReducer,

  // gas concentrator
  gasMeterUdpDeviceConcentrator: gasMeterUdpDeviceReducer,

  //indication
  powerIndication: powerIndicationReducer,
  waterIndication: waterIndicationReducer,
  gasIndication: gasIndicationReducer,

  //users
  operators: operatorsReducer,
  clients: clientsReducer,

  //news
  news: newsReducer,

  //group control
  groupsControl: groupControlReducer,

  // main page
  dashboard: dashboardReducer,

  //logs
  logs: logsReducers,

  // reports
  reports: reportsReducer,

  //monitoring
  monitoring: monitoringReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
