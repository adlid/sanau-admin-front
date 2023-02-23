import { IMetersDashboardInfo, IMeterServicesItemProps, IUserDashboardInfo } from "../../../ts/interfaces/dashboard.interface";

type DashboardStateType = {
  userInfo: IUserDashboardInfo[];
  metersInfo: IMetersDashboardInfo | null;
  metersServices: IMeterServicesItemProps[];
};

export const dashboardState: DashboardStateType = {
  userInfo: [],
  metersInfo: null,
  metersServices: [],
};
