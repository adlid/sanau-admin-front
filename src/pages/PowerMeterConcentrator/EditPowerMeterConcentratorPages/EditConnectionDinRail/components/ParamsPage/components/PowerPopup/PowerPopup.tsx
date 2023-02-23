import { FC } from "react"
import { Form, Modal } from "react-bootstrap";
import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton"

import { useTypedSelector } from '../../../../../../../../utils/hooks/reduxHooks';
import { useFormik } from "formik";
import * as yup from "yup";


type PropsType = {
  toggleThirdPopup: (bool: boolean) => void
}

export const PowerPopup: FC<PropsType> = ({
  toggleThirdPopup
}) => {

  const { attributes } = useTypedSelector(state => state.powerMeterGPRSMeter.GPRSResponseInitialValues)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amperageLimit: attributes.amperageLimit, //
      impulseNumber: attributes.impulseNumber, //
      payloadLimit: attributes.payloadLimit, //
      powerLimit: attributes.powerLimit, //
      voltageLimit: attributes.voltageLimit, //
    },
    validationSchema: yup.object({

    }),
    onSubmit: async (values: any) => {

    },
  });


  return <div className="power-popup">
    <svg onClick={() => toggleThirdPopup(false)} className="power-popup__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z" fill="#253D51" />
    </svg>

    <div className="power-popup__header">
      <h2 className="power-popup__title">
        Верхний предел мощности
      </h2>
    </div>

    <div className="power-popup__wrap d-flex">
      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Верхний предел напряжения</Form.Label>
        <Form.Control
          type="number"
          min={0}
          placeholder=""
          name="voltageLimit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.voltageLimit}
          isInvalid={
            !!formik.errors.voltageLimit &&
            !!formik.touched.voltageLimit
          }
        />
        {formik.touched.voltageLimit &&
          formik.errors.voltageLimit && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.voltageLimit}
            </Form.Control.Feedback>
          )}
      </Form.Group>

      <div className="mr12px"></div>

      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Верхний предел тока</Form.Label>
        <Form.Control
          type="number"
          min={0}
          placeholder=""
          name="amperageLimit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amperageLimit}
          isInvalid={
            !!formik.errors.amperageLimit &&
            !!formik.touched.amperageLimit
          }
        />
        {formik.touched.amperageLimit &&
          formik.errors.amperageLimit && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.amperageLimit}
            </Form.Control.Feedback>
          )}
      </Form.Group>
      <div className="mr12px"></div>
      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Верхний предел мощности</Form.Label>
        <Form.Control
          type="number"
          min={0}
          placeholder=""
          name="powerLimit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.powerLimit}
          isInvalid={
            !!formik.errors.powerLimit &&
            !!formik.touched.powerLimit
          }
        />
        {formik.touched.powerLimit &&
          formik.errors.powerLimit && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.powerLimit}
            </Form.Control.Feedback>
          )}
      </Form.Group>
    </div>
    <div className="power-popup__wrap power-popup__wrap--border  d-flex">
      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Включение полезной нагрузки (мин)</Form.Label>
        <Form.Control
          type="number"
          min={0}
          placeholder=""
          name="payloadLimit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.payloadLimit}
          isInvalid={
            !!formik.errors.payloadLimit &&
            !!formik.touched.payloadLimit
          }
        />
        {formik.touched.payloadLimit &&
          formik.errors.payloadLimit && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.payloadLimit}
            </Form.Control.Feedback>
          )}
      </Form.Group>

      <div className="mr12px"></div>

      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Количество импульсов в минуту</Form.Label>
        <Form.Control
          type="number"
          min={0}
          placeholder=""
          name="impulseNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.impulseNumber}
          isInvalid={
            !!formik.errors.impulseNumber &&
            !!formik.touched.impulseNumber
          }
        />
        {formik.touched.impulseNumber &&
          formik.errors.impulseNumber && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.impulseNumber}
            </Form.Control.Feedback>
          )}
      </Form.Group>
    </div>

    <div className="power-popup__footer d-flex justify-content-end">
      <MainButton
        onClick={() => toggleThirdPopup(false)}
        isSecondary title="Отмена" style={{ width: 86, height: 40, fontSize: 16 }} />
      <div className="mr8px">
      </div>
      <MainButton title="Сохранить" style={{ width: 107, height: 40, fontSize: 16 }} />
    </div>
  </div>
}