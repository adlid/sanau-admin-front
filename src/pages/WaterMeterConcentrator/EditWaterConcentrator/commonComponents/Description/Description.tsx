import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { icons } from "../../../../../utils/icons/icons";
import { makeStyles } from "@material-ui/core";

type PropsType = {
  formik: any;
  checkTime: any;
  setCheckTime: any;
};

const useStyle = makeStyles((theme) => ({
  root: {
    height: "27px",
    color: "#B9BEC7",
  },
}));

export const Description: FC<PropsType> = ({ formik, checkTime, setCheckTime }) => {
  const classes = useStyle();

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);

  const handleBlur = (e: any) => setCheckTime(e.target.value);

  return (
    <div className="edit-water-concentrator-description">
      <Form.Group className="concentrator-character__form-item">
        <Form.Label>DevEUI</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="devEUI"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.devEUI}
          isInvalid={!!formik.errors.devEUI && !!formik.touched.devEUI}
          disabled={true}
        />
        {formik.touched.devEUI && formik.errors.devEUI && (
          <Form.Control.Feedback type="invalid">{formik.errors.devEUI}</Form.Control.Feedback>
        )}
        <div className="mb12px" />
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
        )}
        <div className="mb12px" />
        <Form.Label>Серийный номер</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="serial"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.serial}
          isInvalid={!!formik.errors.serial && !!formik.touched.serial}
        />
        {formik.touched.serial && formik.errors.serial && (
          <Form.Control.Feedback type="invalid">{formik.errors.serial}</Form.Control.Feedback>
        )}
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
