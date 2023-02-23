import * as queryString from "querystring";
import { Spinner } from "react-bootstrap";
import { GroupInfo } from "./components/GroupInfo";
import { useHistory, useLocation } from "react-router";
import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
import { getDetailGroupTreeItemThunk } from "../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { Taksonomy } from "./components/Taksonomy";
import { useSnackbar } from "notistack";
import { Meters } from "./components/Meters/Meters";
import { resetDetailTreeItem } from "../../../../../store/slicesAndThunks/groupControl/groupControl.slices";

interface IPowerCreateGroupProps {}

export const GasCreateGroup: FC<IPowerCreateGroupProps> = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { groupId }: any = queryString.parse(history.location.search.substring(1));
  const { createdItemKey } = useTypedSelector((state) => state.groupsControl);

  const [tabValue, setTabValue] = useState<string>("groupInfo");
  const [dataFetching, setDataFetching] = useState<boolean>(false);

  const getDetailGroupItem = async () => {
    setDataFetching(true);
    await dispatch(getDetailGroupTreeItemThunk(groupId));
    setDataFetching(false);
  };

  useEffect(() => {
    groupId && getDetailGroupItem();

    return () => {
      dispatch(resetDetailTreeItem());
    };
  }, [groupId]);

  useEffect(() => {
    createdItemKey && history.push({ search: `?groupId=${createdItemKey}` });
  }, [createdItemKey]);

  const cantGoToTab = () =>
    !groupId &&
    enqueueSnackbar("Необходимо создать группу", {
      variant: "error",
    });

  return (
    <div className="gas_create_group" style={{ background: "#FFFFFF", position: "relative" }}>
      <div className="gas_create_group__tab tabs-type1">
        <h1 className="gas_create_group__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {pathname.includes("/create") ? "Новая группа" : "Редактировать"}
        </h1>
        <CTabs activeTab={tabValue as string}>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink onClick={() => setTabValue("groupInfo")} data-tab="groupInfo">
                Описание и тип группы
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <div onClick={cantGoToTab}>
                <CNavLink
                  onClick={() => setTabValue("taksonomy")}
                  data-tab="taksonomy"
                  disabled={groupId ? false : true}
                >
                  Таксономия
                </CNavLink>
              </div>
            </CNavItem>
            <CNavItem>
              <div onClick={cantGoToTab}>
                <CNavLink onClick={() => setTabValue("meters")} data-tab="meters" disabled={groupId ? false : true}>
                  Приборы учета
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          {dataFetching ? (
            <div className="loader">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            <>
              <CTabContent>
                <div className="divider" />
                <CTabPane data-tab="groupInfo">
                  <GroupInfo setTabValue={setTabValue} />
                </CTabPane>
              </CTabContent>
              <CTabContent>
                <CTabPane data-tab="taksonomy">
                  <Taksonomy setTabValue={setTabValue} tabValue={tabValue} />
                </CTabPane>
              </CTabContent>
              <CTabContent>
                <CTabPane data-tab="meters">
                  <Meters setTabValue={setTabValue} tabValue={tabValue} />
                </CTabPane>
              </CTabContent>
            </>
          )}
        </CTabs>
      </div>
    </div>
  );
};
