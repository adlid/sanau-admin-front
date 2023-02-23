import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import InputMask from "react-input-mask";
import * as queryString from "querystring";
import { Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { regex } from "../../../../utils/regex/regex";
import { useHistory, useLocation } from "react-router-dom";
// components
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
// ts
import { ICreateClientProps } from "../../../../ts/interfaces/users.interface";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import {
  createClientFLThunk,
  detailClientThunk,
  editClientFLThunk,
} from "../../../../store/slicesAndThunks/users/clients/clients.thunks";
import { resetClientsState } from "../../../../store/slicesAndThunks/users/clients/clients.slices";

export const CreateFLClient = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { detailClient } = useTypedSelector((state) => state.clients);
  const { clientId }: any = queryString.parse(history.location.search.substring(1));

  const [detailOperatorLoading, setDetailOperatorLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: detailClient?.firstname || "",
      lastname: detailClient?.lastname || "",
      fathersname: detailClient?.fathersname || "",
      email: detailClient?.email || "",
      phoneNumber: detailClient?.phoneNumber || "",
      personalAccountNumber: detailClient?.personalAccountNumber || "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Обязательное поле"),
      fathersname: yup.string().required("Обязательное поле"),
      lastname: yup.string().required("Обязательное поле"),
      personalAccountNumber: yup.string().required("Обязательное поле"),
      phoneNumber: yup.string().matches(regex.phoneMask, "Не валидный формат телефона").required("Обязательное поле"),
      email: yup.string().matches(regex.email, "Не валидный email ").required("Обязательное поле"),
    }),
    onSubmit: async (values: ICreateClientProps) => {
      await dispatch(
        pathname.includes("/create")
          ? createClientFLThunk({ ...values })
          : editClientFLThunk({ ...values, id: detailClient?.id || "" })
      );
    },
  });

  const getDetailClient = async () => {
    setDetailOperatorLoading(true);
    await dispatch(detailClientThunk(clientId));
    setDetailOperatorLoading(false);
  };

  useEffect(() => {
    clientId && getDetailClient();

    return () => {
      dispatch(resetClientsState());
    };
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="create-client">
      <div className="create-client__tab tabs-type1">
        <h1
          className="create-client__title"
          style={{ borderBottom: "1px solid #D7E2F2", display: "flex", alignItems: "center", gap: "8px" }}
        >
          {pathname.includes("/create") ? "Новое физическое лицо" : "Редактировать физическое лицо"}
          {detailOperatorLoading && <Spinner animation="border" size="sm" />}
        </h1>
        <div className="create-client__title d-flex">
          <Form.Group className="operator-character__form-item">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Иванов"
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
          <Form.Group className="operator-character__form-item">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Иван"
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
          <Form.Group className="operator-character__form-item">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              placeholder="Иванович"
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

        <div className="create-client__title d-flex" style={{ marginTop: "8px" }}>
          <Form.Group className="client-character__form-item">
            <Form.Label>Номер лицевого счета</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234567"
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
        </div>

        <div className="create-client__title d-flex" style={{ marginTop: "8px", height: "100%" }}>
          <Form.Group className="operator-character__form-item">
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
          <Form.Group className="operator-character__form-item">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="text"
              placeholder="exemple@gmail.com"
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

      <div className="create-client__btns d-flex">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push("/admin/users/clients?page=1");
          }}
        />
      </div>
    </Form>
  );
};
