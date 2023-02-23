import { DateType } from "../types/indication.types";

export interface IOperatorProfile {
  position: string;
  phoneNumber: string;
  email: string;
  login: string;
  privileges: any[];
}
export interface IPrivileges {
  position?: string;
  name: string;
}

export interface ITemplatesProps {
  id: string;
  name: string;
  createdAt: DateType;
  privileges: IPrivileges[];
}

export interface ICreateTemplateProps {
  name: string;
  privileges: IPrivileges[];
}

export interface IEditTemplateProps extends ICreateTemplateProps {
  id: string;
}

export interface IDetailTemplateProps extends ICreateTemplateProps {
  id: string;
}

export interface IOperatorsFilterProps {
  status: string[];
  privileges: string[];
  createFrom: DateType;
  createTo: DateType;
  query: string;
}

export interface IClientsFilterProps {
  statuses: string[];
  types: string[];
  from: DateType;
  to: DateType;
  query: string | null;
}
export interface IOperatorsListProps {
  options: IOperatorsFilterProps;
  sortBy: string;
  page: number;
}

export interface IGetClientsFilteredListProps {
  options: IClientsFilterProps;
  sortBy: string;
  page: number;
}

export interface IDetailOperatorProps extends ICreateOperatorProps {
  id: string;
}

export interface IDetailClientProps extends ICreateClientProps {
  fullName: string;
  roleName: string;
  createdAt: string;
  status: string;
  id: string;
}

export interface IEditOperatorProps extends ICreateOperatorProps {
  id: string;
}

export interface IEditClientProps extends ICreateClientProps {
  id: string;
}

export interface ICreateOperatorProps {
  firstname: string;
  lastname: string;
  fathersname: string;
  email: string;
  login: string;
  phoneNumber: string;
  position: string;
  privileges?: IPrivileges[];
}

export interface ICreateClientProps {
  personalAccountNumber: string;
  firstname: string;
  lastname: string;
  fathersname: string;
  email: string;
  phoneNumber: string;
  position?: string;
  organization?: string;
}

export interface IActivateOperatorProps {
  hash: string;
  login: string;
  password: string;
}

export interface IChangeOperatorRightsProps {
  id: string[];
  privileges: string[];
}

export interface IActivateOperatorProps {
  login: string;
  password: string;
  hash: string;
}

export interface IOperatorsListItem {
  position: string;
  id: string;
  count: number;
  createdAt: DateType;
  login: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  privileges: IPrivileges[];
  status: string;
}

export interface IOperatorsList {
  elementSize: number;
  hasNext: false;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
}

export interface IClientList {
  elementSize: number;
  hasNext: false;
  page: number;
  size: number;
  totalElementsOnPage: number;
  totalPage: number;
  data: Array<IDetailClientProps>;
}

export interface IOperatorsListItemWithSelect extends IOperatorsListItem {
  selected: boolean;
}

export interface IOperatorsListWithoutSelect extends IOperatorsList {
  data: Array<IOperatorsListItem>;
}

export interface IOperatorsListWithSelect extends IOperatorsList {
  data: Array<IOperatorsListItemWithSelect>;
}
