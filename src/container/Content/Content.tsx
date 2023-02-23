import React, { FC, memo, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

import { useTypedSelector } from "../../utils/hooks/reduxHooks";

// routes config
import { adminRoutes } from "../../routes/routes/adminRoutes";

const Content: FC = memo(() => {
  const { role, privileges } = useTypedSelector((state) => state.auth);
  const priv = JSON.parse(privileges || "[]");

  useEffect(() => {
    document.title = role === "ROLE_GLOBAL" ? "Sanau SaaS Admin" : "Sanau SaaS Operator";
  }, [role]);

  return (
    <div className="c-main">
      <CContainer fluid>
        <Switch>
          {(role === "ROLE_GLOBAL"
            ? adminRoutes
            : adminRoutes?.filter((item) => item.id === "" || priv.filter((p: any) => p.name === item.id).length > 0)
          ).map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={() => (
                    <CFade>
                      <route.component />
                    </CFade>
                  )}
                />
              )
            );
          })}
          <Route path="/admin/*" render={() => <Redirect to="/admin/404" />} />
          <Route path="/admin" exact render={() => <Redirect to="/admin/main" />} />
        </Switch>
      </CContainer>
    </div>
  );
});

export { Content };
