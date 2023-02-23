import { FC, useState } from "react";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
import { DetailPage } from "./components/DetailPage";
import { InfoPage } from "./components/InfoPage";
import { ParamsPage } from "./components/ParamsPage";
import { Counterparty } from "./components/Counterparty";

export const EditConnectionGPRS: FC = () => {
  const [tabValue, setTabValue] = useState<string>("info");

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
              <CNavLink data-tab="detail" onClick={() => setTabValue("detail")}>
                Описание
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="params" onClick={() => setTabValue("params")}>
                Атрибуты и параметры
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
              <CTabPane data-tab="detail">
                <DetailPage />
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
              <CTabPane data-tab="taxonomy"></CTabPane>
            </CTabContent>
          </div>
        </CTabs>
      </div>
    </div>
  );
};
