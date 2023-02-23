import { useHistory } from "react-router";
import * as queryString from "querystring";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { WaterGroups } from "./components/Water/WaterGroups/WaterGroups";
import { PowerGroups } from "./components/Power/PowerGroups/PowerGroups";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
import { WaterGroupsChange } from "./components/Water/WaterGroupsChange/WaterGroupsChange";
import { PowerGroupsChange } from "./components/Power/PowerGroupsChange/PowerGroupsChange.";
import { getGroupTreeByTypeThunk } from "../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { GasGroups } from "./components/Gas/GasGroups/GasGroups";
import { GasGroupsChange } from "./components/Gas/GasGroupsChange/GasGroupsChange";

const groupTypes: any = {
  power: "electric",
  water: "water",
  gas: "gas",
};

export const GroupsControl = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [dataFetching, setDataFetching] = useState<boolean>(false);
  const { tabValue, state }: any = queryString.parse(history.location.search.substring(1));

  useEffect(() => {
    history.push({ search: `?tabValue=${tabValue}&state=show` });
  }, [tabValue]);

  const getTreeData = async () => {
    setDataFetching(true);
    await dispatch(getGroupTreeByTypeThunk(groupTypes[tabValue]));
    setDataFetching(false);
  };

  useEffect(() => {
    getTreeData();
  }, [tabValue, state]);

  return (
    <div className="read-data-views-page tabs-type2">
      <CTabs activeTab={tabValue as string}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink onClick={() => history.push({ search: `?tabValue=power&state=show` })} data-tab="power">
              Приборы учета электроэнергии
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={() => history.push({ search: `?tabValue=water&state=show` })} data-tab="water">
              Приборы учета воды
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={() => history.push({ search: `?tabValue=gas&state=show` })} data-tab="gas">
              Приборы учета газа
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="power">
            {state === "show" ? (
              <PowerGroups dataFetching={dataFetching} setDataFetching={setDataFetching} groupTypes={groupTypes} />
            ) : (
              <PowerGroupsChange dataFetching={dataFetching} />
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="water">
            {state === "show" ? (
              <WaterGroups dataFetching={dataFetching} setDataFetching={setDataFetching} groupTypes={groupTypes} />
            ) : (
              <WaterGroupsChange dataFetching={dataFetching} />
            )}
          </CTabPane>
        </CTabContent>
        <CTabContent>
          <CTabPane data-tab="gas">
            {state === "show" ? (
              <GasGroups dataFetching={dataFetching} setDataFetching={setDataFetching} groupTypes={groupTypes} />
            ) : (
              <GasGroupsChange dataFetching={dataFetching} />
            )}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};
