import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { updateMeterNameThunk } from "../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";

export const InfoPage: FC = () => {
  const { dinRailResponseInitialValues, selectedDinRailEditMeterId } = useTypedSelector((state) => state.powerMeterDinRailMeter);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: dinRailResponseInitialValues.type,
      version: dinRailResponseInitialValues.version,
      voltage: dinRailResponseInitialValues.voltage,
      voltagePhaseA: dinRailResponseInitialValues.voltagePhaseA,
      voltagePhaseB: dinRailResponseInitialValues.voltagePhaseB,
      voltagePhaseC: dinRailResponseInitialValues.voltagePhaseC,
      headMeterId: dinRailResponseInitialValues.headMeterId,

      filterMeterName: ""
    },
    validationSchema: yup.object({}),
    onSubmit: async (values: any) => {
      const body1 = {
        id: selectedDinRailEditMeterId ?? "",
        type: 'dinrail',
        meterName: values.filterMeterName
      }
      await dispatch(updateMeterNameThunk(body1))
    },
  });

  return (
    <div className="gprs2-info">
      <Form onSubmit={formik.handleSubmit} className="gprs2-info">
        <Form.Group className="operator-character__form-item">
          <Form.Label>Тип</Form.Label>
          <Form.Control type="text" name="type" value={formik.values.type} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Версия</Form.Label>
          <Form.Control type="text" name="version" value={formik.values.version} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Id головного счетчика</Form.Label>
          <Form.Control type="text" name="headMeterId" value={formik.values.headMeterId} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Общее напряжение</Form.Label>
          <Form.Control type="text" name="voltage" value={formik.values.voltage} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Напряжение фаза А</Form.Label>
          <Form.Control type="text" name="voltagePhaseA" value={formik.values.voltagePhaseA} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Напряжение фаза Б</Form.Label>
          <Form.Control type="text" name="voltagePhaseB" value={formik.values.voltagePhaseB} disabled />
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
          <Form.Label>Напряжение фаза С</Form.Label>
          <Form.Control type="text" name="voltagePhaseС" value={formik.values.voltagePhaseC} disabled />
        </Form.Group>

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
    </div>
  );
};
