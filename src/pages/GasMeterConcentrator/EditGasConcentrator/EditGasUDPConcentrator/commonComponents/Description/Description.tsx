import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { icons } from "../../../../../../utils/icons/icons";
import { makeStyles } from "@material-ui/core";

type PropsType = {
  formik: any;
  checkTime: any;
  setCheckTime: any;
};

const useStyle = makeStyles((theme) => ({ root: { height: "27px", color: "#B9BEC7" } }));

export const Description: FC<PropsType> = ({ formik, checkTime, setCheckTime }) => {
  const classes = useStyle();

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);

  return (
    <div className="edit-gas-udp-concentrator-description">
      <Form.Group className="concentrator-character__form-item">
        <Form.Label>Серийный номер</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="barcode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.barcode}
          isInvalid={!!formik.errors.barcode && !!formik.touched.barcode}
          disabled={true}
        />
        {formik.touched.barcode && formik.errors.barcode && (
          <Form.Control.Feedback type="invalid">{formik.errors.barcode}</Form.Control.Feedback>
        )}
        <div className="mb12px" />
        <Form.Label>Наименование</Form.Label>
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
        {/* <div className="mb12px" />
        <Form.Label>Тип</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          isInvalid={!!formik.errors.type && !!formik.touched.type}
        />
        {formik.touched.type && formik.errors.type && (
          <Form.Control.Feedback type="invalid">{formik.errors.type}</Form.Control.Feedback>
        )} */}
        {/* <div className="mb12px" />
        <Form.Label>Серийный номер</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="serialNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.serialNumber}
          isInvalid={!!formik.errors.serialNumber && !!formik.touched.serialNumber}
        />
        {formik.touched.serialNumber && formik.errors.serialNumber && (
          <Form.Control.Feedback type="invalid">{formik.errors.serialNumber}</Form.Control.Feedback>
        )} */}
        <div className="mb12px" />
        <Form.Label>Изготовитель</Form.Label>
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
        <div className="mb12px" />
        <Form.Label>Организация, настроившая сбор</Form.Label>
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
        <div className="mb12px" />
        <Form.Label>Дата поверки</Form.Label>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            style={{ width: "100%" }}
            inputProps={{ className: classes.root }}
            name="checkTime"
            open={openFirstCalendar}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            placeholder="ДД/ММ/ГГГГ"
            value={checkTime}
            onClick={() => setOpenFirstCalendar(true)}
            onClose={() => setOpenFirstCalendar(false)}
            // onBlur={handleBlur}
            onChange={(date: MaterialUiPickersDate) => setCheckTime(date)}
            KeyboardButtonProps={{ "aria-label": "change date" }}
            keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
          />
        </MuiPickersUtilsProvider>
      </Form.Group>
    </div>
  );
};
