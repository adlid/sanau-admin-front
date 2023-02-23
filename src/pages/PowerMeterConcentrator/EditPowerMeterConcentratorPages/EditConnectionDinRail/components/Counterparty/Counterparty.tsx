import { FC } from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
import { useFormik } from "formik";
import {
  changeDinRailUserInfo,
  dinRailPersonalAccountSearch,
} from "../../../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.thunk";
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

type PropsType = {};

export const Counterparty: FC<PropsType> = () => {
  const dispatch = useAppDispatch();

  const { dinRailUserInfoValues, dinRailResponseInitialValues } = useTypedSelector(
    (state) => state.powerMeterDinRailMeter
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personalAccountNumber: dinRailUserInfoValues?.personalAccountNumber || "",
      roleName: dinRailUserInfoValues?.roleName || "",
      organizationName: dinRailUserInfoValues?.organizationName || "" ,
      lastname: dinRailUserInfoValues?.lastname || "" ,
      firstname: dinRailUserInfoValues?.firstname || "" ,
      fathersname: dinRailUserInfoValues?.fathersname || "" ,
      position: dinRailUserInfoValues?.position || "" ,
      phoneNumber: dinRailUserInfoValues?.phoneNumber || "" ,
      email: dinRailUserInfoValues?.email || "" ,
      city: dinRailUserInfoValues?.city || "" ,
      district: dinRailUserInfoValues?.district || "" ,
      street: dinRailUserInfoValues?.street || "" ,
      house: dinRailUserInfoValues?.house || "" ,
      flat: dinRailUserInfoValues?.flat || "" ,
    },
    onSubmit: async (values) => {
      const body = {
        ...values,
        ip: dinRailResponseInitialValues.ip,
        port: dinRailResponseInitialValues.port,
        deviceId: dinRailResponseInitialValues.deviceId,
      };

      await dispatch(changeDinRailUserInfo(body));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="edit-gas-udp-concentrator-counterparty">
      <div className="edit-gas-udp-concentrator-counterparty__header d-flex">
        <Form.Group className="concentrator-character__form-item ">
          <Form.Label>Номер лицевого счета</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="personalAccountNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.personalAccountNumber}
            isInvalid={!!formik.errors.personalAccountNumber && !!formik.touched.personalAccountNumber}
          />
          {formik.touched.personalAccountNumber && formik.errors.personalAccountNumber && (
            <Form.Control.Feedback type="invalid">{formik.errors.personalAccountNumber}</Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>
        <div className="edit-gas-udp-concentrator-counterparty__btn" style={{ marginTop: "31px" }}>
          <MainButton
            isSecondary
            style={{ width: 108, height: 48, fontSize: 16 }}
            title="Проверить"
            onClick={(e) => {
              e.preventDefault();
              dispatch(dinRailPersonalAccountSearch(formik.values.personalAccountNumber));
            }}
          />
        </div>
      </div>

      <div className="edit-gas-udp-concentrator-counterparty__border">
        <div className="edit-gas-udp-concentrator-counterparty__role d-flex">
          <Form.Group>
            <Form.Check
              checked={formik.values.roleName === "ROLE_LEGAL" ? true : false}
              type="radio"
              label="Юридическое лицо"
              name="roleName"
              value={"ROLE_LEGAL"}
              id="formHorizontalRadios1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.roleName && !!formik.touched.roleName}
            />
          </Form.Group>
          <div className="mr33px"></div>
          <Form.Group>
            <Form.Check
              checked={formik.values.roleName === "ROLE_USER" ? true : false}
              type="radio"
              label="Физическое лицо"
              name="roleName"
              value={"ROLE_USER"}
              id="formHorizontalRadios1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.roleName && !!formik.touched.roleName}
            />
          </Form.Group>
        </div>

        {formik.values.roleName === "ROLE_LEGAL" && (
          <Form.Group className="concentrator-character__form-item edit-gas-udp-concentrator-counterparty__input">
            <Form.Label>Наименование организации</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="organizationName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organizationName}
              isInvalid={!!formik.errors.organizationName && !!formik.touched.organizationName}
            />
            {formik.touched.organizationName && formik.errors.organizationName && (
              <Form.Control.Feedback type="invalid">{formik.errors.organizationName}</Form.Control.Feedback>
            )}
          </Form.Group>
        )}
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              isInvalid={!!formik.errors.lastname && !!formik.touched.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <Form.Control.Feedback type="invalid">{formik.errors.lastname}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              isInvalid={!!formik.errors.firstname && !!formik.touched.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Отчество</Form.Label>
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
          </Form.Group>
        </div>
        {formik.values.roleName === "ROLE_LEGAL" && (
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Должность</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="position"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position}
              isInvalid={!!formik.errors.position && !!formik.touched.position}
            />
            {formik.touched.position && formik.errors.position && (
              <Form.Control.Feedback type="invalid">{formik.errors.position}</Form.Control.Feedback>
            )}
          </Form.Group>
        )}
      </div>

      <div className="edit-gas-udp-concentrator-counterparty__border">
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Номер телефона</Form.Label>
            <InputMask
              mask="+7(999)999-99-99"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            >
              {() => (
                <Form.Control
                  name="phoneNumber"
                  type="text"
                  placeholder="+7(XXX)XXX-XX-XX"
                  isInvalid={!!formik.errors.phoneNumber && !!formik.touched.phoneNumber}
                />
              )}
            </InputMask>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Form.Control.Feedback type="invalid">{formik.errors.phoneNumber}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={!!formik.errors.email && !!formik.touched.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>

      <div className="edit-gas-udp-concentrator-counterparty__border">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Город</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            isInvalid={!!formik.errors.city && !!formik.touched.city}
          />
          {formik.touched.city && formik.errors.city && (
            <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Район</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="district"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.district}
              isInvalid={!!formik.errors.district && !!formik.touched.district}
            />
            {formik.touched.district && formik.errors.district && (
              <Form.Control.Feedback type="invalid">{formik.errors.district}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Улица</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
              isInvalid={!!formik.errors.street && !!formik.touched.street}
            />
            {formik.touched.street && formik.errors.street && (
              <Form.Control.Feedback type="invalid">{formik.errors.street}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item edit-gas-udp-concentrator-counterparty__short-input">
            <Form.Label>Дом</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="house"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.house}
              isInvalid={!!formik.errors.house && !!formik.touched.house}
            />
            {formik.touched.house && formik.errors.house && (
              <Form.Control.Feedback type="invalid">{formik.errors.house}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item edit-gas-udp-concentrator-counterparty__short-input">
            <Form.Label>Квартира</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="flat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.flat}
              isInvalid={!!formik.errors.flat && !!formik.touched.flat}
            />
            {formik.touched.flat && formik.errors.flat && (
              <Form.Control.Feedback type="invalid">{formik.errors.flat}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>
      <div className="gprs2-info__footer">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
      </div>
    </Form>
  );
};
