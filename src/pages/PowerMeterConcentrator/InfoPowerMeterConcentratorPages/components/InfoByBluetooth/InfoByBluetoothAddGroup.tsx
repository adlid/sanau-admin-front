import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import * as yup from "yup";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
// components
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { createFolderDinRail } from "../../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.thunk";
import { createFolderGPRS } from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import { createFolderOTAN } from "../../../../../store/slicesAndThunks/powerConcentrator/otan/otan.thunk";

interface IProps { }

export const InfoByBluetoothAddGroup: FC<IProps> = (props) => {
  const { } = props;
  const { search } = useLocation();
  const [meterType, setMeterType] = useState<'gprs' | 'dinrail' | 'otan' | ''>('')

  useEffect(() => {
    if (search.length) {
      if (search.includes('gprs')) {
        setMeterType('gprs')
      } else if (search.includes('otan')) {
        setMeterType('otan')
      } else if (search.includes('dinrail')) {
        setMeterType('dinrail')
      }
    }
  }, [search])

  //   hooks
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { folderLoading: gprsLoading } = useTypedSelector((state) => state.powerMeterGPRSMeter)
  const { folderLoading: dinRailLoading } = useTypedSelector((state) => state.powerMeterDinRailMeter)
  const { folderLoading: otanLoading } = useTypedSelector((state) => state.powerMeterOtanMeter)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      city: "",
      address: ""
    },

    validationSchema: yup.object({
      serialNumber: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values: any) => {
      //   dispatch();
    },
  });

  return (
    <div className="infoByBluetoothAddGroup">
      <h1 className="infoByBluetoothAddGroup_title">
        {pathname.includes("/create") ? "Новая группа" : "Редактировать"}
      </h1>
      <div className="infoByBluetoothAddGroup_body">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Наименование</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isInvalid={!!formik.errors.name && !!formik.touched.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder=""
            rows={3}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            isInvalid={!!formik.errors.description && !!formik.touched.description}
          />

          {formik.touched.description && formik.errors.description && (
            <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Город</Form.Label>
          <Form.Control
            name="city"
            placeholder=""
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            isInvalid={!!formik.errors.city && !!formik.touched.city}
          />

          {formik.touched.city && formik.errors.city && (
            <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            as="textarea"
            placeholder=""
            name="address"
            rows={3}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            isInvalid={!!formik.errors.address && !!formik.touched.address}
          />

          {formik.touched.address && formik.errors.address && (
            <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
          )}
        </Form.Group>
      </div>

      <div className="infoByBluetoothAddGroup_footer">
        <div style={{ marginRight: "16px" }}>
          <MainButton
            title={"Сохранить"}
            style={{ width: 126, fontSize: 14, height: 40 }}
            isDisabled={meterType === 'gprs' ? gprsLoading : meterType === 'otan' ? otanLoading : meterType === 'dinrail' ? dinRailLoading : false}
            onClick={(e) => {
              e.preventDefault();
              // CHECK HERE WHICH TYPE OF METER
              if (meterType === 'gprs') {
                dispatch(createFolderGPRS({ name: formik.values.name }))
              } else if (meterType === 'otan') {
                dispatch(createFolderOTAN({ name: formik.values.name }))
              } else if (meterType === 'dinrail') {
                dispatch(createFolderDinRail({ name: formik.values.name }))
              }
            }}
          />
        </div>

        <MainButton
          isSecondary
          title="Отмена"
          style={{ width: 86, fontSize: 14, height: 40 }}
          onClick={(e) => {
            e.preventDefault();
            pathname.includes("/bluetooth")
              ? history.push(
                "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-bluetooth&bluetoothPage=1"
              )
              : history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-tcp&page=1");
          }}
        />
      </div>
    </div>
  );
};
