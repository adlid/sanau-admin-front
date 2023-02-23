import * as queryString from "querystring";
import React, { FC, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { GroupTreeChange } from "../../../../../../components/GroupTree/GroupChangeTree";
import { powerConcentratorGroupControlThunk } from "../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";

type PropsType = {
  state: any;
  setState: any;
  tabValue: string;
};

export const Taksonomy: FC<PropsType> = (props) => {
  const { state, setState, tabValue } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const { meterId, meterName }: any = queryString.parse(history.location.search.substring(1));

  const getGroupControlData = async () => {
    setDataLoading(true);
    await dispatch(powerConcentratorGroupControlThunk(meterId));
    setDataLoading(false);
  };

  useEffect(() => {
    tabValue === "taxonomy" && getGroupControlData();
  }, [tabValue]);

  return (
    <div className="edit-power-lorawan-concentrator-description">
      {dataLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <div style={{ marginBottom: "100px" }}>
          <GroupTreeChange orgData={state} setOrgData={setState} nodeTitle={meterName} searchEnabled />
        </div>
      )}
    </div>
  );
};
