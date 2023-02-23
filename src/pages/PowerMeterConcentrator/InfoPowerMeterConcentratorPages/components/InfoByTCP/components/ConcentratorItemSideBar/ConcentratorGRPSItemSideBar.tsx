import moment from "moment";
import React, { FC } from "react";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { ReactComponent as Close } from "../../../../../../../assets/imgs/Close.svg";
import { GPRSListResponseType } from "../../../../../../../ts/types/gprs.types";
import { UserRoles } from "../../../../../../../ts/types/lorawanUdpDevice.types";

interface IConcentratorItemSideBarProps {
  close: any;
  selectedItem: GPRSListResponseType;
}

export const ConcentratorGRPSItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close, selectedItem } = props;

  return (
    <div className="gas-lorawan-grps-concentrator-item-sidebar" style={{ height: "100%" }}>
      <div className="gas-lorawan-grps-concentrator-item-sidebar__header">
        <Close onClick={close} style={{ cursor: "pointer" }} />
        <div>
          <p className="gas-lorawan-grps-concentrator-item-sidebar__header_title">
            {selectedItem?.apnName || selectedItem?.ip || selectedItem?.deviceId}
          </p>
          <p className="gas-lorawan-grps-concentrator-item-sidebar__header_text">Информация</p>
        </div>
      </div>

      <div className="gas-lorawan-grps-concentrator-item-sidebar__body">
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Прибор учета</div>
        <div className="item">
          <h2 className="text">Серийный номер</h2>
          <h2 className="text">{selectedItem?.deviceId || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Сетевой адрес</h2>
          <h2 className="text long">{selectedItem?.apnName || "---"}</h2>
        </div>
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
            {selectedItem?.updatedAt ? moment(selectedItem?.updatedAt).format("DD.MM.YYYY HH:mm") : "-"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Изготовитель</h2>
          <h2 className="text long">{selectedItem?.manufacturer || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Организация, настроившая сбор</h2>
          <h2 className="text long">{selectedItem?.setUpOrganization || "---"}</h2>
        </div>
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Информация</div>
        <div className="item">
          <h2 className="text">BIN-код</h2>
          <h2 className="text long">{selectedItem?.binCode || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Версия прошивки</h2>
          <h2 className="text long">{selectedItem?.programVersion || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Предаточное число</h2>
          <h2 className="text long">{selectedItem?.meterConstant || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Время работы</h2>
          <h2 className="text long">{selectedItem?.timeInNetwork || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Напряжение батареи</h2>
          <h2 className="text long">{selectedItem?.batteryVoltage || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Температура</h2>
          <h2 className="text long">{selectedItem?.temperature || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Дополнительно</h2>
          <h2 className="text long">{"---"}</h2>
        </div>
        <div className="gas-lorawan-grps-concentrator-item-sidebar__body_title">Контрагент</div>
        <div className="item">
          <h2 className="text">Вид</h2>
          <h2 className="text long">{selectedItem?.roleName ? UserRoles[selectedItem?.roleName] : "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">ФИО</h2>
          <h2 className="text long">
            {selectedItem?.fullName || selectedItem?.userInfo
              ? `${selectedItem?.userInfo?.lastname} ${selectedItem?.userInfo?.firstname} ${selectedItem?.userInfo?.fathersname}`
              : "---"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Должность</h2>
          <h2 className="text long">{selectedItem?.userInfo?.position || "---"}</h2>
        </div>
        <div className="item">
          <h2 className="text">Лицевой счет</h2>
          <h2 className="text long">
            {selectedItem.personalAccountNumber || selectedItem?.userInfo?.personalAccountNumber || "---"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Наименование организации</h2>
          <h2 className="text long">
            {selectedItem.organizationName || selectedItem?.userInfo?.organizationName || "---"}
          </h2>
        </div>
        <div className="item">
          <h2 className="text">Адрес</h2>
          <h2 className="text long">
            {selectedItem?.address || selectedItem?.location || selectedItem.userInfo
              ? `${selectedItem?.userInfo?.lastname} ${selectedItem?.userInfo?.firstname} ${selectedItem?.userInfo?.fathersname}`
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
