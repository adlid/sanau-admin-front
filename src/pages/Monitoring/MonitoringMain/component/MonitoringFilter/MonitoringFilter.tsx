import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Select, MenuItem } from "@material-ui/core";
//picker
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// icons
import { icons } from "../../../../../utils/icons/icons";
// redux
import { getMonitoringToken } from "../../../../../store/slicesAndThunks/monitoring/monitoring.thunk";
import { useTypedSelector, useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import { useSnackbar } from "notistack";
import moment from "moment";

interface IProps {
  filterRef?: any;
}

export const MonitoringFilter: FC<IProps> = (props) => {
  const { filterRef } = props;
  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // data from redux
  const gasMeters = useTypedSelector((state) => state.gasIndication.metersId); // data from redux
  const powerMeters = useTypedSelector((state) => state.powerIndication.metersId); // data from redux
  const waterMeters = useTypedSelector((state) => state.waterIndication.metersId); // data from redux
  const { selectedMeterType } = useTypedSelector((state) => state.powerIndication);

  //  data from url
  const { tabValue }: any = queryString.parse(history.location.search.substring(1));

  const filterType: any = {
    water: { name: "WATER", metersId: waterMeters },
    gas: { name: "GAS", metersId: gasMeters },
    power: { name: "ELECTRIC", metersId: powerMeters },
  };

  // data handlers
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  const [groupValue, setGroupValue] = useState<string>("DAILY");
  const handleChangeForGroup = (event: any) => setGroupValue(event.target.value);

  return (
    <div
      className="indication-filter"
      ref={filterRef}
      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div
        className="indication-filter__content-block width83"
        ref={filterRef}
        style={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 1fr 1fr 120px", width: "100%" }}
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
          </Select>
        </div>

        <div className="indication-filter__main-date-block">
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

        <div />
        <button
          className="btns-block__see-btn"
          style={{ alignSelf: "end" }}
          onClick={() => {
            if (!startDate || !finishDate) {
              enqueueSnackbar("Выберите период!", { variant: "error" });
              return;
            }

            if (!filterType[tabValue].metersId.length) {
              enqueueSnackbar("Выберите счетчики!", { variant: "error" });
              return;
            }

            const body = {
              meterId: filterType[tabValue].metersId,
              from: moment(startDate).endOf("day").toISOString(),
              to: moment(finishDate).endOf("day").toISOString(),
              type: groupValue,
              meterType:
                selectedMeterType === "gprsMeter"
                  ? "ELECTRIC_GPRS"
                  : selectedMeterType === "networkServerMeter"
                  ? "ELECTRIC_LORAWAN"
                  : selectedMeterType === "otan"
                  ? "ELECTRIC_OTAN"
                  : selectedMeterType === "dinRail"
                  ? "DIN_RAIL"
                  : filterType[tabValue].name,
            };

            dispatch(getMonitoringToken(body));
          }}
        >
          <span>Посмотреть</span>
        </button>
      </div>
    </div>
  );
};
