import { FC } from "react";
import { Form, Row, Col } from "react-bootstrap";

import { CustomRadio } from "../../../../../components/uiKit/Inputs/CustomRadio/";

type PropsType = {
  formik: any;
  radioValue: string;
  toggleRadioValue: (value: string) => void;
};

export const ConcentratorInterface: FC<PropsType> = ({
  formik,
  radioValue,
  toggleRadioValue,
}) => {
  return (
    <div className="concentrator-interface">
      <div className="concentrator-character__wrap">
        <h4 className="concentrator-character__title">
          Ip-адрес концентратора
        </h4>

        <Row>
          <Col xl="3">
            <CustomRadio
              onClick={() => {
                toggleRadioValue("GPRS");
                formik.setFieldValue("mode", "GPRS")
                formik.setFieldValue("ethernetIp", "")
                formik.setFieldValue("ethernetMask", "")
                formik.setFieldValue("ethernetGateway", "")
              }}
              title="GPRS"
              value="GPRS"
              selectedRadioValue={radioValue}
            />
          </Col>

          <Col xl="3">
            <CustomRadio
              onClick={() => {
                toggleRadioValue("Ethernet");
                formik.setFieldValue("mode", "Ethernet")
              }}
              title="Ethernet"
              value="Ethernet"
              selectedRadioValue={radioValue}
            />
          </Col>
        </Row>
      </div>

      {radioValue === "Ethernet" && (
        <div className="concentrator-character__wrap">
          <h4 className="concentrator-character__title">
            Ip-адрес концентратора
          </h4>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Ip-адрес:</Form.Label>
            <Form.Control
              type="text"
              name="ethernetIp"
              placeholder="ХХХХ"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ethernetIp}
              isInvalid={
                !!formik.errors.ethernetIp && !!formik.touched.ethernetIp
              }
            />
            {formik.touched.ethernetIp && formik.errors.ethernetIp && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.ethernetIp}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mb8px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Маска подсети:</Form.Label>
            <Form.Control
              type="text"
              name="ethernetMask"
              placeholder="XXX.XXX.XXX.XXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ethernetMask}
              isInvalid={
                !!formik.errors.ethernetMask && !!formik.touched.ethernetMask
              }
            />
            {formik.touched.ethernetMask && formik.errors.ethernetMask && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.ethernetMask}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mb8px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Основной шлюз:</Form.Label>
            <Form.Control
              type="text"
              name="ethernetGateway"
              placeholder="XXX.XXX.XXX.XXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ethernetGateway}
              isInvalid={
                !!formik.errors.ethernetGateway &&
                !!formik.touched.ethernetGateway
              }
            />
            {formik.touched.ethernetGateway &&
              formik.errors.ethernetGateway && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ethernetGateway}
                </Form.Control.Feedback>
              )}
          </Form.Group>
        </div>
      )}
    </div>
  );
};
