import moment from "moment";
import React, { FC } from "react";
// сщьзщтутеы
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
// шсщты
import { ReactComponent as Close } from "../../../../../../../assets/imgs/Close.svg";
// еы
import { UserRoles } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { IDinRailMeterListItem } from "../../../../../../../ts/types/dinRailTypes";

interface IConcentratorItemSideBarProps {
  close: any;
  selectedItem: IDinRailMeterListItem;
}

export const ConcentratorItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close, selectedItem } = props;

  return (
    <div className="gas-lorawan-grps-concentrator-item-sidebar" style={{ height: "100%" }}>
      <div className="gas-lorawan-grps-concentrator-item-sidebar__header">
        <Close onClick={close} style={{ cursor: "pointer" }} />
        <div>
          <p className="gas-lorawan-grps-concentrator-item-sidebar__header_title">{selectedItem?.ip}</p>
          <p className="gas-lorawan-grps-concentrator-item-sidebar__header_text">Информация</p>
        </div>
      </div>

      <div className="gas-lorawan-grps-concentrator-item-sidebar__body">
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Прибор учета</div>
        {!selectedItem?.isHeadMeter && (
          <div className="item">
            <h2 className="text">ID головного</h2>
            <h2 className="text">{selectedItem?.headMeterId || "---"}</h2>
          </div>
        )}
        <div className="item">
          <h2 className="text">IP</h2>
          <h2 className="text long">{selectedItem?.ip || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Порт</h2>
          <h2 className="text long">{selectedItem?.port || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Последняя активность</h2>
          <h2 className="text long">
            {selectedItem?.updatedAt ? moment(selectedItem?.updatedAt).format("DD.MM.YYYY HH:mm") : "---"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Изготовитель</h2>
          <h2 className="text long">{"---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Организация, настроившая сбор</h2>
          <h2 className="text long">{"---"}</h2>
        </div>
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Информация</div>
        <div className="item">
          <h2 className="text">Тип</h2>
          <h2 className="text long">{selectedItem?.type || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Версия</h2>
          <h2 className="text long">{selectedItem?.version || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Напряжение</h2>
          <h2 className="text long">{selectedItem?.voltage || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Напряжение фаза А</h2>
          <h2 className="text long">{selectedItem?.voltagePhaseA || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Напряжение фаза B</h2>
          <h2 className="text long">{selectedItem?.voltagePhaseB || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Напряжение фаза C</h2>
          <h2 className="text long">{selectedItem?.voltagePhaseC || "---"}</h2>
        </div>
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Контрагент</div>
        <div className="item">
          <h2 className="text">Вид</h2>
          <h2 className="text long">
            {selectedItem?.userInfo?.roleName ? UserRoles[selectedItem?.userInfo?.roleName] : "---"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">ФИО</h2>
          <h2 className="text long">{selectedItem?.userInfo?.firstname || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Должность</h2>
          <h2 className="text long">{selectedItem?.port || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Лицевой счет</h2>
          <h2 className="text long">{selectedItem?.userInfo?.personalAccountNumber || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Наименование организации</h2>
          <h2 className="text long">{selectedItem?.userInfo?.organizationName || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Адрес</h2>
          <h2 className="text long">
            {selectedItem?.userInfo
              ? `${selectedItem?.userInfo?.city} ${selectedItem?.userInfo?.district} ${selectedItem?.userInfo?.street} ${selectedItem?.userInfo?.house} ${selectedItem?.userInfo?.flat}`
              : "---"}
          </h2>
        </div>
      </div>

      <div className="gas-lorawan-grps-concentrator-item-sidebar__footer">
        <MainButton title="Закрыть" isSecondary style={{ width: 130, height: 40, fontSize: 14 }} onClick={close} />
      </div>
    </div>
  );
};
