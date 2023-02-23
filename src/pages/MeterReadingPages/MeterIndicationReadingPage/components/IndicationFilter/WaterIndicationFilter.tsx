import { useSnackbar } from "notistack";
import { Spinner } from "react-bootstrap";
import React, { FC, useState, useEffect } from "react";
//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
//material
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { getTokenForWaterMeter } from "../../../../../store/slicesAndThunks/waterIndication/waterIndication.thunks";
import {
  resetWaterIndicationState,
  toggleGetTableDataFetching,
  toggleSetTableDataNotFetching,
} from "../../../../../store/slicesAndThunks/waterIndication/waterIndication.slices";
// ts
import { ReadWaterMeterInfoFilterType } from "../../../../../ts/types/indication.types";

import * as queryString from "querystring";
import { useHistory } from "react-router-dom";

interface IFilterProps {
  waterFilterRef?: any;
}

export const WaterIndicationFilter: FC<IFilterProps> = (props) => {
  const { waterFilterRef } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // MAIN DATA
  const { metersId, getTableDataFetching } = useTypedSelector((state) => state.waterIndication);
  const { meterId }: any = queryString.parse(history.location.search.substring(1));

  // DATES HANDLERS
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  const getFilteredData = async () => {
    if (startDate === null || finishDate === null) {
      return enqueueSnackbar("Нужно выбрать период", { variant: "error" });
    }
    if (!meterId && metersId.length === 0) {
      return enqueueSnackbar("Выберите счетчики", { variant: "error" });
    }

    const body: ReadWaterMeterInfoFilterType = {
      dateFrom: startDate,
      dateTo: finishDate,
      meterId: !meterId ? metersId : [meterId],
    };

    dispatch(toggleGetTableDataFetching());
    await dispatch(getTokenForWaterMeter(body));
    dispatch(toggleSetTableDataNotFetching());
  };

  useEffect(() => {
    return () => {
      dispatch(resetWaterIndicationState());
    };
  }, []);

  return (
    <div className="indication-filter d-flex align-items-center flex-wrap" ref={waterFilterRef}>
      <div className="indication-filter__content-block">
        <div className="indication-filter__main-date-block" style={{ marginBottom: "24px" }}>
          <div className="d-flex flex-row justify-content-between">
            <div className="indication-filter__date-block d-flex">
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
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "12px" }} />
      <div className="d-flex justify-content-between align-items-center flex-row indication-filter__btns-block">
        <button className="btns-block__see-btn" onClick={getFilteredData}>
          {!getTableDataFetching && <span>Посмотреть</span>}
          {getTableDataFetching && <Spinner animation="border" size="sm" />}
        </button>
        <div className="mr12px" />
      </div>
    </div>
  );
};
