import Item1 from "../../assets/sidebarIcons/item1.svg";
import Item2 from "../../assets/sidebarIcons/item2.svg";
import Item3 from "../../assets/sidebarIcons/item3.svg";
import Item4 from "../../assets/sidebarIcons/item4.svg";
import Item5 from "../../assets/sidebarIcons/item5.svg";
import Item6 from "../../assets/sidebarIcons/item6.svg";
import Item7 from "../../assets/sidebarIcons/item7.svg";
import Item8 from "../../assets/sidebarIcons/item8.svg";
import Item9 from "../../assets/sidebarIcons/item9.svg";
import Item10 from "../../assets/sidebarIcons/item10.svg";
import Item11 from "../../assets/sidebarIcons/item11.svg";


export const navigation = [
  {
    _tag: "SidebarNavItem",
    id: "",
    name: "Главная панель",
    to: "/admin/main",
    customIcon: Item1,
  },
  {
    _tag: "SidebarNavItem",
    id: "Считывание показаний",
    name: "Считывание показаний",
    to: "/admin/reading/meter-indication-reading?powerMetersPage=1&tabValue=power",
    customIcon: Item2,
  },
  {
    _tag: "SidebarNavItem",
    id: "Мониторинг показаний",
    name: "Мониторинг показаний",
    to: "/admin/monitoring-main?powerMetersPage=1&tabValue=power",
    customIcon: Item3,
  },
  {
    _tag: "SidebarNavItem",
    id: "Отчеты",
    name: "Отчеты",
    to: "/admin/reports",
    customIcon: Item4,
  },
  {
    _tag: "SidebarNavDropdown",
    id: "Управление пользователями",
    name: "Пользователи",
    customIcon: Item5,
    children: [
      {
        id: "Управление пользователями",
        name: "Операторы",
        to: "/admin/users/operators?page=1",
      },
      {
        id: "Управление пользователями",
        name: "Клиенты",
        to: "/admin/users/clients?page=1",
      },
    ],
  },
  {
    _tag: "SidebarNavItem",
    id: "Управление пользователями",
    name: "Шаблоны прав доступа",
    to: "/admin/users/access-templates?page=1",
    customIcon: Item6,
  },
  {
    _tag: "SidebarNavItem",
    id: "Управление новостями",
    name: "Управление новостями",
    to: "/admin/news?page=1",
    customIcon: Item7,
  },
  {
    _tag: "SidebarNavDropdown",
    id: "",
    name: "Конфигурация системы",
    customIcon: Item8,
    children: [
      {
        id: "Управление группами",
        name: "Управление группами",
        to: "/admin/system/groups-control?tabValue=power&state=show",
      },
      {
        id: "Управление ПУ электроэнергий",
        name: "Управление ПУ электроэ...",
        to: "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device",
      },
      {
        id: "Управление ПУ воды",
        name: "Управление ПУ воды",
        to: "/admin/concentrators/water-meter/concentrator-info?tabValue=by-lorawan-udp",
      },
      {
        id: "Управление ПУ газа",
        name: "Управление ПУ газа",
        to: "/admin/concentrators/gas-meter/concentrator-info?tabValue=by-udp",
      },
    ],
  },
  {
    _tag: "SidebarNavItem",
    id: "Техническая поддержка",
    name: "Техническая поддержка",
    to: "https://app.cleversite.ru/",
    link: true,
    customIcon: Item9,
  },

  {
    _tag: "SidebarNavDropdown",
    id: "",
    name: "Логи",
    customIcon: Item10,
    children: [
      {
        id: "",
        name: "Пользователи",
        to: "/admin/logs/users",
      },
      {
        id: "",
        name: "Система и устройства",
        to: "/admin/logs/devices",
      },
    ],
  },

  {
    _tag: "SidebarNavItem",
    id: "Журнал ошибок",
    name: "Журнал ошибок",
    to: "/admin/logs/error",
    customIcon: Item11,
  },
];
