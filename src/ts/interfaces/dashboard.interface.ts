export interface IUserDashboardInfo {
  active: number;
  blocked: number;
  deactivated: number;
  nonActive: number;
  role: string;
  total: number;
}

export interface IDashboarMeter {
  active: number;
  commonType: string;
  deleted: number;
  inactive: number;
  total: number;
}
export interface IMetersDashboardInfo {
  total: number;
  totalCount: IDashboarMeter[];
}

export interface IMeterServicesItemProps {
  id: string;
  name: string;
  nameRu: string;
  nameEn: string;
  active: boolean;
}
