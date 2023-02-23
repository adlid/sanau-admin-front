import { FC, useState, useEffect } from "react";

import { Spinner } from "react-bootstrap";
import { useSnackbar } from "notistack";
import moment from "moment";
//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";

//material
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

//redux
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import { getBluetoothMetersToken } from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

import {
  toggleGetTableDataFetching,
  setBluetoothFilter,
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";
import { BluetoothBodyType } from "../../../../../ts/types/indication.types";

import * as queryString from "querystring";
import { useHistory } from "react-router-dom";

interface IFilterProps {
  filterRef?: any;
}

export const PowerIndicationFilterBluetooth: FC<IFilterProps> = (props) => {
  const { filterRef } = props;

  // hooks
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const { meterId, bluetoothId }: any = queryString.parse(history.location.search.substring(1));

  const { metersId, getTableDataFetching, bluetoothFilter } = useTypedSelector((state) => state.powerIndication);

  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(bluetoothFilter.dateFrom);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(bluetoothFilter.dateTo);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  return (
    <div className="indication-filter" ref={filterRef}>
      <div className="indication-filter__title">Период</div>

      <div className="d-flex justify-content-between ">
        <div className="indication-filter__margin-right mb20px " style={{ width: "100%" }}>
          <div className="indication-filter__calendar">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <div className="d-flex align-items-start">
                <div>
                  <KeyboardDatePicker
                    style={{ width: "180px" }}
                    open={openFirstCalendar}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    placeholder="ДД/ММ/ГГГГ"
                    value={startDate}
                    onClick={() => {
                      setOpenFirstCalendar(true);
                    }}
                    onClose={() => setOpenFirstCalendar(false)}
                    onChange={(date: MaterialUiPickersDate) => {
                      setStartDate(date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                  />
                </div>
              </div>

              <div className="indication-filter__border" />
              <div className="d-flex align-items-center">
                <KeyboardDatePicker
                  style={{ width: "180px" }}
                  open={openSecondCalendar}
                  onClick={() => setOpenSecondCalendar(true)}
                  onClose={() => setOpenSecondCalendar(false)}
                  onChange={(date: MaterialUiPickersDate) => {
                    setFinishDate(date);
                  }}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  placeholder="ДД/ММ/ГГГГ"
                  value={finishDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                  helperText={null}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-row indication-filter__btns-block">
          <button
            className="btns-block__see-btn"
            onClick={() => {
              if (startDate === null || finishDate === null) {
                return enqueueSnackbar("Нужно выбрать период", {
                  variant: "error",
                });
              }
              if (metersId.length === 0 && !meterId && !bluetoothId) {
                return enqueueSnackbar("Выберите счетчики", { variant: "error" });
              }

              const body: BluetoothBodyType = {
                lastFixFrom: moment(startDate).format().split("+")[0],
                lastFixTo: moment(finishDate).format().split("+")[0],
                id: !bluetoothId ? metersId : [bluetoothId],
                role: "ROLE_OPERATOR",
              };

              dispatch(toggleGetTableDataFetching(true));
              dispatch(getBluetoothMetersToken(body));

              dispatch(
                setBluetoothFilter({
                  dateFrom: startDate,
                  dateTo: finishDate,
                })
              );
            }}
          >
            {!getTableDataFetching && <span>Посмотреть</span>}
            {getTableDataFetching && <Spinner animation="border" size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};
