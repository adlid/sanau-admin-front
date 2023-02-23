import moment from "moment";
import { Drawer } from "@material-ui/core";
import React, { FC, useState } from "react";

import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
//ts
import { ConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
import { EditLorawanGatewayModal } from "../../../../../../../components/uiKit/modals/EditLorawanGatewayModal/EditLorawanGatewayModal";
import { editPowerLorawanGatewayThunk, updatePowerGatewayThunk } from "../../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";

type PropsType = {
  isConcentratorSelected: boolean;
  selectedConcentrator: ConcentratorItemType | null;
  filterRef?: any;
};

export const ConcentratorDetailListHeader: FC<PropsType> = (props) => {
  const { isConcentratorSelected, selectedConcentrator, filterRef } = props;

  const onNetworkServerClick = () => {
    window.open(process.env.REACT_APP_NETWORK_SERVER_BASE_URL, "_blank", "noopener,noreferrer");
  };

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  // MODAL
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleUpdateLorawan = () => {
    dispatch(updatePowerGatewayThunk())
  }

  const { isFetchingSelectedConcentratorMeters } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator)

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

      <div className="power-lorawan-detail-list-header" ref={filterRef}>
        {!isConcentratorSelected && (
          <div className="d-flex justify-content-between align-items-center">
            <span className="power-lorawan-detail-list-header__title">Базовая станция не выбрана</span>
            <MainButton
              onClick={handleUpdateLorawan}
              isDisabled={isFetchingSelectedConcentratorMeters}
              title="Обновить шлюзы"
              style={{ width: 200, height: 40, fontSize: 14 }}
            />
            <MainButton
              isSecondary
              title="Перейти на Network Server"
              style={{ width: 220, height: 40, fontSize: 14 }}
              onClick={onNetworkServerClick}
            />
          </div>
        )}

        {isConcentratorSelected && selectedConcentrator !== null && (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="power-lorawan-detail-list-header__title">{selectedConcentrator.name}</span>
              <div>
                <span className="power-lorawan-detail-list-header__subtitle">
                  Последняя активность:{" "}
                  {selectedConcentrator.lastSeenAt
                    ? moment(selectedConcentrator.lastSeenAt).format("DD.MM.YYYY HH:mm")
                    : "-"}
                </span>
                <span className="link link--active link--no-line" onClick={sideBarToggle(true)}>
                  Подробнее
                </span>
              </div>
            </div>
            <MainButton
              isSecondary
              title="Перейти на Network Server"
              style={{ width: 220, height: 40, fontSize: 14 }}
              onClick={onNetworkServerClick}
            />
          </div>
        )}
      </div>
    </>
  );
};
