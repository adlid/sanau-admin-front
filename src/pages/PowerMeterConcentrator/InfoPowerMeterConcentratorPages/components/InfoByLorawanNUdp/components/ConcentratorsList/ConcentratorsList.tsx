import { Drawer } from "@material-ui/core";
import React, { FC, useState } from "react";
// components
import { ConcentratorListItem } from "../ConcentratorListItem";
import { Search } from "../../../../../../../components/uiKit/Search";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
//ts
import { ConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import {
  editPowerLorawanGatewayThunk,
  searchPowerLorawanAllConcentrators,
} from "../../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { EditLorawanGatewayModal } from "../../../../../../../components/uiKit/modals/EditLorawanGatewayModal/EditLorawanGatewayModal";

type PropsType = {
  setSelectedConcentratorCallBack: (id: string) => void;
  allConcentrators: Array<ConcentratorItemType>;
  toggleDeleteConcentratorPopup: (deleteConcentratorPopup: boolean) => void;
  toggleActiveConcentratorPopup: (activateConcentratorPopup: boolean) => void;
};

export const ConcentratorsList: FC<PropsType> = (props) => {
  const {
    setSelectedConcentratorCallBack,
    allConcentrators,
    toggleDeleteConcentratorPopup,
    toggleActiveConcentratorPopup,
  } = props;
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");

  const { selectedConcentrator } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator);

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  const searchGateways = () => dispatch(searchPowerLorawanAllConcentrators(searchValue));

  // MODAL
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  return (
    <>
      <EditLorawanGatewayModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        gatewayId={selectedConcentrator?.id}
        editThunk={editPowerLorawanGatewayThunk}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorItemSideBar close={sideBarToggle(false)} openEditModal={() => setEditModalOpen(true)} />
        </div>
      </Drawer>
      <div className="info-power-lorawan-list">
        <div className="info-power-lorawan-list__header">
          <Search
            value={searchValue}
            onChange={(value: string) => setSearchValue(value)}
            onEnterPress={searchGateways}
          />
        </div>
        <div className="info-power-lorawan-list__quantity">Всего базовых станций: {allConcentrators.length}</div>

        <div className="info-power-lorawan-list__body">
          <div className="info-power-lorawan-list__list">
            {allConcentrators.filter(folder => folder.name.includes(searchValue)).map((item) => (
              <ConcentratorListItem
                key={item.id}
                name={item.name}
                id={item.id}
                gatewayID={item.gatewayID}
                sideBarToggle={sideBarToggle}
                isActive={item.active}
                setSelectedConcentrator={setSelectedConcentratorCallBack}
                toggleDeleteConcentratorPopup={toggleDeleteConcentratorPopup}
                toggleActiveConcentratorPopup={toggleActiveConcentratorPopup}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
