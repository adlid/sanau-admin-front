import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import React, { FC, useState } from "react";
import { Box, Typography } from "@material-ui/core";
// components
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../../utils/hooks/reduxHooks";
import { powerMeterLorawanUdpDeviceConcentratorAPI } from "../../../../../../../../api/concentrator/powerMeterLorawanUdpDeviceConcentratorAPI";
import {
  getLastCheckDateThunk,
  toggleLorawanUdpRealyThunk,
} from "../../../../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
// icons
import { ReactComponent as Close } from "../../../../../../../../assets/imgs/Close.svg";
import { ReactComponent as Checked } from "../../../../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../../../../assets/imgs/notChecked.svg";
import { useEffect } from "react";

interface IConcentratorItemSideBarProps {
  close: any;
}

export const ConcentratorMeterItemSideBar: FC<IConcentratorItemSideBarProps> = (props) => {
  const { close } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { selectedMeterObj } = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator);

  const [relayLoading, setRelayLoading] = useState<boolean>(false);
  const [dateLoading, setDateLoading] = useState<boolean>(false);

  const relayToggle = async () => {
    if (relayLoading) {
      return;
    }

    setRelayLoading(true);
    try {
      await powerMeterLorawanUdpDeviceConcentratorAPI.requestAnswerLoravanRelay({
        id: selectedMeterObj!.id,
        type: selectedMeterObj?.relay ? "relayOff" : "relayOn",
      });
      await setTimeout(async () => {
        await dispatch(
          toggleLorawanUdpRealyThunk({
            id: selectedMeterObj!.id,
            type: selectedMeterObj?.relay ? "relayOff" : "relayOn",
          })
        );
        setRelayLoading(false);
      }, 5000);
    } catch (e) {
    } finally {
    }
  };

  const getLastChechDate = async () => {
    setDateLoading(true);
    try {
      await powerMeterLorawanUdpDeviceConcentratorAPI.requestAnswerLoravanRelay({
        id: selectedMeterObj!.id,
        type: "dateAndTime",
      });
      await setTimeout(async () => {
        await dispatch(
          getLastCheckDateThunk({
            id: selectedMeterObj!.id,
            type: "dateAndTime",
          })
        );
        setDateLoading(false);
      }, 5000);
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    getLastChechDate();
  }, []);

  return (
    <>
      <div>
        <div className="power-lorawan-concentrator-item-sidebar">
          <div className="power-lorawan-concentrator-item-sidebar__header">
            <Close onClick={close} style={{ cursor: "pointer" }} />
            <div>
              <p className="power-lorawan-concentrator-item-sidebar__header_title">{selectedMeterObj?.deviceName}</p>
              <p className="power-lorawan-concentrator-item-sidebar__header_text">Информация</p>
            </div>
          </div>

          <div className="power-lorawan-concentrator-item-sidebar__body_title">Прибор учета</div>

          <div className="power-lorawan-concentrator-item-sidebar__body">
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
              <h2 className="text">Последняя активность</h2>
              <h2 className="text long">
                {selectedMeterObj?.fixedAt ? moment(selectedMeterObj?.fixedAt).format("DD.MM.YYYY HH:mm") : "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">Последняя проверка даты и времени ПУ</h2>
              <h2 className="text">
                {dateLoading ? <Spinner animation="border" size="sm" /> : selectedMeterObj?.currentTime || "-"}
              </h2>
            </div>
            <div className="item">
              <h2 className="text">Действителен</h2>
              <h2 className="text long">{selectedMeterObj?.active ? <Checked /> : <NotChecked />}</h2>
            </div>
            <div className="item">
              <h2 className="text">Привязан</h2>
              <h2 className="text long">{selectedMeterObj?.personalAccountNumber ? <Checked /> : <NotChecked />}</h2>
            </div>
            <div className="item">
              <h2 className="text">Реле нагрузки</h2>
              <Box className="text long" style={{ display: "flex", gap: "10px" }}>
                <Typography className="text">{selectedMeterObj?.relay ? "Включено" : "Выключено"}</Typography>
                <Typography className="text link" onClick={relayToggle}>
                  {relayLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : !selectedMeterObj?.relay ? (
                    "Включить"
                  ) : (
                    "Выключить"
                  )}
                </Typography>
              </Box>
            </div>
          </div>

          <div className="power-lorawan-concentrator-item-sidebar__body_title">Контрагент</div>

          <div className="power-lorawan-concentrator-item-sidebar__body">
            <div className="item">
              <h2 className="text">Вид</h2>
              <h2 className="text long">{selectedMeterObj?.roleName || "-"}</h2>
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

          <div className="power-lorawan-concentrator-item-sidebar__footer">
            <MainButton
              title="Изменить"
              style={{ width: 126, height: 40, fontSize: 14 }}
              onClick={() =>
                history.push(
                  `/admin/concentrators/power-meter/concentrator-info/lorawan-udp-edit?meterId=${
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
