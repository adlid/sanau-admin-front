import { FC } from "react";
import { Form } from "react-bootstrap";

type PropsType = {
  formik: any;
  isDeviceIdDisabled?: boolean
};


export const ConcentratorCharacter: FC<PropsType> = ({ formik,isDeviceIdDisabled=true }) => {
  return (
    <div className="concentrator-character">
      <div className="concentrator-character__wrap">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Сетевой адрес УСПД</Form.Label>
          <Form.Control
            disabled={isDeviceIdDisabled}
            type="text"
            placeholder=""
            value={formik.values.deviceId}
          />
        </Form.Group>
      </div>
      <div className="concentrator-character__wrap">
        <h4 className="concentrator-character__title">Сервер АСКУЭ</h4>
        <div className=" d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>IP</Form.Label>
            <Form.Control
              type="text"
              name="domainIp"
              placeholder="XXX.XXX.XXX.XXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domainIp}
              isInvalid={!!formik.errors.domainIp && !!formik.touched.domainIp}
            />
            {formik.touched.domainIp && formik.errors.domainIp && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.domainIp}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Порт</Form.Label>
            <Form.Control
              type="text"
              name="domainPort"
              placeholder="ХХХХ"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domainPort}
              isInvalid={
                !!formik.errors.domainPort && !!formik.touched.domainPort
              }
            />
            {formik.touched.domainPort && formik.errors.domainPort && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.domainPort}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>

      <div className="concentrator-character__wrap ">
        <h4 className="concentrator-character__title">APN</h4>
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Наименование APN</Form.Label>
            <Form.Control
              type="text"
              name="apnName"
              placeholder="Название"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apnName}
              isInvalid={!!formik.errors.apnName && !!formik.touched.apnName}
            />
            {formik.touched.apnName && formik.errors.apnName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.apnName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              name="apnUsername"
              placeholder="Имя"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apnUsername}
              isInvalid={
                !!formik.errors.apnUsername && !!formik.touched.apnUsername
              }
            />
            {formik.touched.apnUsername && formik.errors.apnUsername && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.apnUsername}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="text"
              name="apnPassword"
              placeholder="Пароль"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apnPassword}
              isInvalid={
                !!formik.errors.apnPassword && !!formik.touched.apnPassword
              }
            />
            {formik.touched.apnPassword && formik.errors.apnPassword && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.apnPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>

      <div className="concentrator-character__wrap d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Наименование УСПД</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Наименование"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isInvalid={!!formik.errors.name && !!formik.touched.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Регион</Form.Label>
          <Form.Control
            type="text"
            name="region"
            placeholder="Регион"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.region}
            isInvalid={!!formik.errors.region && !!formik.touched.region}
          />
          {formik.touched.region && formik.errors.region && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.region}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Город</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Город"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            isInvalid={!!formik.errors.city && !!formik.touched.city}
          />
          {formik.touched.city && formik.errors.city && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.city}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="mr16px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Адрес"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            isInvalid={!!formik.errors.address && !!formik.touched.address}
          />
          {formik.touched.address && formik.errors.address && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </div>
    </div>
  );
};
