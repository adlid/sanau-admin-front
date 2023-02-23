import { useSnackbar } from "notistack";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useState, useEffect } from "react";
//picker
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
//material
import { Select, MenuItem } from "@material-ui/core";
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
// ts
import { GetGasTableDataType } from "../../../../../ts/types/indication.types";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import {
  getGasMeterInfoGraph,
  getGasMeterInfoTable,
} from "../../../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";
import { gasIndicationAPI } from "../../../../../api/indication.api";

interface IFilterProps {
  gasFilterRef?: any;
}

export const GasIndicationFilter: FC<IFilterProps> = (props) => {
  const { gasFilterRef } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // MAIN DATA
  const { metersId, getTableDataFetching } = useTypedSelector((state) => state.gasIndication);
  const { meterId, from, to, timeFrom, timeTo, groupBy }: any = queryString.parse(history.location.search.substring(1));

  // STATE HANDLERS
  const [readLoading, setReadLoading] = useState(false);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  // DATES HANDLERS
  const [startHour, setStartHour] = useState<string>("00:00");
  const [finishHour, setFinishHour] = useState<string>("23:59");
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);

  // FILTER HANDLERS
  const [groupValue, setGroupValue] = useState<string>("DAILY");
  const handleChangeForGroup = (event: any) => setGroupValue(event.target.value);

  const getFilteredData = async () => {
    if (startDate === null || finishDate === null) {
      return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
    }

    if (!meterId && metersId.length === 0) {
      return enqueueSnackbar("Выберите счетчики", { variant: "error" });
    }

    const body: GetGasTableDataType = {
      dateFrom: startDate,
      dateTo: finishDate,
      timeFrom: groupValue === "HOURLY" ? startHour : "",
      timeTo: groupValue === "HOURLY" ? finishHour : "",
      meterId: !meterId ? metersId : JSON.parse(meterId),
      type: groupValue,
      page: 1,
    };

    dispatch(getGasMeterInfoTable(body));
    dispatch(getGasMeterInfoGraph(body));
  };

  const readData = async () => {
    if (startDate === null || finishDate === null) {
      return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
    }

    if (!meterId && metersId.length === 0) {
      return enqueueSnackbar("Выберите счетчики", { variant: "error" });
    }

    setReadLoading(true);

    const body: GetGasTableDataType = {
      dateFrom: startDate,
      dateTo: finishDate,
      timeFrom: groupValue === "HOURLY" ? startHour : "",
      timeTo: groupValue === "HOURLY" ? finishHour : "",
      meterId: metersId,
      type: groupValue,
    };

    try {
      await gasIndicationAPI.readMetersTableData(body);
      enqueueSnackbar("Запрос на считывание данных отправлен, среднее время ожидания 10 минут", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    } finally {
      setReadLoading(false);
    }
  };

  useEffect(() => {
    setStartHour(timeFrom || "00:00");
    setFinishHour(timeTo || "23:59");
    setStartDate(from || null);
    setFinishDate(to || null);
  }, [from, to, timeFrom, timeTo]);

  useEffect(() => {
    if (groupBy) {
      setGroupValue(groupBy)
    }
  }, [groupBy])

  return (
    <div className="indication-filter align-items-center" ref={gasFilterRef} style={{ width: "100%", display: "flex" }}>
      <div
        className="indication-filter__content-block width83"
        ref={gasFilterRef}
        style={{ display: "grid", gap: "12px", gridTemplateColumns: "0.5fr 1fr 120px 120px", width: "100%" }}
      >
        <div className="indication-filter__parameters" style={{ width: "100%" }}>
          <div className="indication-filter__title">Группировать</div>
          <Select
            className="indication-filter__select"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupValue}
            onChange={handleChangeForGroup}
            MenuProps={{
              disableScrollLock: false,
              anchorOrigin: { vertical: 20, horizontal: -13 },
              transformOrigin: { vertical: "top", horizontal: "left" },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value={"DAILY"}>По суткам</MenuItem>
            <MenuItem value={"HOURLY"}>По часам</MenuItem>
            <MenuItem value={"MONTHLY"}>По месяцам</MenuItem>
          </Select>
        </div>

        <div className="indication-filter__margin-right" style={{ width: "100%" }}>
          <div className="indication-filter__calendar">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <div style={{ display: "flex" }}>
                <div>
                  <div className="indication-filter__title">Период</div>
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
                </div>

                {groupValue === "HOURLY" && (
                  <>
                    <div className="mr12px"></div>
                    <div className="input-blocks__item input-blocks__time">
                      <input
                        name="zeroTime"
                        style={{ width: "100%", height: "40px", marginTop: "24px" }}
                        onChange={(e) => {
                          // startDate?.setHours(+e.target.value.split(":")[0]);
                          // startDate?.setMinutes(+e.target.value.split(":")[1]);
                          setStartHour(e.target.value);
                        }}
                        type="time"
                        value={startHour}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="d-flex align-items-center">
                <div style={{ display: "flex", alignItems: "center", marginTop: "22px" }}>
                  <div className="indication-filter__border" />
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
                </div>

                {groupValue === "HOURLY" && (
                  <>
                    <div className="mr12px"></div>
                    <div className="input-blocks__item input-blocks__time">
                      <input
                        style={{ width: "100%", height: "40px", marginTop: "22px" }}
                        name="zeroTime"
                        onChange={(e) => {
                          // finishDate?.setHours(+e.target.value.split(":")[0]);
                          // finishDate?.setMinutes(+e.target.value.split(":")[1]);
                          setFinishHour(e.target.value);
                        }}
                        type="time"
                        value={finishHour}
                      />
                    </div>
                  </>
                )}
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>

        <button className="btns-block__see-btn" onClick={readData} style={{ alignSelf: "end", background: "#4EB4F9" }}>
          {!readLoading && <span>Считать показания</span>}
          {readLoading && <Spinner animation="border" size="sm" />}
        </button>
        <button className="btns-block__see-btn" onClick={getFilteredData} style={{ alignSelf: "end" }}>
          {!getTableDataFetching && <span>Посмотреть</span>}
          {getTableDataFetching && <Spinner animation="border" size="sm" />}
        </button>
      </div>
    </div>
  );
};
