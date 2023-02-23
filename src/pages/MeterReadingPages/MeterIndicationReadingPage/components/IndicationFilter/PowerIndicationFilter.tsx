import { useSnackbar } from "notistack";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import React, { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
//material
import { Select, MenuItem } from "@material-ui/core";
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import {
  getDinRailGraphValuesThunk,
  getDinRailReadCurrent,
  getDinRailReadDaily,
  getDinRailReadHourly,
  getDinRailReadMonthly,
  getDinRailTableValuesThunk,
  getGPRSEventsTableValuesThunk,
  getGPRSGraphDataNew,
  getGPRSGraphValuesThunk,
  getGPRSTableDataNew,
  getGPRSTableValuesThunk,
  getMeterConsiderInfoTable,
  getTokenForMeter,
  readGPRSEventsTableValuesThunk,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import {
  setUspdFilter,
  setUspdFilterGroupValue,
  setUspdFilterParameterValue,
  setUspdFilterDateFrom,
  setUspdFilterDateTo,
  setUspdFilterStartHour,
  setUspdFilterFinishHour,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import {
  ReadMeterInfoFilterType,
  ReadMeterConsiderInfoFilterType,
  gprsFilterType,
  dinRailFilterType,
  DateType,
} from "../../../../../ts/types/indication.types";

//andrey temp
import {
  getGPRSReadCurrent,
  getGPRSReadHourly,
  getGPRSReadDaily,
  getGPRSReadMonthly,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import { RootStateOrAny, useSelector } from "react-redux";

const selectMenuProps: any = {
  disableScrollLock: false,
  anchorOrigin: { vertical: 20, horizontal: -13 },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null,
};
interface IFilterProps {
  filterRef?: any;
}

export const PowerIndicationFilter: FC<IFilterProps> = (props) => {
  const { filterRef } = props;

  // hooks
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // location parameters
  const { meterId, bluetoothId, type }: any = queryString.parse(history.location.search.substring(1));

  const { metersId, selectedMeterType, getTableConsiderDataFetching, getTableDataFetching, uspdFilter } =
    useTypedSelector((state) => state.powerIndication);

  const dispatch = useAppDispatch();

  const startDate = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.dateFrom);
  const finishDate = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.dateTo);

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  const groupValue = useTypedSelector((state) => state.powerIndication.uspdFilter.groupValue);
  const parameterValue = useTypedSelector((state) => state.powerIndication.uspdFilter.parameterValue);

  const startHour = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.startHour);
  const finishHour = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.finishHour);
  const handleChangeForGroup = (event: any) => {
    dispatch(setUspdFilterGroupValue(event.target.value));
    if (event.target.value === "CURRENT") {
      dispatch(setUspdFilterDateFrom(null));
      dispatch(setUspdFilterDateTo(null));
    }
  };

  const handleChangeForParameter = (event: any) => dispatch(setUspdFilterParameterValue(event.target.value));

  const getGraphTableData = () => {
    if (startDate === null || finishDate === null) {
      return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
    }
    if (metersId.length === 0 && !meterId) {
      return enqueueSnackbar("Выберите счетчики", { variant: "error" });
    }

    if (selectedMeterType === "uspdMeter") {
      const body: ReadMeterInfoFilterType = {
        from: startDate,
        to: finishDate,
        meterId: !meterId ? metersId : [meterId],
        type: groupValue === "select" ? null : groupValue,
        timeFrom: startHour,
        timeTo: finishHour,
      };

      dispatch(
        setUspdFilter({
          dateFrom: startDate,
          dateTo: finishDate,
          groupValue: groupValue,
          parameterValue: parameterValue,
          startHour: startHour,
          finishHour: finishHour,
        })
      );

      dispatch(getTokenForMeter(body));
    }

    if (selectedMeterType === "gprsMeter") {
      const body2 = {
        meterId: !meterId ? metersId : [meterId],
        from: startDate,
        to: finishDate,
        type: groupValue === "select" ? null : groupValue,
        parameterValue: parameterValue,
      };

      dispatch(getGPRSTableDataNew(body2));
      dispatch(getGPRSGraphDataNew(body2));
    }

    if (selectedMeterType === "dinrail") {
      const body: dinRailFilterType = {
        from: startDate,
        to: finishDate,
        meterId: !meterId ? metersId : [meterId],
        type: groupValue === "select" ? "" : groupValue,
        parameterValue: parameterValue,
        page: 1,
      };
      dispatch(getDinRailTableValuesThunk(body));
      dispatch(getDinRailGraphValuesThunk(body));
    }
  }

  useEffect(() => {
    const groupBy = new URLSearchParams(search).get("groupValue");
    const parameterBy = new URLSearchParams(search).get("parameterValue");
    const dateFrom = new URLSearchParams(search).get("dateFrom");
    const dateTo = new URLSearchParams(search).get("dateTo");

    dispatch(setUspdFilterGroupValue(groupBy));
    dispatch(setUspdFilterParameterValue(parameterBy));

    if (dateFrom) {
      dispatch(setUspdFilterDateFrom(new Date(dateFrom).toISOString()));
    }
    if (dateTo) {
      dispatch(setUspdFilterDateTo(new Date(dateTo).toISOString()));
    }
  }, []);

  return (
    <div
      className="indication-filter"
      ref={filterRef}
      style={
        pathname.includes("/reading/views")
          ? { display: "grid", alignItems: "center", gridTemplateColumns: "70% calc(30% - 20px)", gap: "20px" }
          : {}
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="indication-filter__main-date-block d-flex mb20px">
          <div className="indication-filter__group">
            <div className="indication-filter__title">Группировать</div>

            <Select
              className="indication-filter__select"
              value={groupValue}
              onChange={handleChangeForGroup}
              MenuProps={selectMenuProps}
            >
              <MenuItem value={"DAILY"}>По суткам</MenuItem>
              <MenuItem value={"MONTHLY"}>По месяцам</MenuItem>
              <MenuItem value={"HOURLY"}>По часам</MenuItem>
              <MenuItem value={"CURRENT"}>Мгновенные показания </MenuItem>
            </Select>
          </div>

          <div className="indication-filter__parameters">
            <div className="indication-filter__title">Параметры</div>
            <Select
              className="indication-filter__select"
              value={parameterValue}
              onChange={handleChangeForParameter}
              MenuProps={selectMenuProps}
            >
              <MenuItem value={"ALL"}>Все</MenuItem>
              <MenuItem value={"POSITIVE_ACTIVE_ENERGY"}>Активная энергия +</MenuItem>
              <MenuItem value={"REVERSE_ACTIVE_ENERGY"}>Активная энергия -</MenuItem>
              <MenuItem value={"POSITIVE_REACTIVE_ENERGY"}>Реактивная энергия +</MenuItem>
              <MenuItem value={"REVERSE_REACTIVE_ENERGY"}>Реактивная энергия -</MenuItem>
              <MenuItem value={"AMPERAGE"}>Ток</MenuItem>
              <MenuItem value={"VOLTAGE"}>Напряжение</MenuItem>
              <MenuItem value={"POWER"}>Мощность по фазам</MenuItem>
            </Select>
          </div>
        </div>

        <div className="indication-filter__margin-right mb20px " style={{ width: "100%" }}>
          <div className="indication-filter__calendar">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <div style={{ display: "flex" }}>
                <div>
                  <div className="indication-filter__title">Период</div>
                  <KeyboardDatePicker
                    style={{ width: "100%" }}
                    open={openFirstCalendar}
                    disableToolbar
                    disabled={groupValue === "CURRENT" ? true : false}
                    variant="inline"
                    format="dd/MM/yyyy"
                    placeholder="ДД/ММ/ГГГГ"
                    value={startDate}
                    onClick={() => groupValue !== "CURRENT" && setOpenFirstCalendar(true)}
                    onClose={() => setOpenFirstCalendar(false)}
                    onChange={(date: MaterialUiPickersDate) => dispatch(setUspdFilterDateFrom(date))}
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
                          startDate?.setHours(+e.target.value.split(":")[0]);
                          startDate?.setMinutes(+e.target.value.split(":")[1]);
                          dispatch(setUspdFilterStartHour(e.target.value));
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
                    style={{ width: "100%" }}
                    disabled={groupValue === "CURRENT" ? true : false}
                    open={openSecondCalendar}
                    onClick={() => groupValue !== "CURRENT" && setOpenSecondCalendar(true)}
                    onClose={() => setOpenSecondCalendar(false)}
                    onChange={(date: MaterialUiPickersDate) => dispatch(setUspdFilterDateTo(date))}
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
                          finishDate?.setHours(+e.target.value.split(":")[0]);
                          finishDate?.setMinutes(+e.target.value.split(":")[1]);
                          dispatch(setUspdFilterFinishHour(e.target.value));
                          dispatch(setUspdFilterDateTo(finishDate));
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
      </div>

      <div className="indication-filter__btns-block">
        <button
          style={{ width: "100%" }}
          className={
            groupValue === "CURRENT" ? "btns-block__see-btn btns-block__count-btn--disabled" : "btns-block__see-btn"
          }
          disabled={getTableDataFetching || getTableConsiderDataFetching || groupValue === "CURRENT"}
          onClick={getGraphTableData}
        >
          {!getTableDataFetching && <span>Посмотреть</span>}
          {getTableDataFetching && <Spinner animation="border" size="sm" />}
          <div className="mr12px" />
        </button>

        <button
          className={
            getTableConsiderDataFetching
              ? "btns-block__count-btn btns-block__count-btn--disabled"
              : "btns-block__count-btn"
          }
          disabled={getTableConsiderDataFetching}
          onClick={() => {
            // PERIOD CHECK
            if (groupValue !== "CURRENT" && (startDate === null || finishDate === null)) {
              return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
            }

            // METERS CHECK
            if (metersId.length === 0 && !meterId) {
              return enqueueSnackbar("Выберите счетчики", { variant: "error" });
            }

            // USPD TYPE
            if (selectedMeterType === "uspdMeter") {
              const body: ReadMeterConsiderInfoFilterType = {
                dateFrom: startDate,
                dateTo: finishDate,
                id: !meterId ? metersId : [meterId],
                type: groupValue === "select" ? null : groupValue,
                timeFrom: startHour,
                timeTo: finishHour,
              };

              dispatch(
                setUspdFilter({
                  dateFrom: startDate,
                  dateTo: finishDate,
                  groupValue: groupValue,
                  parameterValue: parameterValue,
                  startHour: startHour,
                  finishHour: finishHour,
                })
              );
              dispatch(getMeterConsiderInfoTable(body));
            }

            // GPRS TYPE
            if (selectedMeterType === "gprsMeter") {
              const body = {
                dateFrom: startDate,
                dateTo: finishDate,
                id: !meterId ? metersId : [meterId],
                type: groupValue,
                parameterValue: parameterValue,
                timeFrom: startHour,
                timeTo: finishHour,
              };

              dispatch(setUspdFilterGroupValue(groupValue));
              history.push(
                `/admin/reading/power-meter/gprs/consider?meterId=${body.id[0]}&groupValue=${body.type}&parameterValue=${body.parameterValue}&dateFrom=${body.dateFrom}&dateTo=${body.dateTo}`
              );
              // if(!search.includes('powerMetersPage')) {
              //   dispatch(readGPRSEventsTableValuesThunk(!meterId ? metersId : [meterId]));
              // }
              if (groupValue === "CURRENT") dispatch(getGPRSReadCurrent(body));
              if (groupValue === "HOURLY") dispatch(getGPRSReadHourly(body));
              if (groupValue === "DAILY") dispatch(getGPRSReadDaily(body));
              if (groupValue === "MONTHLY") dispatch(getGPRSReadMonthly(body));
            }

            // DIN-RAIL TYPE
            if (selectedMeterType === "dinrail") {
              const body = {
                dateFrom: startDate,
                dateTo: finishDate,
                meterId: !meterId ? metersId : [meterId],
                type: groupValue,
                parameterValue: parameterValue,
                timeFrom: startHour,
                timeTo: finishHour,
              };

              dispatch(setUspdFilterGroupValue(groupValue));
              history.push(
                `/admin/reading/power-meter/dinrail/consider?meterId=${body.meterId[0]}&groupValue=${body.type}&parameterValue=${body.parameterValue}&dateFrom=${body.dateFrom}&dateTo=${body.dateTo}`
              );

              if (groupValue === "CURRENT") dispatch(getDinRailReadCurrent(body));
              if (groupValue === "HOURLY") dispatch(getDinRailReadHourly(body));
              if (groupValue === "DAILY") dispatch(getDinRailReadDaily(body));
              if (groupValue === "MONTHLY") dispatch(getDinRailReadMonthly(body));
            }
          }}
        >
          {!getTableConsiderDataFetching && <span>Считать показания</span>}
          {getTableConsiderDataFetching && <Spinner animation="border" size="sm" />}
        </button>
      </div>
    </div>
  );
};
