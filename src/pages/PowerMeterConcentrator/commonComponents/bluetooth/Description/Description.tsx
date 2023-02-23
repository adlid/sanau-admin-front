import React, { FC } from "react";
import { Form } from "react-bootstrap";

type PropsType = {
  formik: any;
};

export const Description: FC<PropsType> = ({ formik }) => {
  return (
    <div className="bluetooth-connection-description">

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Серийный номер</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="serialNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serialNumber}
            isInvalid={
              !!formik.errors.serialNumber && !!formik.touched.serialNumber
            }
          />
          {formik.touched.serialNumber && formik.errors.serialNumber && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.serialNumber}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>

        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Изготовитель</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="manufacturer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.manufacturer}
            isInvalid={
              !!formik.errors.manufacturer && !!formik.touched.manufacturer
            }
          />
          {formik.touched.manufacturer && formik.errors.manufacturer && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.manufacturer}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Организация, настроившая сбор
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="setUpOrganization"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.setUpOrganization}
            isInvalid={
              !!formik.errors.setUpOrganization && !!formik.touched.setUpOrganization
            }
          />
          {formik.touched.setUpOrganization && formik.errors.setUpOrganization && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.setUpOrganization}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </div>


      <div className="bluetooth-connection-description__wrap">
        <h2 className="bluetooth-connection-description__title">Тип</h2>
        <Form.Group>
          <Form.Check
            type="radio"
            checked={formik.values.type === "ormanSinglePhase" ? true : false}
            label="“ОРМАН” СО-Э711 Т1 Bluetooth 220B 5(60) А (Однофазный)"
            name="type"
            value={"ormanSinglePhase"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type && !!formik.touched.type}
          />
          <Form.Check
            type="radio"
            checked={formik.values.type === "dalaThreePhaseType1" ? true : false}
            label="«ДАЛА» СА4-Э720 Т1 Bluetooth 10(100) А (Трехфазный)"
            name="type"
            value={"dalaThreePhaseType1"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type && !!formik.touched.type}
          />
          <Form.Check
            type="radio"
            checked={formik.values.type === "dalaThreePhaseType2" ? true : false}
            label="«ДАЛА» СА4-Э720 Т1 Bluetooth 5(60) А (Трехфазный)"
            name="type"
            value={"dalaThreePhaseType2"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type && !!formik.touched.type}
          />
        </Form.Group>
      </div>

      <Form.Group className="concentrator-character__form-item">
        <Form.Label>Название для фильтрации</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="filterMeterName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.filterMeterName}
          isInvalid={
            !!formik.errors.filterMeterName && !!formik.touched.filterMeterName
          }
        />
        {formik.touched.filterMeterName && formik.errors.filterMeterName && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.filterMeterName}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="mr16px"></div>
    </div>
  );
};
