import * as yup from "yup";
import moment from "moment";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { Form } from "react-bootstrap";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// icons
import { icons } from "../../../../../../utils/icons/icons";
// components
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { changeDinRailAttributes } from "../../../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.thunk";

export const ParamsPage: FC = () => {
  const dispath = useAppDispatch();

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [startHour, setStartHour] = useState("");

  const { dinRailResponseInitialValues } = useTypedSelector((state) => state.powerMeterDinRailMeter);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ip: dinRailResponseInitialValues.ip,
      port: dinRailResponseInitialValues.port,
      deviceId: dinRailResponseInitialValues.deviceId,
      isHead: dinRailResponseInitialValues.isHeadMeter,
      timer: dinRailResponseInitialValues.timer,
      schedule: [],
    },
    validationSchema: yup.object({}),
    onSubmit: async (values: any) => {
      dispath(
        changeDinRailAttributes({
          ...values,
          timer:
            startDate && startHour ? `${moment(startDate).format("YYYY-MM-DD")} ${startHour}:00.000` : values.timer,
        })
      );
    },
  });

  useEffect(() => {
    console.log("startDate", startDate);
    console.log("startHour", startHour);
  }, [startDate, startHour]);

  return (
    <div className="">
      <div className="bluetooth-connection-counterparty__header d-flex align-items-end">
        <Form.Group className="concentrator-character__form-item ">
          <Form.Label>Сетевой адрес</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="deviceId"
            value={formik.values.deviceId}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <div className="mr12px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Порт</Form.Label>
          <Form.Control name="port" value={formik.values.port} onChange={formik.handleChange} />
        </Form.Group>
      </div>

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">Конфигурация счетчика</h4>

        <div className="mb20px"></div>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Головной счетчик"
            name="isHead"
            onChange={formik.handleChange}
            checked={formik.values.isHead}
          />
        </Form.Group>
      </div>

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">Тарифное расписание</h4>
        <div className="mb20px"></div>

        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label style={{ display: "block" }}>Число, день</Form.Label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <KeyboardDatePicker
                style={{ width: "100%" }}
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
            </MuiPickersUtilsProvider>
          </Form.Group>
          <div className="mr12px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Время час</Form.Label>
            <input
              name="zeroTime"
              style={{ width: "100%", height: "40px", border: "1px solid #D7E2F2" }}
              onChange={(e) => setStartHour(e.target.value)}
              type="time"
              value={startHour}
            />
          </Form.Group>
        </div>
      </div>

      <div className="gprs2-info__footer">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
      </div>
    </div>
  );
};
