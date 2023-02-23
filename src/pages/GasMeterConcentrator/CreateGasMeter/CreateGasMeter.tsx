import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
// components
import { MainButton } from "../../../components/uiKit/Buttons/MainButton";
// redux
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { connectGasMeter } from "../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.thunk";

export const CreateGasMeter: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { barcode: "" },
    validationSchema: yup.object({
      barcode: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values: any) => {
      await dispatch(connectGasMeter(values));
      history.push("/admin/concentrators/gas-meter/concentrator-info?tabValue=by-udp");
    },
  });

  return (
    <div className="connection-gas-udp">
      <div className="connection-gas-udp__header d-flex justify-content-between">
        <h2 className="connection-gas-udp__title">Новый прибор учета</h2>
        <MainButton
          title="Отмена"
          style={{ width: 86, height: 40, fontSize: 14 }}
          isSecondary
          onClick={() => history.push("/admin/concentrators/gas-meter/concentrator-info?tabValue=by-udp")}
        />
      </div>

      <Form className="d-flex align-items-start connection-gas-udp__wrap" onSubmit={formik.handleSubmit}>
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Серийный номер</Form.Label>
          <Form.Control
            type="text"
            placeholder="XXXXXX"
            name="barcode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.barcode}
            isInvalid={!!formik.errors.barcode && !!formik.touched.barcode}
          />
          {formik.touched.barcode && formik.errors.barcode && (
            <Form.Control.Feedback type="invalid">{formik.errors.barcode}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        <div style={{ marginTop: "30px" }}>
          <MainButton
            title="Подключиться"
            fetching={formik.isSubmitting}
            style={{ width: 166, height: 48, fontSize: 16 }}
          />
        </div>
      </Form>
    </div>
  );
};
