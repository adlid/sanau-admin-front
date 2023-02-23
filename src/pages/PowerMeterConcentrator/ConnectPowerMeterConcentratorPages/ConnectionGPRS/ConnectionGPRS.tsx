import { FC, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { Form, Spinner } from "react-bootstrap";
// components
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
// regex
import { regex } from "../../../../utils/regex/regex";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { connectConcentratorGPRS, getFoldersGPRS } from "../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from "@material-ui/core";
import { resetFolderListGPRS } from "../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.slice";

export const ConnectionGPRSPage: FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ip: "10.145.196.139", port: "8001", deviceId: "874684", folderId: "" },
    validationSchema: yup.object({
      ip: yup
        .string()
        .required("Обязательное поле")
        .matches(regex.ip, "Не валидный формат")
        .max(15, "Не более 15 символов"),
      port: yup.string().required("Обязательное поле").max(15, "Не более 15 символов"),
      deviceId: yup.string().required("Обязательное поле").max(15, "Не более 15 символов"),
      folderId: yup.string()
    }),
    onSubmit: async (values: any) => {
      await dispatch(connectConcentratorGPRS(values));
    },
  });

  const { foldersList } = useTypedSelector((state) => state.powerMeterGPRSMeter);

  useEffect(() => {
    dispatch(getFoldersGPRS({ text: "" }))

    return () => {
      dispatch(resetFolderListGPRS())
    }
  }, [])

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

      <Form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'block', padding: '12px' }}>
          <div style={{ display: 'flex', marginBottom: '12px' }}>
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
              <div className="mr12px"></div>
            </Form.Group>
            <div className="mr12px"></div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div className="indication-filter__title">Группа</div>

            <Select
              className="indication-filter__select"
              name="folderId"
              value={formik.values.folderId}
              onChange={formik.handleChange}
              style={{ width: '300px' }}
            >
              <MenuItem value={""}>Не выбрано</MenuItem>
              {foldersList.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>

          <div>
            <MainButton
              title="Подключиться"
              fetching={formik.isSubmitting}
              style={{ width: 166, height: 48, fontSize: 16 }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};
