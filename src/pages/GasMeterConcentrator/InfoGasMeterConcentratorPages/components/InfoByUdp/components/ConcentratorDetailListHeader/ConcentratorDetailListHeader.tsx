import moment from "moment";
import React, { FC, useState } from "react";
import { Drawer, Link } from "@material-ui/core";
//ts
import { GasConcentratorItemType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { ConcentratorItemSideBar } from "../Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
import { useHistory } from "react-router";
import { AddButton } from "../../../../../../../components/uiKit/Buttons/AddButton";

type PropsType = {
  isConcentratorSelected: boolean;
  selectedConcentrator: GasConcentratorItemType | null;
  detailHeaderRef: any;
};

export const ConcentratorDetailListHeader: FC<PropsType> = (props) => {
  const { isConcentratorSelected, selectedConcentrator, detailHeaderRef } = props;
  // HOOKS
  const history = useHistory();
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
      <div className="gas-udp-concentrator-detail-list-header" ref={detailHeaderRef}>
        {/* {!isConcentratorSelected && (
          <div className="d-flex justify-content-between align-items-center">
            <span className="gas-udp-concentrator-detail-list-header__title">Базовая станция не выбрана</span>
          </div>
        )} */}

        {/* {isConcentratorSelected && selectedConcentrator !== null && (  */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="gas-udp-concentrator-detail-list-header__title">
              Наименование
              {/* {selectedConcentrator.stationIp}:{selectedConcentrator.port} */}
            </span>
            <div>
              <span className="gas-udp-concentrator-detail-list-header__subtitle">
                Последняя активность: {moment().format("DD.MM.YYYY HH:mm")}
                {/* {selectedConcentrator.updateAt ? moment(selectedConcentrator.updateAt).format("DD.MM.YYYY HH:mm") : "-"} */}
              </span>
              <span className="link link--active link--no-line" onClick={sideBarToggle(true)}>
                Подробнее
              </span>
            </div>
          </div>
        </div>
        {/* )} */}

        <AddButton
          title="Добавить ПУ"
          style={{ width: 146, height: 40, fontSize: 14 }}
          onClick={() => history.push("/admin/concentrators/gas-meter/concentrator-info/create-udp")}
        />
      </div>
    </>
  );
};
