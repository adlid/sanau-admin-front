import { FC, useState } from "react";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import moment from "moment";

//redux
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../../../../utils/hooks/reduxHooks";

import { isFetchingModalAC } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { icons } from "../../../../../../../utils/icons/icons";
import { changeConcentratorTimeDate } from "../../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

type PropsType = {
  toggleChangeConcentrator: (bool: boolean) => void;
};

export const ChangeTimeConcentratorPopup: FC<PropsType> = ({
  toggleChangeConcentrator,
}) => {
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] =
    useState<MaterialUiPickersDate | null>(null);
  const [time, setTime] = useState("");

  const dispatch = useAppDispatch();

  const { selectedConcentrator, isFetchingModal } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  return (
    <div className="delete-concentrator-popup__wrap changeTimeConcentratorPopup">
      <div className="delete-concentrator-popup__header delete-concentrator-popup__header--reset">
        Изменить дату и время
        <svg
          className="delete-concentrator-popup__icon"
          onClick={() => toggleChangeConcentrator(false)}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="changeTimeConcentratorPopup__wrap d-flex justify-content-between">
        <div className="changeTimeConcentratorPopup__item">
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
              keyboardIcon={
                <img
                  className="calendar-icon"
                  src={icons.calendarIcon}
                  alt="iconCalendar"
                />
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="changeTimeConcentratorPopup__item">
          <div className="input-blocks__item input-blocks__time">
            <input
              name="zeroTime"
              onChange={(e) => setTime(e.target.value)}
              type="time"
              value={time}
            />
          </div>
        </div>
      </div>

      <div className="changeTimeConcentratorPopup__footer d-flex justify-content-end">
        <div className="d-flex">
          <MainButton
            title="Отмена"
            isSecondary
            style={{ width: 86, height: 40, fontSize: 16 }}
            onClick={() => toggleChangeConcentrator(false)}
          />
          <div className="mr8px"></div>
          <MainButton
            title="Изменить"
            fetching={isFetchingModal}
            style={{ width: 150, height: 40, fontSize: 16 }}
            onClick={() => {
              if (selectedConcentrator !== null) {
                dispatch(isFetchingModalAC(true));
                dispatch(
                  changeConcentratorTimeDate({
                    id: selectedConcentrator.id,
                    localTime: time,
                    localDate: moment(startDate).format("YYYY-MM-DD")
                  })
                );
              }
            }}
          />
        </div>
      </div>
    </div> 
  );
};
