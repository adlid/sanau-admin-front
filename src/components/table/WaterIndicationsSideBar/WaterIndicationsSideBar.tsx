import moment from "moment";
import React, { FC } from "react";
import { FlowSensorErrIcon } from "../../../assets/imgs/FlowSensorErrIcon";
import { LowBatteryErrIcon } from "../../../assets/imgs/LowBatteryErrIcon";
import { ReverseFlowErrIcon } from "../../../assets/imgs/ReverseFlowErrIcon";
import { TemperatureSensorErrIcon } from "../../../assets/imgs/TemperatureSensorErrIcon";
import { ValveMalfunctionErrIcon } from "../../../assets/imgs/ValveMalfunctionErrIcon";
import { WaterPipeLeakErrIcon } from "../../../assets/imgs/WaterPipeLeakErrIcon";
import { IWaterIndicationMeterListItem } from "../../../ts/interfaces/indication.interface";
import { MainWaterTableDataType } from "../../../ts/types/indication.types";
import { UserRoles } from "../../../ts/types/lorawanUdpDevice.types";

interface IWaterIndicationsSideBar {
  meter: MainWaterTableDataType | IWaterIndicationMeterListItem;
  close: any;
}

export const WaterIndicationsSideBar: FC<IWaterIndicationsSideBar> = (props) => {
  const { meter, close } = props;

  const errColor = (value: boolean) => {
    if (value) {
      return "#EB5757";
    } else {
      return "#253D51";
    }
  };

  return (
    <div className="sideBar-indications-detailItem">
      <div className="sideBar-indications-detailItem__header">
        <svg
          onClick={close}
          style={{ cursor: "pointer" }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
            fill="#253D51"
          />
        </svg>

        <div>
          <p className="sideBar-indications-detailItem__header_title">
            {meter.deviceName || "Наименование прибора учета"}
          </p>
          <p className="sideBar-indications-detailItem__header_text">{meter.devEUI}</p>
        </div>
      </div>

      <div className="sideBar-indications-detailItem__section">
        <p className="sideBar-indications-detailItem__section_title">Прибор учета</p>
      </div>

      <div className="sideBar-indications-detailItem__infoBox">
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Тип</p>
          <p className="text">{meter.commonType}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">GatewayID</p>
          <p className="text">{meter.gatewayID || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Начало эксплуатации</p>
          <p className="text">{meter.createdAt ? moment(meter.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Дата поверки</p>
          <p className="text">
            {meter.verificationDate}{" "}
            <span className="text" style={{ textDecoration: "underline", cursor: "pointer", color: "#18A0FB" }}>
              изменить
            </span>
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Показание</p>
          <p className="text">
            {meter.waterIndication || "0"}
            <i>
              м<sup>3</sup>
            </i>
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Мощность сигнала</p>
          <p className="text">{meter.signalIntensity || "0"} dB</p>
        </div>
      </div>

      <div className="sideBar-indications-detailItem__section">
        <p className="sideBar-indications-detailItem__section_title">Состояние прибора учета</p>
      </div>

      <div className="sideBar-indications-detailItem__infoBox">
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color: errColor(meter.flowSensorFailureOrAtcAlarm),
            }}
          >
            Датчик хола
          </p>
          <p
            className="text"
            style={{
              color: meter.flowSensorFailureOrAtcAlarm ? "#EB5757" : "#31B77E",
            }}
          >
            {meter.flowSensorFailureOrAtcAlarm && "Неисправен"}
            <FlowSensorErrIcon color={errColor(meter.flowSensorFailureOrAtcAlarm)} />
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color: errColor(meter.temperatureSensorFaultAlarm),
            }}
          >
            Переключатель резервного питания
          </p>
          <p
            className="text"
            style={{
              color: meter.temperatureSensorFaultAlarm ? "#EB5757" : "#31B77E",
            }}
          >
            {meter.temperatureSensorFaultAlarm && "Неисправен"}
            <TemperatureSensorErrIcon color={errColor(meter.temperatureSensorFaultAlarm)} />
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color: errColor(meter.waterPipeLeakageFaultAlarm),
            }}
          >
            Сильные магнитные помехи
          </p>
          <p
            className="text"
            style={{
              color: meter.waterPipeLeakageFaultAlarm ? "#EB5757" : "#31B77E",
            }}
          >
            {meter.waterPipeLeakageFaultAlarm && "Неисправен"}
            <WaterPipeLeakErrIcon color={errColor(meter.waterPipeLeakageFaultAlarm)} />
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color: errColor(meter.valveFailureAlarm),
            }}
          >
            Неисправность клапана
          </p>
          <p
            className="text"
            style={{
              color: meter.valveFailureAlarm ? "#EB5757" : "#31B77E",
            }}
          >
            {meter.valveFailureAlarm && "Неисправен"}
            <ValveMalfunctionErrIcon color={errColor(meter.valveFailureAlarm)} />
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color:
                meter.electricityBattery <= 50 ? (meter.electricityBattery < 20 ? "#EB5757" : "#FF8A00") : "#253D51",
            }}
          >
            Заряд батареи
          </p>
          <p
            className="text"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color:
                meter.electricityBattery <= 50 ? (meter.electricityBattery < 20 ? "#EB5757" : "#FF8A00") : "#31B77E",
            }}
          >
            {meter.electricityBattery || "-"} %
            {
              <LowBatteryErrIcon
                color={
                  meter.electricityBattery <= 50 ? (meter.electricityBattery < 20 ? "#EB5757" : "#FF8A00") : "#31B77E"
                }
              />
            }
          </p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p
            className="text"
            style={{
              color: errColor(meter.reverseFlowAlarm),
            }}
          >
            Отчет об обратном потоке
          </p>
          <p
            className="text"
            style={{
              color: meter.reverseFlowAlarm ? "#EB5757" : "#31B77E",
            }}
          >
            {meter.reverseFlowAlarm && "Неисправен"}
            <ReverseFlowErrIcon color={errColor(meter.reverseFlowAlarm)} />
          </p>
        </div>
      </div>

      <div className="sideBar-indications-detailItem__section">
        <p className="sideBar-indications-detailItem__section_title">Контрагент</p>
      </div>

      <div className="sideBar-indications-detailItem__infoBox">
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Вид</p>
          <p className="text">{UserRoles[meter.roleName || "-"] || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">ФИО</p>
          <p className="text">{meter.fullName || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Адрес</p>
          <p className="text">{meter.location || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Номер телефона</p>
          <p className="text">{meter.phoneNumber || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Электронная почта</p>
          <p className="text">{meter.email || "-"}</p>
        </div>
      </div>
    </div>
  );
};
