import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { GroupTreeChange } from "../../../../../components/GroupTree/GroupChangeTree";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { saveEditedGroupTreeThunk } from "../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { Spinner } from "react-bootstrap";
import { changedToSend } from "../../../../../utils/groupControl/groupControl";

interface IPowerGroupChangeProps {
  dataFetching: boolean;
}

export const PowerGroupsChange: FC<IPowerGroupChangeProps> = (props) => {
  const { dataFetching } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  const [dataSaving, setDataSaving] = useState<boolean>(false);
  const [state, setState] = useState<any>(orgData);
  const { tabValue } = queryString.parse(history.location.search.substring(1));

  const onSaveClick = async () => {
    setDataSaving(true);
    await dispatch(saveEditedGroupTreeThunk(changedToSend(state)));
    history.push(`/admin/system/groups-control?tabValue=${tabValue}&state=show`);
    setDataSaving(false);
  };

  return (
    <div className="group-change-list">
      <div
        className="group-change-list__search-block"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="group-change-list__search-block_title">Изменить группировку</h2>
        <div className="group-change-list__search-block" style={{ padding: "0px" }}>
          <MainButton
            isSecondary
            title="Отмена"
            style={{ width: 86, fontSize: 14, height: 40 }}
            onClick={(e) => {
              e.preventDefault();
              history.push({ search: `?tabValue=power&state=show` });
            }}
          />
          <MainButton
            title={dataSaving ? <Spinner animation="border" size="sm" /> : "Сохранить"}
            style={{ width: 126, fontSize: 14, height: 40 }}
            onClick={(e) => {
              e.preventDefault();
              onSaveClick();
            }}
          />
        </div>
      </div>
      <div className="group-change-list__body">
        {dataFetching ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          <GroupTreeChange orgData={state} setOrgData={setState} searchEnabled />
        )}
      </div>
    </div>
  );
};
