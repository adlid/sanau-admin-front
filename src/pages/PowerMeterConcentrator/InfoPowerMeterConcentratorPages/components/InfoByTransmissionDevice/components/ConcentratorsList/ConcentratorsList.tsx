import { FC, useState, useEffect, useCallback } from "react";
import { AddButton } from "../../../../../../../components/uiKit/Buttons/AddButton";
import { useHistory } from "react-router-dom";

import { ConcentratorListItem } from "../ConcentratorListItem";
import { ConcentratorItemType } from "../../../../../../../ts/types/dataTransmissionsDevice.types";
import { Search } from "../../../../../../../components/uiKit/Search";

type PropsType = {
  toggleDeleteConcentratorPopup: (deleteConcentratorPopup: boolean) => void;
  toggleActiveConcentratorPopup: (activateConcentratorPopup: boolean) => void;
  setSelectedConcentratorCallBack: (id: string) => void;
  toggleIsSidebarOpen: (bool: boolean) => void;
  searchUSPDCallback: (value: string) => void;
  setMeterTypeCallback: () => void;
  allConcentrators: Array<ConcentratorItemType>;
};

export const ConcentratorsList: FC<PropsType> = ({
  toggleDeleteConcentratorPopup,
  toggleActiveConcentratorPopup,
  setSelectedConcentratorCallBack,
  setMeterTypeCallback,
  toggleIsSidebarOpen,
  searchUSPDCallback,
  allConcentrators,
}) => {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchUSPDCallback(searchValue);
  }, [searchValue]);

  return (
    <div className="info-concentrators-list">
      <div className="info-concentrators-list__header">
        <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
        <div className="mb8px"></div>
        <AddButton
          title="Добавить УСПД"
          style={{ width: 167, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push("/admin/concentrators/power-meter/add-concentrator/connection-by-transmission-device");
          }}
        />
      </div>
      <div className="info-concentrators-list__quantity">Всего УСПД: {allConcentrators.length}</div>

      <div className="info-concentrators-list__body">
        <div className="info-concentrators-list__list">
          {allConcentrators.filter(folder => folder.name.includes(searchValue)).map((item) => (
            <ConcentratorListItem
              key={item.id}
              name={item.name}
              id={item.id}
              ip={item.ip}
              toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
              toggleActiveConcentratorPopup={toggleActiveConcentratorPopup}
              setSelectedConcentrator={setSelectedConcentratorCallBack}
              setMeterTypeCallback={setMeterTypeCallback}
              toggleIsSidebarOpen={toggleIsSidebarOpen}
              isActive={item.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
