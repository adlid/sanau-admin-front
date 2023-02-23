import moment from "moment";
import React, { FC } from "react";
// components
import { ReactComponent as Checked } from "../../../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../../../assets/imgs/notChecked.svg";
// ts
import { UserRoles } from "../../../../../../../ts/types/lorawanUdpDevice.types";
// redux
import { useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";

interface IAccordionSidebar {
  meter: any;
  close: any;
}

export const AccordionSidebar: FC<IAccordionSidebar> = (props) => {
  const { meter, close } = props;

  return (
    <div>
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
            {meter?.meterSettings?.meterName || meter?.serial || "Наименование УСПД"}
          </p>
          <p className="sideBar-indications-detailItem__header_text">Информация</p>
        </div>
      </div>
      <div style={{ height: "100%" }}>
        <div className="sideBar-indications-detailItem" style={{ borderRight: "1px solid #D7E2F2" }}>
          <div className="sideBar-indications-detailItem__section">
            <p className="sideBar-indications-detailItem__section_title">Прибор учета</p>
          </div>

          <div className="sideBar-indications-detailItem__infoBox">
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Тип</p>
              <p className="text">{meter?.meterSettings?.type || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Серийный номер</p>
              <p className="text">{meter?.serial || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Вид</p>
              <p className="text">{meter?.meterSettings?.meterGeneration || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Количество тарифов</p>
              <p className="text">{meter?.meterSettings?.numberOfTariffs || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Головной ПУ</p>
              <p className="text">{meter?.meterSettings?.head ? <Checked /> : <NotChecked />}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Фаза</p>
              <p className="text">{meter?.meterSettings?.phase || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Изготовитель</p>
              <p className="text">{meter?.meterSettings?.manufacturer || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Организация, настроившая сбор</p>
              <p className="text">{meter?.meterSettings?.setUpOrganization || "-"}</p>
            </div>
          </div>

          <div className="sideBar-indications-detailItem__section">
            <p className="sideBar-indications-detailItem__section_title">Контрагент</p>
          </div>

          <div className="sideBar-indications-detailItem__infoBox">
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Вид</p>
              <p className="text">
                {meter?.meterSettings?.userInfo?.roleName ? UserRoles[meter.meterSettings.userInfo.roleName] : "-"}
              </p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">ФИО</p>
              <p className="text">
                {meter?.meterSettings?.userInfo
                  ? `${meter.meterSettings.userInfo.lastname} ${meter.meterSettings.userInfo.firstname} ${meter.meterSettings.userInfo.fathersname}`
                  : "-"}
              </p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Адрес</p>
              <p className="text">
                {meter?.meterSettings?.userInfo
                  ? `${meter?.meterSettings?.userInfo?.city} ${meter?.meterSettings?.userInfo?.district} ${
                      meter?.meterSettings?.userInfo?.street &&
                      "квартира " + meter?.meterSettings?.userInfo?.street + ","
                    } ${
                      meter?.meterSettings?.userInfo?.house && "дом " + meter?.meterSettings?.userInfo?.house + ","
                    } ${meter?.meterSettings?.userInfo?.flat && "квартира " + meter?.meterSettings?.userInfo?.flat}`
                  : "-"}
              </p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Номер телефона</p>
              <p className="text">{meter?.meterSettings?.userInfo?.phoneNumber || "-"}</p>
            </div>
            <div className="sideBar-indications-detailItem__infoBox_item">
              <p className="text">Электронная почта</p>
              <p className="text">{meter?.meterSettings?.userInfo?.email || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
