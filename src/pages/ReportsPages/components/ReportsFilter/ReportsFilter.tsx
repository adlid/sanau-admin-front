import { MenuItem, Select } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { FC, useState } from "react";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { icons } from "../../../../utils/icons/icons";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
import { Spinner } from "react-bootstrap";

interface IReportsFilter {
  loading: boolean;

  currentReportType: string;
  currentMeterType: string;

  startDate: MaterialUiPickersDate;
  setStartDate: (date: MaterialUiPickersDate) => void;

  finishDate: MaterialUiPickersDate;
  setFinishDate: (date: MaterialUiPickersDate) => void;

  selectedId: Array<any>;
  selectedFolders: Array<string>;
  getReport: () => void;
  resetAll: () => void;

  selectedMetersLorawan: Array<string>;
  selectedMetersTCPIP: Array<string>;
  selectedMetersUSPD: Array<string>;
}

export const ReportsFilter: FC<IReportsFilter> = (props) => {
  const {
    loading,
    selectedId,
    selectedFolders,
    getReport,
    resetAll,
    currentReportType,
    currentMeterType,
    startDate,
    setStartDate,
    finishDate,
    setFinishDate,
    selectedMetersLorawan,
    selectedMetersTCPIP,
    selectedMetersUSPD,
  } = props;

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  return (
    <div className="reports__header">
      <p className="reports__header_title">{currentReportType ? currentReportType : "Отчет не выбран"}</p>
      <div className="reports__header_rightSide">
        <p className="reports__header_calendar_title">Период:</p>
        <div className="reports__header_calendar">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <KeyboardDatePicker
              open={openFirstCalendar}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              placeholder="ДД/ММ/ГГГГ"
              value={startDate}
              onClick={() => setOpenFirstCalendar(true)}
              onClose={() => setOpenFirstCalendar(false)}
              onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
              KeyboardButtonProps={{ "aria-label": "change date" }}
              keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
            />
            <div className="reports__header_border" />
            <KeyboardDatePicker
              open={openSecondCalendar}
              onClick={() => setOpenSecondCalendar(true)}
              onClose={() => setOpenSecondCalendar(false)}
              onChange={(date: MaterialUiPickersDate) => setFinishDate(date)}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              placeholder="ДД/ММ/ГГГГ"
              value={finishDate}
              KeyboardButtonProps={{ "aria-label": "change date" }}
              keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
              helperText={null}
            />
          </MuiPickersUtilsProvider>
          <div className="mr12px" />
          <div>
            <MainButton
              title={loading ? <Spinner animation="border" size="sm" /> : "Сформировать отчет"}
              style={{ width: 179, height: 40, fontSize: 14 }}
              onClick={getReport}
              isDisabled={
                (currentReportType === "Суточный баланс электричества"
                  || currentReportType === "новый отчет 1"
                  || currentReportType === "новый отчет 2"
                  || currentReportType === "новый отчет 3"
                  || currentReportType === "новый отчет 4"
                  || currentReportType === "новый отчет 5"
                  || currentReportType === "новый отчет 6"
                  || currentReportType === "Отчет по газосчетчикам"
                )
                  || (currentReportType === 'Отчёт по водосчетчикам' || currentReportType === 'Баланс воды с разностью')
                  ? selectedMetersUSPD.length === 0 &&
                  selectedMetersTCPIP.length === 0 &&
                  selectedMetersLorawan.length === 0 &&
                  selectedFolders.length === 0
                  : selectedId.length === 0
              }
            />
          </div>
          <div className="mr12px" />
          <div>
            <MainButton title="Сбросить" style={{ width: 100, height: 40, fontSize: 14 }} onClick={resetAll} />
          </div>
        </div>
      </div>
    </div>
  );
};
