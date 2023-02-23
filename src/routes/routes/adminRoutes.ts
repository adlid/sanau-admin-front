import { MainPage } from "../../pages/MainPage";

//  POWER CONCENTRATORS
import { USPDLogs } from "../../pages/USPDLogs/USPDLogs";
import { InfoPowerMeterConcentratorPages } from "../../pages/PowerMeterConcentrator/InfoPowerMeterConcentratorPages";
import { ConnectionByTransmissionDevicePage } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionByTransmissionDevicePage";
import { EditTransmissionDeviceConnection } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditTransmissionDeviceConnection/";
import { EditTransmissionConcentratorMeter } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditTransmissionConcentratorMeter";
import { AddingTheNewTransmissionMeterPage } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/AddingTheNewTransmissionMeter";

// POWER GPRS
import { ConnectionGPRSPage } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionGPRS";
import { EditConnectionGPRS } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditConnectionGPRS";
import { ConnectionGPRSstep2 } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionGPRSstep2";

// POWER OTAN
import { ConnectionOtanPage } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionOtan";

// POWER DIN-RAIL

// POWER LORAWAN
import { EditPowerLorawanConcentrator } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditPowerLorawanConcentrator";

//  BLUETOOTH CONNECTION
import { ConnectionByBluetooth } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionByBluetooth/";
import { EditBluetoothConcentrator } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditBluetoothConnection";
import { InfoByBluetoothAddGroup } from "../../pages/PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByBluetooth/InfoByBluetoothAddGroup";

//  WATER CONCENTRATORS
import { EditWaterConcentrator } from "../../pages/WaterMeterConcentrator/EditWaterConcentrator";
import { InfoWaterMeterConcentratorPages } from "../../pages/WaterMeterConcentrator/InfoWaterMeterConcentratorPages";

// GAS CONCENTRATORS
import { InfoGasMeterConcentratorPages } from "../../pages/GasMeterConcentrator/InfoGasMeterConcentratorPages";
import { EditGasUDPConcentrator } from "../../pages/GasMeterConcentrator/EditGasConcentrator/EditGasUDPConcentrator";

//  METER INDICATION PAGES
import {
  PowerReadDataViewsPage,
  WaterReadDataViewsPage,
  PowerReadBluetoothDataViewsPage,
  PowerReadLoraDataViewsPage,
  PowerReadDataViewsHourly,
  PowerReadDataViewsConsider,
  PowerReadGPRSConsider,
} from "../../pages/MeterReadingPages/ReadDataViewsPage";
import { MeterIndicationReadingPage } from "../../pages/MeterReadingPages/MeterIndicationReadingPage";
import { GasReadDataViewsPage } from "../../pages/MeterReadingPages/ReadDataViewsPage/GasReadDataViewsPage";
import { PowerReadOtan } from "../../pages/MeterReadingPages/ReadDataViewsPage/PowerReadOtan";

//  USERS
// operators
import { OperatorsList } from "../../pages/Users/Operators/OperatorsListPage/OperatorsList";
import { CreateOperatorPage } from "../../pages/Users/Operators/CreateOperator/CreateOperatorPage";
// clients
import { CreateYLClient } from "../../pages/Users/Clients/CreateClient/CreateYLClient";
import { CreateFLClient } from "../../pages/Users/Clients/CreateClient/CreateFLClient";
import { ClientsList } from "../../pages/Users/Clients/ClientsListPage/ClientsList";

// ACCESS TEMPLATES
import { AccessTemplates } from "../../pages/AccessTemplates/AccessTemplates";
import { CreateAccessTemplate } from "../../pages/AccessTemplates/CreateAccessTemplate/CreateAccessTemplate";

// GROUP CONTROL
import { GroupsControl } from "../../pages/GroupsControl/GroupsControlPage";
import { PowerCreateGroup } from "../../pages/GroupsControl/components/Power/PowerCreateGroup/PowerCreateGroup";
import { WaterCreateGroup } from "../../pages/GroupsControl/components/Water/WaterCreateGroup/WaterCreateGroup";
import { GasCreateGroup } from "../../pages/GroupsControl/components/Gas/GasCreateGroup/GasCreateGroup";

//  NEWS
import { NewsListPage } from "../../pages/NewsPages/NewsListPage/NewsListPage";
import { EditNCreateNewsPage } from "../../pages/NewsPages/EditNCreateNewsPage/EditNCreateNewsPage";

// LOGS
import { UsersLogs } from "../../pages/Logs/UsersLogs";
import { DevicesLogs } from "../../pages/Logs/DevicesLogs";
import { ErrorLogs } from "../../pages/Logs/ErrorLogs";

//MONITORING
import { MonitoringTable } from "../../pages/Monitoring/MonitoringTable/";
import { MonitoringMain } from "../../pages/Monitoring/MonitoringMain";

// REPORTS PAGES
import { ReportsPages } from "../../pages/ReportsPages/ReportsPages";

