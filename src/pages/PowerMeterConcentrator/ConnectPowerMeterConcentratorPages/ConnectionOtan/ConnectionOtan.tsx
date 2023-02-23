import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { Form, Spinner } from "react-bootstrap";
// components
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
// regex
import { regex } from "../../../../utils/regex/regex";
// redux
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { connectConcentratorOtan } from "../../../../store/slicesAndThunks/powerConcentrator/otan/otan.thunk";

export const ConnectionOtanPage: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { password: "", ip: "10.145.196.139", port: "8001", deviceId: "874684" },
    validationSchema: yup.object({
      ip: yup
        .string()
        .required("Обязательное поле")
        .matches(regex.ip, "Не валидный формат")
        .max(15, "Не более 15 символов"),
      password: yup.string().required("Обязательное поле"),
      port: yup.string().required("Обязательное поле").max(15, "Не более 15 символов"),
      deviceId: yup.string().required("Обязательное поле").max(15, "Не более 15 символов"),
    }),
    onSubmit: async (values: any) => {
      await dispatch(connectConcentratorOtan(values));
    },
  });

  return (
    <div className="connection-gprs">
      <div className="connection-gprs__header d-flex justify-content-between">
        <h2 className="connection-gprs__title">Новый прибор учета</h2>
        <MainButton
          title="Отмена"
          style={{ width: 86, height: 40, fontSize: 14 }}
          isSecondary
          onClick={() => history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-tcp")}
        />
      </div>

      <Form className="d-flex align-items-start connection-gprs__wrap" onSubmit={formik.handleSubmit}>
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>IP</Form.Label>
          <Form.Control
            type="text"
            placeholder="XXX.XXX.XXX.XXX"
            name="ip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ip}
            isInvalid={!!formik.errors.ip && !!formik.touched.ip}
          />
          {formik.touched.ip && formik.errors.ip && (
            <Form.Control.Feedback type="invalid">{formik.errors.ip}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Порт</Form.Label>
          <Form.Control
            type="text"
            placeholder="XXXXXX"
            name="port"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.port}
            isInvalid={!!formik.errors.port && !!formik.touched.port}
          />
          {formik.touched.port && formik.errors.port && (
            <Form.Control.Feedback type="invalid">{formik.errors.port}</Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr12px"></div>
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Сетевой адрес</Form.Label>
          <Form.Control
            type="text"
            placeholder="XXXXXX"
            name="deviceId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deviceId}
            isInvalid={!!formik.errors.deviceId && !!formik.touched.deviceId}
          />
          {formik.touched.deviceId && formik.errors.deviceId && (
            <Form.Control.Feedback type="invalid">{formik.errors.deviceId}</Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Пароль</Form.Label>
          <Form.Control
            type="text"
            placeholder="Пароль"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={!!formik.errors.password && !!formik.touched.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
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
