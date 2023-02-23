import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import React, { FC, useEffect, useState } from "react";
import { Search } from "../../../../../components/uiKit/Search";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { GroupTree } from "../../../../../components/GroupTree/GroupTree";
import { AddButton } from "../../../../../components/uiKit/Buttons/AddButton";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { DeleteGroupModal } from "../../../../../components/uiKit/modals/DeleteGroupModal/DeleteGroupModal";
import { resetDetailTreeItem } from "../../../../../store/slicesAndThunks/groupControl/groupControl.slices";
import { getGroupTreeBySearchThunk } from "../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";

interface IGroupsProps {
  dataFetching: boolean;
  setDataFetching: any;
  groupTypes: any;
}

export const PowerGroups: FC<IGroupsProps> = (props) => {
  const { dataFetching, setDataFetching, groupTypes } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { tabValue }: any = queryString.parse(history.location.search.substring(1));

  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  const [searchValue, setSearchValue] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [groupKey, setGroupKey] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onItemChange = (key: string) => history.push(`/admin/system/groups-control/edit-group/power?groupId=${key}`);

  const onDelete = (key: string, name: string) => {
    setGroupName(name);
    setGroupKey(key);
    setOpenDeleteModal(true);
  };

  const onSearchClick = async () => {
    setDataFetching(true);
    await dispatch(getGroupTreeBySearchThunk({ query: searchValue, type: groupTypes[tabValue], field: "title" }));
    setDataFetching(false);
  };

  useEffect(() => {
    return () => {
      dispatch(resetDetailTreeItem());
    };
  }, []);

  return (
    <>
      <DeleteGroupModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        groupId={groupKey}
        groupName={groupName}
      />
      <div className="group-change-list">
        <div className="group-change-list__search-block">
          <Search value={searchValue} onChange={(value) => setSearchValue(value)} onEnterPress={onSearchClick} />
          <MainButton
            isSecondary
            title="Изменить группировку"
            style={{ width: 193, fontSize: 14, height: 40 }}
            onClick={(e) => history.push({ search: `?tabValue=power&state=edit` })}
          />
          <AddButton
            title="Добавить группу"
            style={{ width: 235, height: 40, fontSize: 14 }}
            onClick={() => history.push("/admin/system/groups-control/create-group/power")}
          />
        </div>
        <div className="group-change-list__body">
          {dataFetching ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            <GroupTree orgData={orgData} onItemChangeClick={onItemChange} onItemDeleteClick={onDelete} />
          )}
        </div>
      </div>
    </>
  );
};
