export const breadcrumbNameMap: { [key: string]: string } = {
  //main page
  "/admin/main": "Главная страница",

  // meter indication
  "/admin/reading": "Считывание показаний",
  // power
  "/admin/reading/views": " ",
  "/admin/reading/power-meter/hourly/views": " ",
  "/admin/reading/views/consider": " ",
  "/admin/reading/power-meter/gprs/consider": " ",
  "/admin/reading/power-meter/otan/consider": " ",
  "/admin/reading/power-meter/bluetooth/views": " ",
  "/admin/reading/power-meter/lora/views": " ",
  // water
  "/admin/reading/water/views": " ",
  // gas
  "/admin/reading/gas/views": " ",

  // group control
  "/admin/system/groups-control": "Управление группами",
  "/admin/system/groups-control/edit-group/power": "Редактировать: электричество",
  "/admin/system/groups-control/edit-group/water": "Редактировать: вода",
  "/admin/system/groups-control/edit-group/gas": "Редактировать: газ",
  "/admin/system/groups-control/create-group/power": "Новая группа: электричество",
  "/admin/system/groups-control/create-group/water": "Новая группа: вода",
  "/admin/system/groups-control/create-group/gas": "Новая группа: газ",

  // access templates
  "/admin/users/access-templates": "Шаблоны прав доступа",
  "/admin/users/access-templates/create": "Создать",

  // operators
  "/admin/users/operators": "Операторы",
  "/admin/users/operators/create": "Создать",

  // clients
  "/admin/users/clients": "Клиенты",
  "/admin/users/clients/create/YL": "Новый клиент",
  "/admin/users/clients/create/FL": "Новый клиент",

  // news
  "/admin/news": "Управление новостями",
  "/admin/news/edit": "Редактировать новость",
  "/admin/news/create": "Добавить новость",

  //power concentrator
  "/admin/concentrators/power-meter": "Управление ПУ электроэнергии",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-transmission-device": "Добавить УСПД",
  "/admin/concentrators/power-meter/edit": "Редактировать УСПД",
  "/admin/concentrators/power-meter/edit-meter/connection-by-transmission-device": "Редактировать УСПД",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-bluetooth": "Добавить Bluetooth",
  "/admin/concentrators/power-meter/concentrator-info/lorawan-udp-edit": "Редактировать Lorawan",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs": "Добавить TCP/IP (GRPS)",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-otan": "Добавить TCP/IP (Отан)",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-dinRail": "Добавить TCP/IP (Din-Rail)",
  // "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-rs485/edit": "Редактировать TCP/IP (Din-Rail)",
  // "/admin/concentrators/power-meter/add-concentrator/connection-by-otan/edit": "Редактировать TCP/IP (Отан)",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs-2": "Добавить TCP/IP (GPRS)",
  "/admin/concentrators/power-meter/add-concentrator/connection-by-gprs/edit": "Редактировать TCP/IP (GPRS)",
  "/admin/concentrators/power-meter/bluetooth/createGroup": "Добавить группу Bluetooth",
  "/admin/concentrators/power-meter/tcp-ip/createGroup": "Добавить группу TCP/IP",
  "/admin/concentrators/power-meter/bluetooth/editGroup": "Редактировать группу Bluetooth",
  "/admin/concentrators/power-meter/tcp-ip/editGroup": "Редактировать группу TCP/IP",

  // water concentrator
  "/admin/concentrators/water-meter/concentrator-info": "Управление ПУ воды",
  "/admin/concentrators/water-meter/concentrator-info/edit": "Изменить прибор учета",

  // gas concentrator
  "/admin/concentrators/gas-meter/concentrator-info": "Управление ПУ газа",
  "/admin/concentrators/gas-meter/concentrator-info/create-udp": "Добавить ПУ газа",
  "/admin/concentrators/gas-meter/concentrator-info/edit-udp": "Редактировать ПУ газа",

  // monitoring
  "/admin/monitoring-main": "Мониторинг показаний",
  "/admin/monitoring-main/monitoring-table": "Показать данные",

  // errors
  "/admin/logs/error": "Журнал ошибок",

  // logs
  "/admin/logs/users": "Логи по пользователям",
  "/admin/logs/devices": "Логи по системе и устройствам",

  // reports
  "/admin/reports": "Отчеты",

  // uspd logs
  "/admin/concentrators/power-meter/concentrator-info/logs": "Логи УСПД",
};

export const breadcrumbSearchMap: { [key: string]: string } = {
  // meter indication
  "/admin/reading": "/meter-indication-reading?powerMetersPage=1&tabValue=power",
  "/admin/reading/water/views": "?page=1",

  // operators
  "/admin/users/operators": "?page=1",

  // clients
  "/admin/users/clients": "?page=1",

  // access templates
  "/admin/users/access-templates": "?page=1",

  // group control
  "/admin/system/groups-control": "?tabValue=power&state=show",

  //concentrator
  "/admin/concentrators/power-meter": "/concentrator-info?tabValue=info-by-transmision-device",

  //water concentrator
  "/admin/concentrators/water-meter/concentrator-info": "?tabValue=by-lorawan-udp",

  // gas concentrator
  "/admin/concentrators/gas-meter/concentrator-info": "?tabValue=by-udp",

  // news
  "/admin/news": "?page=1",

  // monitoring
  "/admin/monitoring-main": "?powerMetersPage=1&tabValue=power",

  // errors
  "/admin/logs/error": "?errorPage=1",

  // logs
  "/admin/logs/users": "?userLogsPage=1",
  "/admin/logs/devices": "?devicesLogsPage=1",
};
