import { FC } from "react"
import { Form } from "react-bootstrap";

import { useTypedSelector } from '../../../../../../../../utils/hooks/reduxHooks';
import { useFormik } from "formik";
import * as yup from "yup";


type PropsType = {

}

export const GPSParamsPopup: FC<PropsType> = () => {

  const { attributes } = useTypedSelector(state => state.powerMeterGPRSMeter.GPRSResponseInitialValues)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      apnName: attributes.apnName, //
      apnPassword: attributes.apnPassword, //
      apnUsername: attributes.apnPassword, //
      domainIp: attributes.domainIp, //
      localIp: attributes.localIp, //
      pingIp: attributes.pingIp, //
    },
    validationSchema: yup.object({

    }),
    onSubmit: async (values: any) => {

    },
  });


  return <div className="gps-params-popup">
    <div className="gps-params-popup__header">
      <h2 className="gps-params-popup__title">
        Параметры GPRS
      </h2>
    </div>
    <div className="gps-params-popup__wrap gps-params-popup__wrap--border">
      <h4 className="gps-params-popup__subtitle">
        Сервер АСКУЭ
      </h4>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>IP адрес сервера</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="domainIp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.domainIp}
            isInvalid={!!formik.errors.domainIp && !!formik.touched.domainIp}
          />
          {formik.touched.domainIp && formik.errors.domainIp && (
            <Form.Control.Feedback type="invalid">{formik.errors.domainIp}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        {/* <Form.Group className="concentrator-character__form-item">
                    <Form.Label>Порт подключения</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        name="fathersname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fathersname}
                      isInvalid={!!formik.errors.fathersname && !!formik.touched.fathersname}
                    />
                    {formik.touched.fathersname && formik.errors.fathersname && (
              <Form.Control.Feedback type="invalid">{formik.errors.fathersname}</Form.Control.Feedback>
            )}
                </Form.Group> */}

      </div>

    </div>
    <div className="gps-params-popup__wrap gps-params-popup__wrap--border">
      <h4 className="gps-params-popup__subtitle">
        Параметры PING
      </h4>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>IP адрес сервера</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="pingIp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pingIp}
            isInvalid={!!formik.errors.pingIp && !!formik.touched.pingIp}
          />
          {formik.touched.pingIp && formik.errors.pingIp && (
            <Form.Control.Feedback type="invalid">{formik.errors.pingIp}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        {/* <Form.Group className="concentrator-character__form-item">
                    <Form.Label>Порт подключения</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        name="fathersname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fathersname}
                      isInvalid={!!formik.errors.fathersname && !!formik.touched.fathersname}
                    />
                    {formik.touched.fathersname && formik.errors.fathersname && (
              <Form.Control.Feedback type="invalid">{formik.errors.fathersname}</Form.Control.Feedback>
            )}
                </Form.Group> */}

      </div>
    </div>

    <div className="gps-params-popup__wrap gps-params-popup__wrap--border">
      <h4 className="gps-params-popup__subtitle">
        Параметры подключения
      </h4>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Наименование APN</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="apnName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apnName}
            isInvalid={!!formik.errors.apnName && !!formik.touched.apnName}
          />
          {formik.touched.apnName && formik.errors.apnName && (
            <Form.Control.Feedback type="invalid">{formik.errors.apnName}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="apnUsername"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apnUsername}
            isInvalid={!!formik.errors.apnUsername && !!formik.touched.apnUsername}
          />
          {formik.touched.apnUsername && formik.errors.apnUsername && (
            <Form.Control.Feedback type="invalid">{formik.errors.apnUsername}</Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr12px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="apnPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apnPassword}
            isInvalid={!!formik.errors.apnPassword && !!formik.touched.apnPassword}
          />
          {formik.touched.apnPassword && formik.errors.apnPassword && (
            <Form.Control.Feedback type="invalid">{formik.errors.apnPassword}</Form.Control.Feedback>
          )}
        </Form.Group>

      </div>
    </div>


    <div className="gps-params-popup__wrap gps-params-popup__wrap--border">
      <h4 className="gps-params-popup__subtitle">
        Информация о подключении
      </h4>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Локальный сервер</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="localIp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.localIp}
            isInvalid={!!formik.errors.localIp && !!formik.touched.localIp}
          />
          {formik.touched.localIp && formik.errors.localIp && (
            <Form.Control.Feedback type="invalid">{formik.errors.localIp}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        {/* <Form.Group className="concentrator-character__form-item">
                    <Form.Label>Локальный порт</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        name="fathersname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fathersname}
                      isInvalid={!!formik.errors.fathersname && !!formik.touched.fathersname}
                    />
                    {formik.touched.fathersname && formik.errors.fathersname && (
              <Form.Control.Feedback type="invalid">{formik.errors.fathersname}</Form.Control.Feedback>
            )}
                </Form.Group> */}

      </div>
    </div>
  </div>
}