//  404 NOT FOUND PAGES
import { Page404 } from "../../pages/404";

// OPERATORS PAGE
import { OperatorProfilePage } from "../../pages/OperatorProfilePage/OperatorProfilePage";
import { EditConnectionOtan } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditConnectionOtan";
import { CreateGasMeter } from "../../pages/GasMeterConcentrator/CreateGasMeter/CreateGasMeter";
import { PowerReadDinRail } from "../../pages/MeterReadingPages/ReadDataViewsPage/PowerReadDinRail";
import { EditConnectionDinRail } from "../../pages/PowerMeterConcentrator/EditPowerMeterConcentratorPages/EditConnectionDinRail/EditConnectionDinRail";
import { ConnectionDinRail } from "../../pages/PowerMeterConcentrator/ConnectPowerMeterConcentratorPages/ConnectionDinRail";
import { InfoPowerMetersAddToFolder } from "../../pages/PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByBluetooth/InfoPowerMetersAddToFolder";

export const adminRoutes = [
  // MAIN PAGE
  { id: "", path: "/admin/main", exact: true, component: MainPage },

  // Operator profile
  { id: "", path: "/admin/profile", exact: true, component: OperatorProfilePage },

  //  POWER CONCENTRATOR PAGES //
  //  CONNECTION-BY-TRANSMISSION-DEVICE
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/concentrator-info",
    exact: true,
    component: InfoPowerMeterConcentratorPages,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-transmission-device",
    exact: true,
    component: ConnectionByTransmissionDevicePage,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs",
    exact: true,
    component: ConnectionGPRSPage,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-otan",
    exact: true,
    component: ConnectionOtanPage,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-dinRail",
    exact: true,
    component: ConnectionDinRail,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-step2",
    exact: true,
    component: ConnectionGPRSstep2,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs/edit",
    exact: true,
    component: EditConnectionGPRS,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-otan/edit/:id",
    exact: true,
    component: EditConnectionOtan,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-rs485/edit/:id",
    exact: true,
    component: EditConnectionDinRail,
  },

  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-meter/connection-by-transmission-device",
    exact: true,
    component: AddingTheNewTransmissionMeterPage,
  },

  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/edit/connection-by-transmission-device",
    exact: true,
    component: EditTransmissionDeviceConnection,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/edit-meter/connection-by-transmission-device",
    exact: true,
    component: EditTransmissionConcentratorMeter,
  },
  //connection-by-bluetooth
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/add-concentrator/connection-by-bluetooth",
    exact: true,
    component: ConnectionByBluetooth,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/edit/connection-by-bluetooth",
    exact: true,
    component: EditBluetoothConcentrator,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/bluetooth/createGroup",
    exact: true,
    component: InfoByBluetoothAddGroup,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/createGroup",
    exact: true,
    component: InfoByBluetoothAddGroup,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/bluetooth/editGroup",
    exact: true,
    component: InfoByBluetoothAddGroup,
  },
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/tcp-ip/editGroup",
    exact: true,
    component: InfoByBluetoothAddGroup,
  },
  {
    id: "Управление ПУ электроэнергий/Добавление счетчиков в группу",
    path: "/admin/concentrators/power-meter/add-meters",
    exact: true,
    component: InfoPowerMetersAddToFolder,
  },
  //connection-by-lorawan-udp
  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/concentrator-info/lorawan-udp-edit",
    exact: true,
    component: EditPowerLorawanConcentrator,
  },

  {
    id: "Управление ПУ электроэнергий",
    path: "/admin/concentrators/power-meter/concentrator-info/logs",
    exact: true,
    component: USPDLogs,
  },

  //  WATER CONCENTRATOR PAGES  //
  // CONNECTION BY LORAWAN AND UDP
  {
    id: "Управление ПУ воды",
    path: "/admin/concentrators/water-meter/concentrator-info",
    exact: true,
    component: InfoWaterMeterConcentratorPages,
  },
  // EDIT CONCENTRATOR BY LORAWAN AND UDP
  {
    id: "Управление ПУ воды",
    path: "/admin/concentrators/water-meter/concentrator-info/edit",
    exact: true,
    component: EditWaterConcentrator,
  },

  //  GAS CONCENTRATOR PAGES  //
  // CONNECTION BY UDP
  {
    id: "Управление ПУ газа",
    path: "/admin/concentrators/gas-meter/concentrator-info",
    exact: true,
    component: InfoGasMeterConcentratorPages,
  },
  // EDIT METER BY UDP
  {
    id: "Управление ПУ газа",
    path: "/admin/concentrators/gas-meter/concentrator-info/create-udp",
    exact: true,
    component: CreateGasMeter,
  },
  // EDIT METER BY UDP
  {
    id: "Управление ПУ газа",
    path: "/admin/concentrators/gas-meter/concentrator-info/edit-udp",
    exact: true,
    component: EditGasUDPConcentrator,
  },

  //  METER INDICATION READING PAGES  //
  {
    id: "Считывание показаний",
    path: "/admin/reading/meter-indication-reading",
    exact: true,
    component: MeterIndicationReadingPage,
  },
  // power
  { id: "Считывание показаний", path: "/admin/reading/views", exact: true, component: PowerReadDataViewsPage },
  {
    id: "Считывание показаний",
    path: "/admin/reading/views/consider",
    exact: true,
    component: PowerReadDataViewsConsider,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/gprs/consider",
    exact: true,
    component: PowerReadGPRSConsider,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/otan/consider",
    exact: true,
    component: PowerReadOtan,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/dinrail/consider",
    exact: true,
    component: PowerReadDinRail,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/bluetooth/views",
    exact: true,
    component: PowerReadBluetoothDataViewsPage,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/lora/views",
    exact: true,
    component: PowerReadLoraDataViewsPage,
  },
  {
    id: "Считывание показаний",
    path: "/admin/reading/power-meter/hourly/views",
    exact: true,
    component: PowerReadDataViewsHourly,
  },
  // water
  { id: "Считывание показаний", path: "/admin/reading/water/views", exact: true, component: WaterReadDataViewsPage },
  // gas
  { id: "Считывание показаний", path: "/admin/reading/gas/views", exact: true, component: GasReadDataViewsPage },

  // REPORTS PAGES //
  {
    id: "Отчеты",
    path: "/admin/reports",
    exact: true,
    component: ReportsPages,
  },

  //  USERS PAGES //
  // operators
  { id: "Управление пользователями", path: "/admin/users/operators", exact: true, component: OperatorsList },
  {
    id: "Управление пользователями",
    path: "/admin/users/operators/create",
    exact: true,
    component: CreateOperatorPage,
  },
  { id: "Управление пользователями", path: "/admin/users/operators/edit", exact: true, component: CreateOperatorPage },
  // clients
  { id: "Управление пользователями", path: "/admin/users/clients", exact: true, component: ClientsList },
  {
    id: "Управление пользователями",
    path: "/admin/users/clients/create/YL",
    exact: true,
    component: CreateYLClient,
  },
  { id: "Управление пользователями", path: "/admin/users/clients/edit/YL", exact: true, component: CreateYLClient },
  {
    id: "Управление пользователями",
    path: "/admin/users/clients/create/FL",
    exact: true,
    component: CreateFLClient,
  },
  { id: "Управление пользователями", path: "/admin/users/clients/edit/FL", exact: true, component: CreateFLClient },

  //  ACCESS RIGHTS TEMPLATES PAGES //
  { id: "Управление пользователями", path: "/admin/users/access-templates", exact: true, component: AccessTemplates },
  {
    id: "Управление пользователями",
    path: "/admin/users/access-templates/create",
    exact: true,
    component: CreateAccessTemplate,
  },
  {
    id: "Управление пользователями",
    path: "/admin/users/access-templates/edit",
    exact: true,
    component: CreateAccessTemplate,
  },

  //  GROUPS CONTROL  //
  { id: "Управление группами", path: "/admin/system/groups-control", exact: true, component: GroupsControl },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/create-group/power",
    exact: true,
    component: PowerCreateGroup,
  },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/create-group/water",
    exact: true,
    component: WaterCreateGroup,
  },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/create-group/gas",
    exact: true,
    component: GasCreateGroup,
  },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/edit-group/power",
    exact: true,
    component: PowerCreateGroup,
  },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/edit-group/water",
    exact: true,
    component: WaterCreateGroup,
  },
  {
    id: "Управление группами",
    path: "/admin/system/groups-control/edit-group/gas",
    exact: true,
    component: GasCreateGroup,
  },

  // NEWS //
  {
    id: "Управление новостями",
    path: "/admin/news",
    exact: true,
    component: NewsListPage,
  },
  {
    id: "Управление новостями",
    path: "/admin/news/edit",
    exact: true,
    component: EditNCreateNewsPage,
  },
  {
    id: "Управление новостями",
    path: "/admin/news/create",
    exact: true,
    component: EditNCreateNewsPage,
  },

  // LOGS //
  {
    id: "",
    path: "/admin/logs/users",
    exact: true,
    component: UsersLogs,
  },
  {
    id: "",
    path: "/admin/logs/devices",
    exact: true,
    component: DevicesLogs,
  },

  {
    id: "Журнал ошибок",
    path: "/admin/logs/error",
    exact: true,
    component: ErrorLogs,
  },

  // MONITORING
  {
    id: "Мониторинг показаний",
    path: "/admin/monitoring-main/monitoring-table",
    exact: true,
    component: MonitoringTable,
  },
  {
    id: "Мониторинг показаний",
    path: "/admin/monitoring-main",
    exact: true,
    component: MonitoringMain,
  },

  //  404 NOT FOUND PAGE //
  { id: "", path: "/admin/404", exact: true, component: Page404 },
];
