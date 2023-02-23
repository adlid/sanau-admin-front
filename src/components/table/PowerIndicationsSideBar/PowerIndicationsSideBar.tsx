import React, { FC } from "react";

interface IWaterIndicationsSideBar {
  meterData: any;
  close: any;
}

export const PowerIndicationsSideBar: FC<IWaterIndicationsSideBar> = (props) => {
  const { meterData, close } = props;

  return (
    <div className="sideBar-indications-detailItem">
      <div className="sideBar-indications-detailItem__section">
        <p className="sideBar-indications-detailItem__section_title">Прибор учета</p>
      </div>
      <div className="sideBar-indications-detailItem__infoBox">
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Тип:</p>
          <p className="text"> {meterData.commonType}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text"> Дата поверки:</p>
          <p className="text"> {meterData.verificationDate || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Начало эксплуатации:</p>
          <p className="text">{meterData.createdAt || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Автосчитование:</p>
          <p className="text"> {meterData.autoRead ? "+" : "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Изготовитель:</p>
          <p className="text">{meterData.manufacturer || "-"}</p>
        </div>
      </div>

      <div className="sideBar-indications-detailItem__section">
        <p className="sideBar-indications-detailItem__section_title">Контрагент</p>
      </div>
      <div className="sideBar-indications-detailItem__infoBox">
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Вид</p>
          <p className="text">{meterData.roleName || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">ФИО</p>
          <p className="text"> {meterData.fullName !== null ? meterData.fullName : "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Адрес</p>
          <p className="text"> {meterData.location !== null ? meterData.location : "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Организация</p>
          <p className="text"> {meterData.organizationName || "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Лицевой счет:</p>
          <p className="text"> {meterData.personalAccountNumber !== null ? meterData.personalAccountNumber : "-"}</p>
        </div>
        <div className="sideBar-indications-detailItem__infoBox_item">
          <p className="text">Роль:</p>
          <p className="text"> {meterData.roleName !== null ? meterData.roleName : ""}</p>
        </div>
      </div>
    </div>
  );
};
