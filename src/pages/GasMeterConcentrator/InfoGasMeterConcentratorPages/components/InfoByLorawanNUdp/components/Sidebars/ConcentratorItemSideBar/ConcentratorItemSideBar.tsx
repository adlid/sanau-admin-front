import moment from "moment";
import React, { FC } from "react";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";
import { useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";

interface IConcentratorItemSideBarProps {
  close: any;
}

export const ConcentratorItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close } = props;

  const { selectedConcentrator } = useTypedSelector((state) => state.waterMeterLorawanUdpDeviceConcentrator);

  return (
    <div className="gas-lorawan-udp-concentrator-item-sidebar" style={{ height: "100%" }}>
      <div className="gas-lorawan-udp-concentrator-item-sidebar__header">
        <Close onClick={close} style={{ cursor: "pointer" }} />
        <div>
          <p className="gas-lorawan-udp-concentrator-item-sidebar__header_title">{selectedConcentrator?.name}</p>
          <p className="gas-lorawan-udp-concentrator-item-sidebar__header_text">Информация</p>
        </div>
      </div>

      <div className="gas-lorawan-udp-concentrator-item-sidebar__body">
        <div className="item">
          <h2 className="text">GatewayID</h2>
          <h2 className="text">{selectedConcentrator?.gatewayID}</h2>
        </div>
        <div className="item">
          <h2 className="text">Дата и время добавления</h2>
          <h2 className="text long">
            {selectedConcentrator?.createdAt ? moment(selectedConcentrator?.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Последняя активность</h2>
          <h2 className="text long">
            {selectedConcentrator?.lastSeenAt
              ? moment(selectedConcentrator?.lastSeenAt).format("DD.MM.YYYY HH:mm")
              : "-"}
          </h2>
        </div>
      </div>

      <div className="gas-lorawan-udp-concentrator-item-sidebar__footer" style={{ position: "absolute", bottom: 0 }}>
        <MainButton title="Закрыть" isSecondary style={{ width: 130, height: 40, fontSize: 14 }} onClick={close} />
      </div>
    </div>
  );
};
