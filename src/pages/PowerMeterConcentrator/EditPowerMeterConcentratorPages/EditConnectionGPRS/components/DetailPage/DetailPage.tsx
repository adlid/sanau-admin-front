import { FC, useState } from "react";
import { Form } from "react-bootstrap";

import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { useFormik } from "formik";
import * as yup from "yup";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { icons } from "../../../../../../utils/icons/icons";
import { changeGPRSdescription } from "../../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton/MainButton";
import { updateMeterNameThunk } from "../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

export const DetailPage: FC = () => {
  const { description } = useTypedSelector((state) => state.powerMeterGPRSMeter.GPRSResponseInitialValues);
  const { GPRSstep1Values, GPRSResponseInitialValues, selectedGprsEditMeterId } = useTypedSelector((state) => state.powerMeterGPRSMeter);

  const dispatch = useAppDispatch();

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null | string>(
    description.verificationDate === "" ? new Date() : ""
  );
  const [startHour, setStartHour] = useState("00:00");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      manufacturer: description.manufacturer,
      setUpOrganization: description.setUpOrganization,
      meterName: description.meterName,
      filterMeterName: ""
    },
    validationSchema: yup.object({
      // name: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      const body1 = {
        id: selectedGprsEditMeterId ?? "",
        type: 'gprs',
        meterName: values.filterMeterName
      }
      await dispatch(updateMeterNameThunk(body1))

      const body = {
        ip: GPRSstep1Values.ip,
        port: +GPRSstep1Values.port,
        deviceId: GPRSstep1Values.deviceId,
        manufacturer: values.manufacturer,
        setUpOrganization: values.setUpOrganization,
        meterName: values.meterName,
        verificationDate: startDate,
        verificationTime: startHour,
      };
      await dispatch(changeGPRSdescription(body));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="gprs2-info">
      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Наименование</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="meterName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.meterName}
          isInvalid={!!formik.errors.meterName && !!formik.touched.meterName}
        />
        {formik.touched.meterName && formik.errors.meterName && (
          <Form.Control.Feedback type="invalid">{formik.errors.meterName}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>
      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Изготовитель</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="manufacturer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.manufacturer}
          isInvalid={!!formik.errors.manufacturer && !!formik.touched.manufacturer}
        />
        {formik.touched.manufacturer && formik.errors.manufacturer && (
          <Form.Control.Feedback type="invalid">{formik.errors.manufacturer}</Form.Control.Feedback>
        )}
      </Form.Group>

      <div className="mb20px"></div>

      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>
          Организация, настроившая сбор
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="setUpOrganization"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.setUpOrganization}
          isInvalid={!!formik.errors.setUpOrganization && !!formik.touched.setUpOrganization}
        />
        {formik.touched.setUpOrganization && formik.errors.setUpOrganization && (
          <Form.Control.Feedback type="invalid">{formik.errors.setUpOrganization}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>
      <Form.Group className="concentrator-character__form-item">
        <Form.Label>Дата поверки</Form.Label>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            open={openFirstCalendar}
            style={{ width: 360 }}
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

      <div className="mb20px"></div>
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
      <div className="mb20px"></div>
      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Название счетчика для фильтрации</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="filterMeterName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.filterMeterName}
          isInvalid={!!formik.errors.filterMeterName && !!formik.touched.filterMeterName}
        />
        {formik.touched.filterMeterName && formik.errors.filterMeterName && (
          <Form.Control.Feedback type="invalid">{formik.errors.filterMeterName}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>
      <div className="gprs2-info__footer">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
      </div>
    </Form>
  );
};
