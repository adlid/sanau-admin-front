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
  getGPRSTableEventsDataNew,
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

export const PowerIndicationFilterGPRSEvents: FC<IFilterProps> = (props) => {
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

  const parameterValue = useTypedSelector((state) => state.powerIndication.uspdFilter.parameterValue);

  const startHour = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.startHour);
  const finishHour = useSelector((state: RootStateOrAny) => state.powerIndication.uspdFilter.finishHour);

  const handleChangeForParameter = (event: any) => dispatch(setUspdFilterParameterValue(event.target.value));

  const getGraphTableData = () => {
    if (startDate === null || finishDate === null) {
      return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
    }
    if (metersId.length === 0 && !meterId) {
      return enqueueSnackbar("Выберите счетчики", { variant: "error" });
    }

    console.log(selectedMeterType);
    
    if (selectedMeterType === "gprsMeter") {
      const body2 = {
        meterId: !meterId ? metersId : [meterId],
        from: startDate,
        to: finishDate,
        type: parameterValue,
      };

      // dispatch(getGPRSTableEventsDataNew(body2));
      dispatch(getGPRSEventsTableValuesThunk(body2))
      // dispatch(getGPRSGraphDataNew(body2));
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
          {/* <div className="indication-filter__group">
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
          </div> */}

          <div className="indication-filter__parameters">
            <div className="indication-filter__title">Параметры</div>
            <Select
              className="indication-filter__select"
              value={parameterValue}
              onChange={handleChangeForParameter}
              MenuProps={selectMenuProps}
            >
              <MenuItem value={"ALL"}>Все</MenuItem>
              <MenuItem value={"MAGNETIC_ATTACK"}>Магнитное воздействие</MenuItem>
              <MenuItem value={"MODULE_COVER"}>Вскрытие кожуха</MenuItem>
              <MenuItem value={"OVERVOLTAGE"}>Перенапряжения</MenuItem>
              <MenuItem value={"TAIL_COVER"}>Клемная крышка</MenuItem>
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
                    // disabled={groupValue === "CURRENT" ? true : false}
                    variant="inline"
                    format="dd/MM/yyyy"
                    placeholder="ДД/ММ/ГГГГ"
                    value={startDate}
                    onClick={() => setOpenFirstCalendar(true)}
                    onClose={() => setOpenFirstCalendar(false)}
                    onChange={(date: MaterialUiPickersDate) => dispatch(setUspdFilterDateFrom(date))}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                    keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div style={{ display: "flex", alignItems: "center", marginTop: "22px" }}>
                  <div className="indication-filter__border" />
                  <KeyboardDatePicker
                    style={{ width: "100%" }}
                    open={openSecondCalendar}
                    onClick={() => setOpenSecondCalendar(true)}
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

              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>

      <div className="indication-filter__btns-block">
        <button
          style={{ width: "100%" }}
          className={"btns-block__see-btn"}
          disabled={getTableDataFetching || getTableConsiderDataFetching}
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
            console.log("TEST");
          }}
        >
          {!getTableConsiderDataFetching && <span>Считать показания</span>}
          {getTableConsiderDataFetching && <Spinner animation="border" size="sm" />}
        </button>
      </div>
    </div>
  );
};
