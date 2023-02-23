import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route, MemoryRouter, useLocation, useHistory } from "react-router";
import { breadcrumbNameMap, breadcrumbSearchMap } from "../../ts/types/breadCrumbs";
import { useTypedSelector } from "../../utils/hooks/reduxHooks";

export const RouterBreadcrumbs = () => {
  // hooks
  const history = useHistory();
  const location = useLocation();

  const powerCurrentReadMeterName = useTypedSelector((state) => state.powerIndication.currentReadMeterName);
  const waterCurrentReadMeterName = useTypedSelector((state) => state.waterIndication.currentReadMeterName);
  const gasCurrentReadMeterName = useTypedSelector((state) => state.gasIndication.currentReadMeterName);

  return (
    <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
      <div className="breadCrumbs__root">
        <Route>
          {() => {
            const pathnames = location.pathname.split("/").filter((x) => x);

            const readMetersRoutes: any = {
              "/admin/reading/views": powerCurrentReadMeterName,
              "/admin/reading/power-meter/lora/views": powerCurrentReadMeterName,
              "/admin/reading/power-meter/hourly/views": powerCurrentReadMeterName,
              "/admin/reading/views/consider": powerCurrentReadMeterName,
              "/admin/reading/power-meter/gprs/consider": powerCurrentReadMeterName,
              "/admin/reading/power-meter/otan/consider": powerCurrentReadMeterName,
              "/admin/reading/power-meter/bluetooth/views": powerCurrentReadMeterName,
              "/admin/reading/water/views": waterCurrentReadMeterName,
              "/admin/reading/gas/views": gasCurrentReadMeterName,
            };

            return (
              <Breadcrumbs aria-label="breadcrumb">
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  if (breadcrumbNameMap[to] && to !== "/admin") {
                    return last ? (
                      <Typography className="breadCrumbs__current" key={to}>
                        {readMetersRoutes[to] || breadcrumbNameMap[to]}
                      </Typography>
                    ) : (
                      <Typography
                        className="breadCrumbs__link"
                        key={to}
                        onClick={() => history.push(`${to + (breadcrumbSearchMap[to] || "")}`)}
                      >
                        {breadcrumbNameMap[to]}
                      </Typography>
                    );
                  }
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      </div>
    </MemoryRouter>
  );
};
