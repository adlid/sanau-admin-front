import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";
import { useAppDispatch, useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";
import { getMeterReportPeriodThunk } from "../../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserRoles } from "../../../../../../../../ts/types/lorawanUdpDevice.types";
import { minutesToDate } from "../../../../../../../../ts/types/reportPeriod";

interface IConcentratorItemSideBarProps {
  close: any;
  openReportingPeriodModal: any;
  openPulseRatioModal: any;
  openDateAndTimeModal: any;
}

export const ConcentratorMeterItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close, openReportingPeriodModal, openPulseRatioModal, openDateAndTimeModal } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { selectedMeterObj } = useTypedSelector((state) => state.waterMeterLorawanUdpDeviceConcentrator);

  return (
    <>
      <div>
        <div className="gas-lorawan-udp-concentrator-item-sidebar">
          <div className="gas-lorawan-udp-concentrator-item-sidebar__header">
            <Close onClick={close} style={{ cursor: "pointer" }} />
            <div>
              <p className="gas-lorawan-udp-concentrator-item-sidebar__header_title">{selectedMeterObj?.deviceName}</p>
              <p className="gas-lorawan-udp-concentrator-item-sidebar__header_text">Информация</p>
            </div>
          </div>

          <div className="gas-lorawan-udp-concentrator-item-sidebar__body_title">Прибор учета</div>

          <div className="gas-lorawan-udp-concentrator-item-sidebar__body">
            <div className="item">
              <h2 className="text">DevEUI</h2>
              <h2 className="text">{selectedMeterObj?.devEUI || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Тип</h2>
              <h2 className="text long">{selectedMeterObj?.type || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Серийный номер</h2>
              <h2 className="text long">{selectedMeterObj?.serial || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Дата добавления</h2>
              <h2 className="text long">
                {selectedMeterObj?.createdAt ? moment(selectedMeterObj?.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
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
                {selectedMeterObj?.checkTime ? moment(selectedMeterObj?.checkTime).format("DD.MM.YYYY HH:mm") : "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">Отчетный период</h2>
              <div style={{ display: "flex" }}>
                <h2 className="text">
                  {`${minutesToDate[selectedMeterObj!.period] || selectedMeterObj?.period || "-"}`}
                </h2>
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
                  {selectedMeterObj?.currentTime
                    ? moment(selectedMeterObj?.currentTime).format("DD.MM.YYYY HH:mm")
                    : "-"}
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
            </div>
            <div className="item">
              <h2 className="text">Коэффициент ипульса</h2>
              <div style={{ display: "flex" }}>
                <h2 className="text">{selectedMeterObj?.impulses || "-"}</h2>
                <div className="mr12px" />
                <h2
                  className="text link"
                  onClick={() => {
                    close();
                    openPulseRatioModal(selectedMeterObj?.id);
                  }}
                >
                  Изменить
                </h2>
              </div>
            </div>
          </div>

          <div className="gas-lorawan-udp-concentrator-item-sidebar__body_title">Контрагент</div>

          <div className="gas-lorawan-udp-concentrator-item-sidebar__body">
            <div className="item">
              <h2 className="text">Лицевой счет</h2>
              <h2 className="text long">{selectedMeterObj?.personalAccountNumber || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Вид</h2>
              <h2 className="text long">{selectedMeterObj?.roleName ? UserRoles[selectedMeterObj?.roleName] : "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">ФИО</h2>
              <h2 className="text long">{selectedMeterObj?.fullName || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Адрес</h2>
              <h2 className="text long">{selectedMeterObj?.address || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Номер телефона</h2>
              <h2 className="text long">{selectedMeterObj?.phoneNumber || "-"}</h2>
            </div>
            <div className="item">
              <h2 className="text">Электронная почта</h2>
              <h2 className="text long">{selectedMeterObj?.email || "-"}</h2>
            </div>
          </div>

          <div className="gas-lorawan-udp-concentrator-item-sidebar__footer">
            <MainButton
              title="Изменить"
              style={{ width: 126, height: 40, fontSize: 14 }}
              onClick={() =>
                history.push(
                  `/admin/concentrators/gas-meter/concentrator-info/edit-udp?meterId=${
                    selectedMeterObj?.id
                  }&meterName=${selectedMeterObj?.deviceName}${
                    selectedMeterObj?.personalAccountNumber &&
                    `&personalAccountNumber=${selectedMeterObj?.personalAccountNumber}`
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
