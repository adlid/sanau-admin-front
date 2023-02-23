import moment from "moment";
import React, { FC } from "react";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";
import { useAppDispatch, useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";
import { useHistory } from "react-router";
import { UserRoles } from "../../../../../../../../ts/types/lorawanUdpDevice.types";

interface IConcentratorItemSideBarProps {
  close: any;
  openReportingPeriodModal: any;
  openPulseRatioModal: any;
  openDateAndTimeModal: any;
}

export const ConcentratorMeterItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close, openReportingPeriodModal, openDateAndTimeModal } = props;
  const history = useHistory();

  const { selectedMeterObj } = useTypedSelector((state) => state.gasMeterUdpDeviceConcentrator);

  return (
    <>
      <div>
        <div className="gas-udp-concentrator-item-sidebar">
          <div className="gas-udp-concentrator-item-sidebar__header">
            <Close onClick={close} style={{ cursor: "pointer" }} />
            <div>
              <p className="gas-udp-concentrator-item-sidebar__header_title">
                {selectedMeterObj?.meterName || selectedMeterObj?.barcode || "-"}
              </p>
              <p className="gas-udp-concentrator-item-sidebar__header_text">Информация</p>
            </div>
          </div>

          <div className="gas-udp-concentrator-item-sidebar__body_title">Прибор учета</div>

          <div className="gas-udp-concentrator-item-sidebar__body">
            <div className="item">
              <h2 className="text">Серийный номер</h2>
              <h2 className="text">{selectedMeterObj?.barcode || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Тип</h2>
              <h2 className="text long">{selectedMeterObj?.typeOfMeter || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Дата добавления</h2>
              <h2 className="text long">
                {selectedMeterObj?.dateReleased
                  ? moment(selectedMeterObj?.dateReleased).format("DD.MM.YYYY HH:mm")
                  : "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">Изготовитель</h2>
              <h2 className="text long">{selectedMeterObj?.manufacturer || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Организация, настроившая сбор</h2>
              <h2 className="text long">{selectedMeterObj?.setUpOrganization || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Дата поверки</h2>
              <h2 className="text long">
                {selectedMeterObj?.verificationDate
                  ? moment(selectedMeterObj?.verificationDate).format("DD.MM.YYYY HH:mm")
                  : "-"}
              </h2>
            </div>
            {/* TODO ГАЗ */}
            {/* <div className="item">
              <h2 className="text">Расписание считывания</h2>
              <div style={{ display: "flex" }}>
                <h2 className="text long">{selectedMeterObj?.setUpOrganization || "-"}</h2>
             
                <div className="mr12px" />
                <h2
                  className="text link"
                  onClick={() => {
                    close();
                    openReportingPeriodModal(selectedMeterObj?.id);
                  }}
                >
                  Изменить
                </h2>
              </div>
            </div>
            <div className="item">
              <h2 className="text">Последняя проверка даты и времени ПУ</h2>
              <div style={{ display: "flex" }}>
                <h2 className="text">
                  {selectedMeterObj?.updatedAt ? moment(selectedMeterObj?.updatedAt).format("DD.MM.YYYY HH:mm") : "-"}
                </h2>
                <div className="mr12px" />
                <h2
                  className="text link"
                  onClick={() => {
                    close();
                    openDateAndTimeModal(selectedMeterObj?.id);
                  }}
                >
                  Изменить
                </h2>
              </div>
            </div> */}
          </div>

          <div className="gas-udp-concentrator-item-sidebar__body_title">Контрагент</div>

          <div className="gas-udp-concentrator-item-sidebar__body">
            <div className="item">
              <h2 className="text">Лицевой счет</h2>
              <h2 className="text long">{selectedMeterObj?.userInfo?.personalAccountNumber || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Вид</h2>
              <h2 className="text long">
                {selectedMeterObj?.userInfo?.roleName ? UserRoles[selectedMeterObj?.userInfo?.roleName] : "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">ФИО</h2>
              <h2 className="text long">
                {selectedMeterObj?.userInfo
                  ? (selectedMeterObj?.userInfo?.lastname || "-") +
                    " " +
                    (selectedMeterObj?.userInfo?.firstname || "-") +
                    " " +
                    (selectedMeterObj?.userInfo?.fathersname || "-")
                  : "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">Адрес</h2>
              <h2 className="text long">{selectedMeterObj?.userInfo?.city || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Номер телефона</h2>
              <h2 className="text long">{selectedMeterObj?.userInfo?.phoneNumber || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Электронная почта</h2>
              <h2 className="text long">{selectedMeterObj?.userInfo?.email || "-"}</h2>
            </div>
          </div>

          <div className="gas-udp-concentrator-item-sidebar__footer">
            <MainButton
              title="Изменить"
              style={{ width: 126, height: 40, fontSize: 14 }}
              onClick={() =>
                history.push(
                  `/admin/concentrators/gas-meter/concentrator-info/edit-udp?meterId=${selectedMeterObj?.id}${
                    selectedMeterObj?.meterName ? `&meterName=${selectedMeterObj?.meterName}` : ""
                  }${
                    selectedMeterObj?.userInfo?.personalAccountNumber
                      ? `&personalAccountNumber=${selectedMeterObj?.userInfo?.personalAccountNumber}`
                      : ""
                  }`
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
