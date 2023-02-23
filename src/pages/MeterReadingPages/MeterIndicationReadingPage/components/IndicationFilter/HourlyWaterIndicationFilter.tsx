import React, { FC, useEffect, useState } from "react";

import { Spinner } from "react-bootstrap";
import { useSnackbar } from "notistack";

//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";

//material
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

//redux
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";

import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import {
  getHourlyWaterMeterInfoGraph,
  getHourlyWaterMeterInfoTable,
} from "../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import { waterIndicationAPI } from "../../../../../api/indication.api";

interface PropsType {}

export const HourlyWaterIndicationFilter: FC<PropsType> = (props) => {
  const {} = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { meterId, tokenHourly, token }: any = queryString.parse(history.location.search.substring(1));

  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const filterParameters: any = {
    meterId: [meterId],
    from: startDate,
    to: finishDate,
  };

  const getHourlyData = async () => {
    try {
      if (startDate && finishDate) {
        setFetching(true);
        const response: any = await waterIndicationAPI.getTokenForHourlyMeter(filterParameters);
        history.push({ search: `?page=1&token=${token}&tokenHourly=${response?.data.token}&meterId=${meterId}` });
        setFetching(false);
      } else enqueueSnackbar("Выберите период", { variant: "error" });
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при загрузке данных", { variant: "error" });
    }
  };

  return (
    <div className="indication-filter d-flex align-items-center">
      <div className="indication-filter__margin-right">
        <div className="indication-filter__title">Период</div>
        <div className="indication-filter__calendar">
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
            <div className="dateDivider" />
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
          <div style={{ marginLeft: "12px" }}>
            <button className="btns-block__see-btn" onClick={getHourlyData}>
              {!fetching ? <span>Посмотреть</span> : <Spinner animation="border" size="sm" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
