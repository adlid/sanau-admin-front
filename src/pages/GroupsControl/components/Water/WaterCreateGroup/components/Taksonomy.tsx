import { useHistory } from "react-router";
import * as queryString from "querystring";
import React, { useEffect, useState } from "react";
import { GroupTreeChange } from "../../../../../../components/GroupTree/GroupChangeTree";
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import {
  getGroupTreeWithNewItemByKeyThunk,
  saveEditedGroupTreeThunk,
} from "../../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { SaveCancelBtns } from "./SaveCancelBtns";
import { Search } from "../../../../../../components/uiKit/Search";
import { changedToSend } from "../../../../../../utils/groupControl/groupControl";

export const Taksonomy = (props: any) => {
  const { setTabValue, tabValue } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { groupId }: any = queryString.parse(history.location.search.substring(1));
  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  const [state, setState] = useState<any>(JSON.parse(JSON.stringify(orgData)));
  const [dataSaving, setDataSaving] = useState<boolean>(false);

  const [currentGroupId, setCurrentGroupId] = useState<string>("");

  useEffect(() => {
    setState(orgData);
  }, [orgData]);

  const onSaveClick = async () => {
    setDataSaving(true);
    await dispatch(saveEditedGroupTreeThunk(changedToSend(state)));
    setDataSaving(false);
    setTabValue("meters");
  };

  useEffect(() => {
    groupId && setCurrentGroupId(groupId);
  }, [groupId]);

  useEffect(() => {
    tabValue === "taksonomy" && currentGroupId && dispatch(getGroupTreeWithNewItemByKeyThunk(groupId));
  }, [currentGroupId, tabValue]);

  return (
    <>
      <div className="water_create_group__title" style={{ fontWeight: 400, marginBottom: "100px" }}>
        <GroupTreeChange orgData={state} setOrgData={setState} searchEnabled />
      </div>

      <SaveCancelBtns onSaveClick={onSaveClick} dataSaving={dataSaving} />
    </>
  );
};
