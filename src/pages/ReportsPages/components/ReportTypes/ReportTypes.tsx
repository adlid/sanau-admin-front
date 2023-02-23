import { Input } from "@material-ui/core";
import React, { FC } from "react";
import { useHistory } from "react-router";
// icons
import { GasMeterIcon } from "../../../../assets/imgs/groupItemIcons/GasMeterIcon";
import { PowerMeterIcon } from "../../../../assets/imgs/groupItemIcons/PowerMeterIcon";
import { WaterMeterIcon } from "../../../../assets/imgs/groupItemIcons/WaterMeterIcon";

interface IReportTypes {
  searchValue: string;
  onSearchChange: (e: any) => void;
  currentGroup: string;
  setCurrentGroup: (name: string) => void;
  currentReportType: string;
  setCurrentReportType: (type: string) => void;
  currentMeterType: string;
}

export const ReportTypes: FC<IReportTypes> = (props) => {
  const {
    searchValue,
    onSearchChange,
    currentGroup,
    setCurrentGroup,
    currentReportType,
    setCurrentReportType,
    currentMeterType,
  } = props;

  // hooks
  const history = useHistory();

  return (
    <div className="reports__body_leftSide">
      <div className="meter-groups">
        <div
          onClick={() => setCurrentGroup("power")}
          className={currentGroup === "power" ? "meter-groups_item selected" : "meter-groups_item"}
        >
          <PowerMeterIcon current={currentGroup === "power"} />
          <p className="meter-groups_item__title">Электроэнергия</p>
        </div>
        <div
          onClick={() => setCurrentGroup("water")}
          className={currentGroup === "water" ? "meter-groups_item selected ml4px" : "meter-groups_item ml4px"}
        >
          <WaterMeterIcon current={currentGroup === "water"} />
          <p className="meter-groups_item__title ml4px">Вода</p>
        </div>
        <div
          onClick={() => setCurrentGroup("gas")}
          className={currentGroup === "gas" ? "meter-groups_item selected ml4px" : "meter-groups_item ml4px"}
        >
          <GasMeterIcon current={currentGroup === "gas"} />
          <p className="meter-groups_item__title">Газ</p>
        </div>
      </div>

      {/* {currentReportType === "Суточный баланс электричества" && (
        <div className="meter-groups">
          <div
            onClick={() => history.push("/admin/reports?type=УСПД")}
            className={currentMeterType === "УСПД" ? "meter-groups_item selected" : "meter-groups_item"}
          >
            <p className="meter-groups_item__title" style={{ marginLeft: "0px" }}>
              УСПД
            </p>
          </div>
          <div
            onClick={() => history.push("/admin/reports?type=TCP/IP")}
            className={currentMeterType === "TCP/IP" ? "meter-groups_item selected ml4px" : "meter-groups_item ml4px"}
          >
            <p className="meter-groups_item__title" style={{ marginLeft: "0px" }}>
              TCP/IP
            </p>
          </div>
          <div
            onClick={() => history.push("/admin/reports?type=Lorawan")}
            className={currentMeterType === "Lorawan" ? "meter-groups_item selected ml4px" : "meter-groups_item ml4px"}
          >
            <p className="meter-groups_item__title" style={{ marginLeft: "0px" }}>
              Lorawan
            </p>
          </div>
        </div>
      )} */}

      <div className="report-types">
        <p className="report-types_title">Выберите отчет</p>
        {currentGroup === "power" ? (
          <>
            <div
              className={
                currentReportType === "Баланс электроэнергии по УСПД" ? "report-types_box selected" : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Баланс электроэнергии по УСПД");
                history.push("/admin/reports");
              }}
            >
              <p className="report-types_box__reportTitle">Баланс электроэнергии по УСПД</p>
            </div>

            <div
              className={
                currentReportType === "Суточный баланс электричества" ? "report-types_box selected" : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Суточный баланс электричества");
                history.push("/admin/reports?type=DAILY");
              }}
            >
              <p className="report-types_box__reportTitle">Суточный баланс электричества</p>
            </div>

            <div
              className={
                currentReportType === "Суточный баланс электричества с разностью"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Суточный баланс электричества с разностью");
                history.push("/admin/reports?type=УСПД");
              }}
            >
              <p className="report-types_box__reportTitle">Суточный баланс электричества с разностью</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 1"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 1");
                history.push("/admin/reports?type=новый отчет 1");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 1</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 2"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 2");
                history.push("/admin/reports?type=новый отчет 2");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 2</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 3"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 3");
                history.push("/admin/reports?type=новый отчет 3");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 3</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 4"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 4");
                history.push("/admin/reports?type=новый отчет 4");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 4</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 5"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 5");
                history.push("/admin/reports?type=new5");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 5</p>
            </div>
            <div
              className={
                currentReportType === "новый отчет 6"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("новый отчет 6");
                history.push("/admin/reports?type=new6");
              }}
            >
              <p className="report-types_box__reportTitle">новый отчет 6</p>
            </div>
          </>
        ) : currentGroup === "water" ? (
          <>
            <div
              className={
                currentReportType === "Баланс воды с разностью"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Баланс воды с разностью");
                history.push("/admin/reports?type=УСПД");
              }}
            >
              <p className="report-types_box__reportTitle">Баланс воды с разностью</p>
            </div>

            <div
              className={
                currentReportType === "Отчёт по водосчетчикам"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Отчёт по водосчетчикам");
                history.push("/admin/reports");
              }}
            >
              <p className="report-types_box__reportTitle">Отчёт по водосчетчикам</p>
            </div>
          </>
        ) : currentGroup === "gas" ? (
          <>
            <div
              className={
                currentReportType === "Отчет по газосчетчикам"
                  ? "report-types_box selected"
                  : "report-types_box"
              }
              onClick={() => {
                setCurrentReportType("Отчет по газосчетчикам");
                history.push("/admin/reports?type=gas");
              }}
            >
              <p className="report-types_box__reportTitle">Отчет по газосчетчикам</p>
            </div>
          </>
        ) : (
          <p>Отчетов не найдено</p>
        )}
      </div>
    </div>
  );
};
