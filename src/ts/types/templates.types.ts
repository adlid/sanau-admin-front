import { IPrivileges } from "../interfaces/users.interface";

// priviliges
export const generalTags: Array<IPrivileges> = [
  { name: "Считывание показаний" },
  { name: "Мониторинг показаний" },
  { name: "Доступ к Sanau Mobile" },
];
export const configurationTags: Array<IPrivileges> = [
  { name: "Управление группами" },
  { name: "Управление ПУ электроэнергий" },
  { name: "Управление ПУ воды" },
  { name: "Управление ПУ газа" },
  { name: "Управления заявками" },
  { name: "Монтаж" },
];
export const admissionTags: Array<IPrivileges> = [
  { name: "Управление новостями" },
  { name: "Управление пользователями" },
  { name: "Техническая поддержка" },
  { name: "Отчеты" },
  { name: "Журнал ошибок" },
];

//  operators
export const operatorsStatusList: any[] = [
  { label: "Все", value: "all" },
  { label: "Активные", value: "active" },
  { label: "Неактивные", value: "non-active" },
  { label: "Заблокированные", value: "blocked" },
];
export const operatorsSortList: any[] = [
  { label: "От А до Я", value: "asc" },
  { label: "От Я до А", value: "desc" },
];

//  clients
export const clientsTypeList: any[] = [
  { label: "Все", value: "ALL" },
  { label: "Юридическое лицо", value: "LEGAL" },
  { label: "Физическое лицо", value: "INDIVIDUAL" },
];
export const clientsStatusList: any[] = [
  { label: "Все", value: "ALL" },
  { label: "Активные", value: "ACTIVE" },
  { label: "Неактивные", value: "NON-ACTIVE" },
  { label: "Заблокированные", value: "BLOCKED" },
];
export const clientsSortList: any[] = [
  { label: "Сначала новые", value: "def" },
  { label: "От А до Я", value: "asc" },
  { label: "От Я до А", value: "desc" },
];
