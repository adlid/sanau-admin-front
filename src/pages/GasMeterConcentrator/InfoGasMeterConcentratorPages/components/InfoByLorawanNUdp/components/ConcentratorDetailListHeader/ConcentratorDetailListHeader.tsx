import { Drawer, Link } from "@material-ui/core";
import moment from "moment";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
//ts
import { ConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";

type PropsType = {
  isConcentratorSelected: boolean;
  selectedConcentrator: ConcentratorItemType | null;
};

export const ConcentratorDetailListHeader: FC<PropsType> = ({ isConcentratorSelected, selectedConcentrator }) => {
  const history = useHistory();

  const onNetworkServerClick = () => {
    window.open(process.env.REACT_APP_NETWORK_SERVER_BASE_URL, "_blank", "noopener,noreferrer");
  };

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
      <div className="gas-lorawan-udp-concentrator-detail-list-header">
        {!isConcentratorSelected && (
          <div className="d-flex justify-content-between align-items-center">
            <span className="gas-lorawan-udp-concentrator-detail-list-header__title">Базовая станция не выбрана</span>
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
              <span className="gas-lorawan-udp-concentrator-detail-list-header__title">
                {selectedConcentrator.name}
              </span>
              <div>
                <span className="gas-lorawan-udp-concentrator-detail-list-header__subtitle">
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
