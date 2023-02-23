import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { ConcentratorListItem } from "../ConcentratorListItem";
import { ConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { Search } from "../../../../../../../components/uiKit/Search";
import { Drawer } from "@material-ui/core";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";

type PropsType = {
  setSelectedConcentratorCallBack: (id: string) => void;
  allConcentrators: Array<ConcentratorItemType>;
};

export const ConcentratorsList: FC<PropsType> = ({ setSelectedConcentratorCallBack, allConcentrators }) => {
  const [searchValue, setSearchValue] = useState("");

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  return (
    <>
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorItemSideBar close={sideBarToggle(false)} />
        </div>
      </Drawer>
      <div className="info-gas-lorawan-udp-concentrators-list">
        <div className="info-gas-lorawan-udp-concentrators-list__header">
          <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
        </div>
        <div className="info-gas-lorawan-udp-concentrators-list__quantity">
          Всего базовых станций: {allConcentrators.length}
        </div>

        <div className="info-gas-lorawan-udp-concentrators-list__body">
          <div className="info-gas-lorawan-udp-concentrators-list__list">
            {allConcentrators.map((item) => (
              <ConcentratorListItem
                key={item.id}
                name={item.name}
                id={item.id}
                gatewayID={item.gatewayID}
                sideBarToggle={sideBarToggle}
                setSelectedConcentrator={setSelectedConcentratorCallBack}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
