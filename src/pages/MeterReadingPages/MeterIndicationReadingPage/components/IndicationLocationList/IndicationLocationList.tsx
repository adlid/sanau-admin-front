import { useHistory } from "react-router";
import * as queryString from "querystring";
import React, { FC, useEffect, useState } from "react";
import { GroupTree } from "../../../../../components/GroupTree/GroupTree";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { getGroupTreeBySearchThunk } from "../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { Spinner } from "react-bootstrap";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { Input, MenuItem, Select } from "@material-ui/core";
import { indicationWaterMetersListByGroupKey } from "../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import { indicationPowerMetersListByGroupKey } from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import { indicationGasMetersListByGroupKey } from "../../../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";
import { groupControlAPI } from "../../../../../api/groupControl.instance";

const groupTypes: any = {
  power: "electric",
  water: "water",
  gas: "gas",
};

const dropDownMenuProps: any = {
  disableScrollLock: false,
  anchorOrigin: { vertical: 10, horizontal: -13 },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null,
  PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: "320px" } },
};

type PropsType = {
  setMeterDataFetching: any;
};

export const IndicationLocationList: FC<PropsType> = (props) => {
  const { setMeterDataFetching } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [fetching, setFetching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [dropDownValue, setDropDownValue] = useState("title");

  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  const { tabValue, powerMetersPage, waterMetersPage, gasMetersPage }: any = queryString.parse(
    history.location.search.substring(1)
  );

  const currentMeterType = powerMetersPage ? "powerMetersPage" : waterMetersPage ? "waterMetersPage" : "gasMetersPage";

  const onTreeItemClick = async (key: string) => {
    history.push({ search: `?${currentMeterType}=1&tabValue=${tabValue}&groupId=${key}` });
    setMeterDataFetching(true);
    tabValue === "power"
      ? await dispatch(indicationPowerMetersListByGroupKey({ page: 1, field: "", key, query: "" }))
      : tabValue === "water"
      ? await dispatch(indicationWaterMetersListByGroupKey({ page: 1, field: "", key, query: "" }))
      : await dispatch(indicationGasMetersListByGroupKey({ page: 1, field: "", key, query: "" }));
    setMeterDataFetching(false);
  };

  const getGroupTree = async () => {
    setFetching(true);
    await dispatch(getGroupTreeBySearchThunk({ query: searchValue, type: groupTypes[tabValue], field: dropDownValue }));
    setFetching(false);
  };

  useEffect(() => {
    getGroupTree();
  }, [tabValue]);

  return (
    <div className="indication-location-list">
      {fetching ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <>
          <div className="indication-location-list__search-block">
            <div className="indication-location-list__search-select-parent">
              <Select
                className="indication-location-list__search-select-parent__search-select"
                value={dropDownValue}
                onChange={(e: any) => setDropDownValue(e.target.value)}
                displayEmpty={true}
                MenuProps={dropDownMenuProps}
              >
                <MenuItem value={"title"}>Наименование</MenuItem>
                <MenuItem value={"personalAccountNumber"}>Лицевой счет</MenuItem>
                <MenuItem value={"fio"}>ФИО контрагента</MenuItem>
              </Select>
            </div>
            <Input
              onChange={(e: any) => setSearchValue(e.target.value)}
              style={{ width: "100%", borderLeft: "unset", borderRight: "unset" }}
              placeholder={"Поиск"}
              value={searchValue}
              onKeyPress={(e) => e.key === "Enter" && getGroupTree()}
            />
            <MainButton
              isSecondary={true}
              title={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.44444 0C10.0036 0 12.8889 2.88528 12.8889 6.44444C12.8889 7.98389 12.3491 9.39726 11.4485 10.5056L15.8047 14.8619C16.0651 15.1223 16.0651 15.5444 15.8047 15.8047C15.5681 16.0414 15.1977 16.0629 14.9367 15.8693L14.8619 15.8047L10.5056 11.4485C9.39726 12.3491 7.98389 12.8889 6.44444 12.8889C2.88528 12.8889 0 10.0036 0 6.44444C0 2.88528 2.88528 0 6.44444 0ZM6.44444 1.33333C3.62166 1.33333 1.33333 3.62166 1.33333 6.44444C1.33333 9.26723 3.62166 11.5556 6.44444 11.5556C9.26723 11.5556 11.5556 9.26723 11.5556 6.44444C11.5556 3.62166 9.26723 1.33333 6.44444 1.33333Z"
                    fill="white"
                  />
                </svg>
              }
              style={{ width: 48, fontSize: 14, height: 40 }}
              onClick={getGroupTree}
            />
          </div>
          <GroupTree orgData={orgData} onItemClick={onTreeItemClick} onlyRead />
        </>
      )}
    </div>
  );
};
