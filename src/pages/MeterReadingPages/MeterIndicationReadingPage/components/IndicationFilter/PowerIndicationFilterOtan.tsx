import { useSnackbar } from "notistack";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import React, { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
//picker
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
//material
import { Select, MenuItem } from "@material-ui/core";
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import {
  getOtanReadCurrent,
  getOtanReadDaily,
  getOtanReadHourly,
  getOtanReadMonthly,
  getOtanDailyTableValuesThunk,
  getOtanHourlyTableValuesThunk,
  getOtanGraphValuesThunk,
  getOtanReadQuarterly,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import {
  setUspdFilterGroupValue,
  setUspdFilterParameterValue,
  setUspdFilterDateFrom,
  setUspdFilterDateTo,
  setUspdFilterStartHour,
  setUspdFilterFinishHour,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { gprsFilterType } from "../../../../../ts/types/indication.types";

const selectMenuProps: any = {
  disableScrollLock: false,
  anchorOrigin: { vertical: 20, horizontal: -13 },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null,
};
interface IFilterProps {
  filterRef?: any;
}

export const PowerIndicationFilterOtan: FC<IFilterProps> = (props) => {
  const { filterRef } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // location parameters
  const { meterId }: any = queryString.parse(history.location.search.substring(1));

  const { metersId, getTableConsiderDataFetching, getTableDataFetching } = useTypedSelector(
    (state) => state.powerIndication
  );

  // ---- FILTER HANDLERS ---- //
  const startDate = useTypedSelector((state) => state.powerIndication.uspdFilter.dateFrom);
  const finishDate = useTypedSelector((state) => state.powerIndication.uspdFilter.dateTo);

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  const groupValue = useTypedSelector((state) => state.powerIndication.uspdFilter.groupValue);
  const parameterValue = useTypedSelector((state) => state.powerIndication.uspdFilter.parameterValue);

  const startHour = useTypedSelector((state) => state.powerIndication.uspdFilter.startHour);
  const finishHour = useTypedSelector((state) => state.powerIndication.uspdFilter.finishHour);

  const handleChangeForGroup = (event: any) => {
    dispatch(setUspdFilterGroupValue(event.target.value));
    if (event.target.value === "CURRENT") {
      dispatch(setUspdFilterDateFrom(null));
      dispatch(setUspdFilterDateTo(null));
    }
  };

  const handleChangeForParameter = (event: any) => dispatch(setUspdFilterParameterValue(event.target.value));

  useEffect(() => {
    const groupBy = new URLSearchParams(search).get("groupValue");
    const parameterBy = new URLSearchParams(search).get("parameterValue");
    const startDate = new URLSearchParams(search).get("dateFrom");

    dispatch(setUspdFilterGroupValue(groupBy));
    dispatch(setUspdFilterParameterValue(parameterBy));
  }, []);

  useEffect(() => {
    if (
      groupValue !== "CURRENT" &&
      (parameterValue === "CURRENT" || parameterValue === "VOLTAGE" || parameterValue === "TOTAL_POWER")
    ) {
      dispatch(setUspdFilterParameterValue("ALL"));
    }

    if (groupValue === "CURRENT" && parameterValue === "ALL") {
      dispatch(setUspdFilterParameterValue("POSITIVE_ACTIVE_ENERGY"));
    }
  }, [groupValue]);

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
              <MenuItem value={"QUARTERLY"}>По 15 минутам</MenuItem>
              <MenuItem value={"CURRENT"}>Мгновенные показания</MenuItem>
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
              {groupValue !== "CURRENT" && <MenuItem value={"ALL"}>Все</MenuItem>}
              <MenuItem value={"POSITIVE_ACTIVE_ENERGY"}>Активная энергия +</MenuItem>
              <MenuItem value={"NEGATIVE_ACTIVE_ENERGY"}>Активная энергия -</MenuItem>
              <MenuItem value={"POSITIVE_REACTIVE_ENERGY"}>Реактивная энергия +</MenuItem>
              <MenuItem value={"NEGATIVE_REACTIVE_ENERGY"}>Реактивная энергия -</MenuItem>
              {groupValue === "CURRENT" && (
                <>
                  <MenuItem value={"CURRENT"}>Ток</MenuItem>
                  <MenuItem value={"VOLTAGE"}>Напряжение</MenuItem>
                  <MenuItem value={"TOTAL_POWER"}>Мощность по фазам</MenuItem>
                </>
              )}
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

                {(groupValue === "HOURLY" || groupValue === "QUARTERLY") && (
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

                {(groupValue === "HOURLY" || groupValue === "QUARTERLY") && (
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
          disabled={getTableDataFetching || groupValue === "CURRENT"}
          onClick={async () => {
            // PERIOD CHECK
            if (startDate === null || finishDate === null) {
              return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
            }
            // METERS CHECK
            if (metersId.length === 0 && !meterId) {
              return enqueueSnackbar("Выберите счетчики", { variant: "error" });
            }

            const body: gprsFilterType = {
              from: startDate,
              to: finishDate,
              meterId: !meterId ? metersId : [meterId],
              type: groupValue,
              page: 1,
              parameterValue
            };

            groupValue === "DAILY" || groupValue === "MONTHLY"
              ? dispatch(getOtanDailyTableValuesThunk(body))
              : dispatch(getOtanHourlyTableValuesThunk(body));
            dispatch(getOtanGraphValuesThunk(body));
          }}
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

            const body = {
              dateFrom: startDate,
              dateTo: finishDate,
              meterId: !meterId ? metersId : [meterId],
              type: parameterValue,
              timeFrom: startHour,
              timeTo: finishHour,
            };

            dispatch(setUspdFilterGroupValue(groupValue));
            history.push(
              `/admin/reading/power-meter/otan/consider?meterId=${body.meterId[0]}&groupValue=${groupValue}&parameterValue=${parameterValue}&dateFrom=${body.dateFrom}&dateTo=${body.dateTo}`
            );
            if (groupValue === "CURRENT") dispatch(getOtanReadCurrent(body));
            if (groupValue === "QUARTERLY") dispatch(getOtanReadQuarterly(body));
            if (groupValue === "HOURLY") dispatch(getOtanReadHourly(body));
            if (groupValue === "DAILY") dispatch(getOtanReadDaily(body));
            if (groupValue === "MONTHLY") dispatch(getOtanReadMonthly(body));
          }}
        >
          {!getTableConsiderDataFetching && <span>Считать показания</span>}
          {getTableConsiderDataFetching && <Spinner animation="border" size="sm" />}
        </button>
      </div>
    </div>
  );
};
