import React, { FC } from "react";
import { Spinner } from "react-bootstrap";
// components
import { Search } from "../../../../components/uiKit/Search";
import { useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { GroupTree } from "../../../../components/GroupTree/GroupTree";

interface IProps {
  fetching: boolean;
  searchValue: string;
  setSearchValue: any;
  onTreeItemClick: any;
}

export const Left: FC<IProps> = (props) => {
  const { fetching, searchValue, setSearchValue, onTreeItemClick } = props;
  //   data from redux
  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  return (
    <div className="uspdLogs_left">
      <Search
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        placeholder="Наименование, серийный номер"
      />

      <p className="headingText" style={{ margin: "16px 0px 28px" }}>
        Всего УСПД: 243, Всего ПУ: 24 879
      </p>
      {fetching ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <GroupTree orgData={orgData} onItemClick={onTreeItemClick} onlyRead />
      )}
    </div>
  );
};
