import moment from "moment";
import React, { FC, useState } from "react";
// redux
import { useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
// components
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";

interface IConcentratorItemSideBarProps {
  close: any;
  openEditModal?: () => void;
}

export const ConcentratorItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close, openEditModal } = props;

  const { selectedConcentrator } = useTypedSelector((state) => state.waterMeterLorawanUdpDeviceConcentrator);

  const onEditGatewayAddressClick = () => {
    if (!openEditModal) {
      return;
    }

    close();
    openEditModal();
  };

  return (
    <div className="water-concentrator-item-sidebar" style={{ height: "100%" }}>
      <div className="water-concentrator-item-sidebar__header">
        <Close onClick={close} style={{ cursor: "pointer" }} />
        <div>
          <p className="water-concentrator-item-sidebar__header_title">{selectedConcentrator?.name}</p>
          <p className="water-concentrator-item-sidebar__header_text">Информация</p>
        </div>
      </div>

      <div className="water-concentrator-item-sidebar__body">
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
        <div className="item" style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="text">Адрес</h2>
          <div style={{ display: "flex" }}>
            <h2 className="text" style={{ marginRight: "8px" }}>
              {!selectedConcentrator?.city && !selectedConcentrator?.address
                ? "Не указано"
                : `${selectedConcentrator?.city ? selectedConcentrator?.city + ", " : ""}${
                    selectedConcentrator?.address
                  }`}
            </h2>

            {openEditModal && (
              <h2 className="text link" onClick={onEditGatewayAddressClick}>
                Изменить
              </h2>
            )}
          </div>
        </div>
      </div>

      <div className="water-concentrator-item-sidebar__footer" style={{ position: "absolute", bottom: 0 }}>
        <MainButton title="Закрыть" isSecondary style={{ width: 130, height: 40, fontSize: 14 }} onClick={close} />
      </div>
    </div>
  );
};
