import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
// components
import { DetailPage } from "./components/DetailPage";
import { InfoPage } from "./components/InfoPage";
import { ParamsPage } from "./components/ParamsPage";
import { Counterparty } from "./components/Counterparty";
import { Taksonomy } from "./components/Taksonomy";
// redux
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { detailDinRailInfoThunk } from "../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.thunk";

export const EditConnectionDinRail: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  // data from url
  let { id }: { id: string } = useParams();

  const [tabValue, setTabValue] = useState<string>("info");

  useEffect(() => {
    id && dispatch(detailDinRailInfoThunk(id));
  }, [id]);

  return (
    <div className="connection-gprs">
      <div className="connection-by-bluetooth__tab tabs-type1">
        <h1 className="connection-by-bluetooth__title">Редактировать прибор учета</h1>
        <CTabs activeTab={tabValue as string}>
          <CNav className="connection-by-bluetooth__header" variant="tabs">
            <CNavItem>
              <CNavLink data-tab="info" onClick={() => setTabValue("info")}>
                Информация
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="params" onClick={() => setTabValue("params")}>
                Атрибуты
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="counterparty" onClick={() => setTabValue("counterparty")}>
                Контрагент
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="taxonomy" onClick={() => setTabValue("taxonomy")}>
                Таксономия
              </CNavLink>
            </CNavItem>
          </CNav>

          <div className="connection-by-bluetooth__wrap">
            <CTabContent>
              <CTabPane data-tab="info">
                <InfoPage />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="params">
                <ParamsPage />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="counterparty">
                <Counterparty />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="taxonomy">
                <Taksonomy />
              </CTabPane>
            </CTabContent>
          </div>
        </CTabs>
      </div>
    </div>
  );
};
