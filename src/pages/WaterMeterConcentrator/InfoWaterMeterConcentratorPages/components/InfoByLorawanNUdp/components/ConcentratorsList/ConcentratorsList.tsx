import React, { FC, useState } from "react";
import { Drawer } from "@material-ui/core";
// components
import { ConcentratorListItem } from "../ConcentratorListItem";
import { Search } from "../../../../../../../components/uiKit/Search";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
// ts
import { ConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import {
  editWaterLorawanGatewayThunk,
  searchWaterConcentratorsThunk,
} from "../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { EditLorawanGatewayModal } from "../../../../../../../components/uiKit/modals/EditLorawanGatewayModal/EditLorawanGatewayModal";

type PropsType = {
  setSelectedConcentratorCallBack: (id: string) => void;
  allConcentrators: Array<ConcentratorItemType>;
};

export const ConcentratorsList: FC<PropsType> = ({ setSelectedConcentratorCallBack, allConcentrators }) => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>("");

  const { selectedConcentrator } = useTypedSelector((state) => state.waterMeterLorawanUdpDeviceConcentrator);

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  const getGateways = () => dispatch(searchWaterConcentratorsThunk(searchValue));

  // MODAL
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  return (
    <>
      <EditLorawanGatewayModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        gatewayId={selectedConcentrator?.id}
        editThunk={editWaterLorawanGatewayThunk}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorItemSideBar close={sideBarToggle(false)} openEditModal={() => setEditModalOpen(true)} />
        </div>
      </Drawer>
      <div className="info-water-lorawan-udp-concentrators-list">
        <div className="info-water-lorawan-udp-concentrators-list__header">
          <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} onEnterPress={getGateways} />
        </div>
        <div className="info-water-lorawan-udp-concentrators-list__quantity">
          Всего базовых станций: {allConcentrators.length}
        </div>

        <div className="info-water-lorawan-udp-concentrators-list__body">
          <div className="info-water-lorawan-udp-concentrators-list__list">
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
