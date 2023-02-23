import { Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import React, { FC, useEffect, useState } from "react";
// functions
import { changedToSend } from "../../../../../../utils/groupControl/groupControl";
// components
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
import { GroupTreeChange } from "../../../../../../components/GroupTree/GroupChangeTree";
// redux
import {
  otanConcentratorGroupControlThunk,
  saveOtanConcentratorGroupControlThunk,
} from "../../../../../../store/slicesAndThunks/powerConcentrator/otan/otan.thunk";

import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

type PropsType = {};

export const Taksonomy: FC<PropsType> = (props) => {
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  // data from url
  const { id }: any = useParams();
  // data from redux
  const taksonomyTree = useTypedSelector((state) => state.powerMeterOtanMeter.taksonomyTree);

  const getGroupControlData = async () => {
    setDataLoading(true);
    await dispatch(otanConcentratorGroupControlThunk(id));
    setDataLoading(false);
  };

  const submitTaksonomy = (e: any) => {
    dispatch(saveOtanConcentratorGroupControlThunk(changedToSend(treeState)));
  };

  const [treeState, setTreeState] = useState<any>([]);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(taksonomyTree)));
  }, [taksonomyTree]);

  useEffect(() => {
    getGroupControlData();
  }, []);

  return (
    <div className="edit-power-lorawan-concentrator-description">
      {dataLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "100px" }}>
            <GroupTreeChange orgData={treeState} setOrgData={setTreeState} nodeTitle={""} searchEnabled />
          </div>
          <div className="gprs2-info__footer">
            <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} onClick={submitTaksonomy} />
          </div>
        </>
      )}
    </div>
  );
};
