import { useSnackbar } from "notistack";
import { Spinner } from "react-bootstrap";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useState } from "react";
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
  sendRequestLorabanConsider,
  requestAnswerLorabanHourly,
  requestAnswerLorabanHourlyGraph,
  getAnswerLorawanDailyConsiderDataThunk,
  requestLoravanReadDataThunk,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";
import {
  toggleGetTableConsiderDataFetching,
  setLorawanFilter,
  resetLorawanHourlyData,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

const selectMenuProps: any = {
  disableScrollLock: false,
  anchorOrigin: { vertical: 20, horizontal: -13 },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null,
};
interface IFilterProps {
  filterRef?: any;
}

export const PowerIndicationFilterLora: FC<IFilterProps> = (props) => {
  const { filterRef } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { lorawanId }: any = queryString.parse(history.location.search.substring(1));

  const { metersId, getTableConsiderDataFetching, lorawanFilter } = useTypedSelector((state) => state.powerIndication);

  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(lorawanFilter.dateFrom);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(lorawanFilter.dateTo);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);
  const [groupValue, setGroupValue] = useState<string>(lorawanFilter.groupValue);
  const [parameterValue, setParameterValue] = useState(lorawanFilter.parameterValue);
  const [startHour, setStartHour] = useState(lorawanFilter.startHour);
  const [finishHour, setFinishHour] = useState(lorawanFilter.finishHour);

  const handleChangeForGroup = (event: any) => {
    setGroupValue(event.target.value);
    if (event.target.value === "CURRENT") {
      setStartDate(null);
      setFinishDate(null);
    }
  };

  const handleChangeForParameter = (event: any) => setParameterValue(event.target.value);

  const onShowBtnClick = () => {
    console.log("TEST");
    console.log(groupValue)
    console.log("TEST");


    if (groupValue !== "CURRENT" && (startDate === null || finishDate === null)) {
      return enqueueSnackbar("?????????? ?????????????? ????????????", { variant: "error" });
    }
    if (metersId.length === 0 && !lorawanId) {
      return enqueueSnackbar("???????????????? ????????????????", { variant: "error" });
    }

    if (groupValue !== "CURRENT") {

      const body = {
        id: !lorawanId ? metersId : lorawanId.split(","),
        type: parameterValue,
        startDate: startDate,
        endDate: finishDate,
        startTime: startHour.length === 0 ? "00:00" : startHour,
        endTime: finishHour.length === 0 ? "00:00" : finishHour,
        format: groupValue,
        page: 1,
      };
      dispatch(requestAnswerLorabanHourly(body));
      dispatch(requestAnswerLorabanHourlyGraph(body));
    }

    dispatch(toggleGetTableConsiderDataFetching(true));
    dispatch(
      setLorawanFilter({
        dateFrom: startDate,
        dateTo: finishDate,
        groupValue: groupValue,
        parameterValue: parameterValue,
        startHour: startHour,
        finishHour: finishHour,
      })
    );
  };

  const onReadDataBtnClick = () => {
    if (groupValue !== "CURRENT" && (startDate === null || finishDate === null)) {
      return enqueueSnackbar("?????????? ?????????????? ????????????", { variant: "error" });
    }
    if (metersId.length === 0 && !lorawanId) {
      return enqueueSnackbar("???????????????? ????????????????", { variant: "error" });
    }
    if (groupValue === "CURRENT") {
      const body = {
        id: !lorawanId ? metersId[0] : lorawanId,
        type: parameterValue,
      };
      dispatch(sendRequestLorabanConsider(body));
      dispatch(resetLorawanHourlyData());
    }

    if (groupValue !== "CURRENT") {
      const body = {
        id: !lorawanId ? metersId : lorawanId.split(","),
        type: parameterValue,
        startDate: startDate,
        endDate: finishDate,
        startTime: startHour.length === 0 ? "00:00" : startHour,
        endTime: finishHour.length === 0 ? "00:00" : finishHour,
        format: groupValue,
        page: 1,
      };
      console.log(body.type)
      dispatch(requestLoravanReadDataThunk(body));
    }

    dispatch(toggleGetTableConsiderDataFetching(true));
    dispatch(
      setLorawanFilter({
        dateFrom: startDate,
        dateTo: finishDate,
        groupValue: groupValue,
        parameterValue: parameterValue,
        startHour: startHour,
        finishHour: finishHour,
      })
    );
  };

  return (
    <div className="indication-filter d-flex justify-content-between align-items-center flex-wrap" ref={filterRef}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="indication-filter__group">
            <div className="indication-filter__title">????????????????????????</div>
            <Select
              className="indication-filter__select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={groupValue}
              onChange={handleChangeForGroup}
              MenuProps={selectMenuProps}
            >
              <MenuItem value={"DAILY"}>???? ????????????</MenuItem>
              <MenuItem value={"MONTHLy"}>???? ??????????????</MenuItem>
              <MenuItem value={"HOURLY"}>???? ??????????</MenuItem>
              <MenuItem value={"CURRENT"}>???????????????????? ?????????????????? </MenuItem>
            </Select>
          </div>

          <div className="indication-filter__parameters">
            <div className="indication-filter__title">??????????????????</div>

            {groupValue === "CURRENT" && (
              <Select
                className="indication-filter__select"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parameterValue}
                onChange={handleChangeForParameter}
                MenuProps={selectMenuProps}
              >
                <MenuItem value={"activeEnergyPlus"}>???????????????? ??????????????, ??+</MenuItem>
                <MenuItem value={"activeEnergyMinus"}>???????????????? ??????????????, ??-</MenuItem>
                <MenuItem value={"reactiveEnergyPlus"}>???????????????????? ??????????????, R+</MenuItem>
                <MenuItem value={"reactiveEnergyMinus"}>???????????????????? ??????????????, R-</MenuItem>
                <MenuItem value={"voltageByPhase"}>????????????????????</MenuItem>
                <MenuItem value={"amperageByPhase"}>??????</MenuItem>
                <MenuItem value={"totalActivePower"}>????????????????, ?????????? ???????????????? </MenuItem>
                <MenuItem value={"totalReactivePower"}>????????????????, ?????????? ????????????????????</MenuItem>
                <MenuItem value={"totalPower"}>????????????????, ??????????</MenuItem>
              </Select>
            )}

            {groupValue !== "CURRENT" && (
              <Select
                className="indication-filter__select"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parameterValue}
                onChange={handleChangeForParameter}
                MenuProps={selectMenuProps}
              >
                <MenuItem value={"ALL"}>??????</MenuItem>
                <MenuItem value={"POSITIVE_ACTIVE_ENERGY"}>???????????????? ?????????????? +</MenuItem>
                <MenuItem value={"REVERSE_ACTIVE_ENERGY"}>???????????????? ?????????????? -</MenuItem>
                <MenuItem value={"POSITIVE_REACTIVE_ENERGY"}>???????????????????? ?????????????? +</MenuItem>
                <MenuItem value={"REVERSE_REACTIVE_ENERGY"}>???????????????????? ?????????????? -</MenuItem>
                <MenuItem value={"AMPERAGE"}>??????</MenuItem>
                <MenuItem value={"VOLTAGE"}>????????????????????</MenuItem>
                <MenuItem value={"POWER"}>???????????????? ???? ??????????</MenuItem>
                {/* <MenuItem value={"all"}>??????</MenuItem>
                <MenuItem value={"activeEnergyTotal"}>????????????????, ?????????? </MenuItem>
                <MenuItem value={"reactiveEnergyTotal"}>????????????????????,??????????</MenuItem>
                <MenuItem value={"voltageTotal"}>???????????????????? </MenuItem>
                <MenuItem value={"amperageTotal"}>?????? </MenuItem>
                <MenuItem value={"powerTotal"}>????????????????, ??????????</MenuItem>
                <MenuItem value={"cos"}>??????????????</MenuItem> */}
              </Select>
            )}
          </div>
        </div>

        <div>
          <div className="indication-filter__title">????????????</div>
          <div className="indication-filter__margin-right mb20px " style={{ width: "100%" }}>
            <div className="indication-filter__calendar">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <div className="d-flex align-items-start" style={{ width: "100%" }}>
                  <div>
                    <KeyboardDatePicker
                      style={{ width: "100%" }}
                      open={openFirstCalendar}
                      disableToolbar
                      disabled={groupValue === "CURRENT" ? true : false}
                      variant="inline"
                      format="dd/MM/yyyy"
                      placeholder="????/????/????????"
                      value={startDate}
                      onClick={() => groupValue !== "CURRENT" && setOpenFirstCalendar(true)}
                      onClose={() => setOpenFirstCalendar(false)}
                      onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
                      KeyboardButtonProps={{ "aria-label": "change date" }}
                      keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                    />
                  </div>

                  {groupValue === "hourly" && (
                    <>
                      <div className="mr12px" />
                      <div className="input-blocks__item input-blocks__time">
                        <input
                          name="zeroTime"
                          style={{ width: "100%", height: "40px" }}
                          onChange={(e) => setStartHour(e.target.value)}
                          type="time"
                          value={startHour}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="indication-filter__border" />
                <div className="d-flex align-items-center" style={{ width: "100%" }}>
                  <KeyboardDatePicker
                    style={{ width: "100%" }}
                    disabled={groupValue === "CURRENT" ? true : false}
                    open={openSecondCalendar}
                    onClick={() => groupValue !== "CURRENT" && setOpenSecondCalendar(true)}
                    onClose={() => setOpenSecondCalendar(false)}
                    onChange={(date: MaterialUiPickersDate) => setFinishDate(date)}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    placeholder="????/????/????????"
                    value={finishDate}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                    keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                    helperText={null}
                  />

                  {groupValue === "hourly" && (
                    <>
                      <div className="mr12px" />
                      <div className="input-blocks__item input-blocks__time">
                        <input
                          style={{ width: "100%", height: "40px" }}
                          name="zeroTime"
                          onChange={(e) => setFinishHour(e.target.value)}
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
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", gap: "20px" }}>
        <button
          disabled={groupValue === 'CURRENT' || getTableConsiderDataFetching}
          className="btns-block__see-btn"
          onClick={onShowBtnClick}
          style={{ width: "100%" }}
        >
          {getTableConsiderDataFetching ? <Spinner animation="border" size="sm" /> : <span>????????????????</span>}
        </button>
        <button className="btns-block__count-btn" onClick={onReadDataBtnClick} disabled={getTableConsiderDataFetching}>
          {getTableConsiderDataFetching ? <Spinner animation="border" size="sm" /> : <span>?????????????? ??????????????????</span>}
        </button>
      </div>
    </div>
  );
};
