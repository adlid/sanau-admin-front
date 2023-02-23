import { FC } from "react";
import { Form } from "react-bootstrap";
import { useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { useFormik } from "formik";
import * as yup from "yup";

export const InfoPage: FC = () => {
  const { otanDetailValues } = useTypedSelector((state) => state.powerMeterOtanMeter);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      serialNumber: otanDetailValues?.serialNumber || "",
      dateReleased: otanDetailValues?.dateReleased || "",
      typeOfMeter: otanDetailValues?.typeOfMeter || "",
      programVersion: otanDetailValues?.programVersion || "",
      transferNumber: otanDetailValues?.transferNumber || "",
    },
    onSubmit: async (values: any) => {},
  });

  return (
    <div className="gprs2-info">
      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Серийный номер</Form.Label>
        <Form.Control
          disabled
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
        )}
      </Form.Group>
      <div className="mb20px"></div>

      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Тип счетчика</Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder=""
          name="typeOfMeter"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.typeOfMeter}
          isInvalid={!!formik.errors.typeOfMeter && !!formik.touched.typeOfMeter}
        />
        {formik.touched.typeOfMeter && formik.errors.typeOfMeter && (
          <Form.Control.Feedback type="invalid">{formik.errors.typeOfMeter}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>

      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Дата выпуска</Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder=""
          name="dateReleased"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateReleased}
          isInvalid={!!formik.errors.dateReleased && !!formik.touched.dateReleased}
        />
        {formik.touched.dateReleased && formik.errors.dateReleased && (
          <Form.Control.Feedback type="invalid">{formik.errors.dateReleased}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>

      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Версия прошивки</Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder=""
          name="programVersion"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.programVersion}
          isInvalid={!!formik.errors.programVersion && !!formik.touched.programVersion}
        />
        {formik.touched.programVersion && formik.errors.programVersion && (
          <Form.Control.Feedback type="invalid">{formik.errors.programVersion}</Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mb20px"></div>

      <Form.Group className="operator-character__form-item">
        <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>
          Предаточное число прибора учета, imp/kWh
        </Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder=""
          name="transferNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.transferNumber}
          isInvalid={!!formik.errors.transferNumber && !!formik.touched.transferNumber}
        />
        {formik.touched.transferNumber && formik.errors.transferNumber && (
          <Form.Control.Feedback type="invalid">{formik.errors.transferNumber}</Form.Control.Feedback>
        )}
      </Form.Group>
    </div>
  );
};
