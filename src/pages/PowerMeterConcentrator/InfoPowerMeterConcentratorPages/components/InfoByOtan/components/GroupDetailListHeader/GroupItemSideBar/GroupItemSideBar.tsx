import moment from "moment";
import React, { FC } from "react";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";
import { useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";

interface IGroupItemSideBarProps {
  close: any;
}

export const GroupItemSideBar: FC<IGroupItemSideBarProps> = (props) => {
  const { close } = props;

  const { selectedConcentrator } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator);

  return (
    <div className="power-lorawan-concentrator-item-sidebar" style={{ height: "100%" }}>
      <div className="power-lorawan-concentrator-item-sidebar__header">
        <Close onClick={close} style={{ cursor: "pointer" }} />
        <div>
          <p className="power-lorawan-concentrator-item-sidebar__header_title">Наименование группы</p>
          <p className="power-lorawan-concentrator-item-sidebar__header_text">Информация</p>
        </div>
      </div>

      <div className="power-lorawan-concentrator-item-sidebar__body">
        <div className="item">
          <h2 className="text">Город</h2>
          <h2 className="text">Текст</h2>
        </div>
        <div className="item">
          <h2 className="text">Адрес</h2>
          <h2 className="text">Текст</h2>
        </div>
        <div className="item">
          <h2 className="text">Описание</h2>
          <h2 className="text">Текст</h2>
        </div>
      </div>

      <div
        className="power-lorawan-concentrator-item-sidebar__footer"
        style={{ position: "absolute", bottom: 0, display: "flex" }}
      >
        <MainButton title="Изменить" isSecondary style={{ width: 130, height: 40, fontSize: 14 }} />
        <MainButton title="Удалить" isSecondary style={{ width: 130, height: 40, fontSize: 14 }} />
      </div>
    </div>
  );
};
