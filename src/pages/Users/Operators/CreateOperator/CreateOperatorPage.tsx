import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import * as queryString from "querystring";

import { useHistory, useLocation } from "react-router-dom";
import { regex } from "../../../../utils/regex/regex";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
import { MenuItem, Select } from "@material-ui/core";
import {
  createOperatorThunk,
  detailOperatorThunk,
  editOperatorThunk,
  templatesListThunk,
} from "../../../../store/slicesAndThunks/users/operators/operators.thunks";
import { ICreateOperatorProps } from "../../../../ts/interfaces/users.interface";
import { useSnackbar } from "notistack";
import InputMask from "react-input-mask";
import { admissionTags, configurationTags, generalTags } from "../../../../ts/types/templates.types";
import { resetOperatorsState } from "../../../../store/slicesAndThunks/users/operators/operators.slices";

export const CreateOperatorPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { templatesList, detailOperator } = useTypedSelector((state) => state.operators);
  const { operatorId }: any = queryString.parse(history.location.search.substring(1));

  const [privileges, setPrivileges] = useState<any>([]); // selected privileges
  const onPrivilegesChange = (tag: any) => {
    if (!privileges.some((priv: any) => priv.name === tag.name)) setPrivileges([...privileges, tag]);
    else setPrivileges(privileges.filter((priv: any) => priv.name !== tag.name));
  };

  const [rightsValue, setRightsValue] = useState("self"); // selected template handlers
  const handleChangeRightsValue = (event: any) => setRightsValue(event.target.value);

  const [templatesLoading, setTemplatesLoading] = useState<boolean>(false);
  const [detailOperatorLoading, setDetailOperatorLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: detailOperator?.firstname || "",
      lastname: detailOperator?.lastname || "",
      fathersname: detailOperator?.fathersname || "",
      email: detailOperator?.email || "",
      login: detailOperator?.login || "",
      phoneNumber: detailOperator?.phoneNumber || "",
      position: detailOperator?.position || "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Обязательное поле"),
      fathersname: yup.string().required("Обязательное поле"),
      position: yup.string().required("Обязательное поле"),
      login: yup.string().required("Обязательное поле"),
      lastname: yup.string().required("Обязательное поле"),
      phoneNumber: yup.string().matches(regex.phoneMask, "Не валидный формат телефона").required("Обязательное поле"),
      email: yup.string().matches(regex.email, "Не валидный email ").required("Обязательное поле"),
    }),
    onSubmit: async (values: ICreateOperatorProps) => {
      if (privileges.length !== 0) {
        await dispatch(
          pathname.includes("/create")
            ? createOperatorThunk({ ...values, privileges })
            : editOperatorThunk({ ...values, id: detailOperator?.id || "", privileges })
        );
      } else enqueueSnackbar("Выберите права оператора", { variant: "error" });
    },
  });

  const getTemplates = async () => {
    setTemplatesLoading(true);
    await dispatch(templatesListThunk());
    setTemplatesLoading(false);
  };

  const getDetailOperator = async () => {
    setDetailOperatorLoading(true);
    await dispatch(detailOperatorThunk(operatorId));
    setDetailOperatorLoading(false);
  };

  useEffect(() => {
    getTemplates();
    operatorId && getDetailOperator();

    return () => {
      dispatch(resetOperatorsState());
    };
  }, []);

  const setOperatorExistPriv = () => {
    if (detailOperator?.privileges) setPrivileges(detailOperator?.privileges);
  };

  useEffect(() => {
    setOperatorExistPriv();
  }, [detailOperator]);

  const selectedTemplateItem = templatesList.filter((item) => rightsValue === item.name);

  useEffect(() => {
    if (selectedTemplateItem.length)
      setPrivileges(selectedTemplateItem[0].privileges.map((item) => ({ name: item.name })));
    else if (rightsValue === "self") {
      detailOperator && setOperatorExistPriv();
      !detailOperator && setPrivileges([]);
    } else setPrivileges([]);
  }, [rightsValue]);

  return (
    <Form onSubmit={formik.handleSubmit} className="create-user">
      <div className="create-user__tab tabs-type1">
        <h1
          className="create-user__title"
          style={{ borderBottom: "1px solid #D7E2F2", display: "flex", alignItems: "center", gap: "8px" }}
        >
          {pathname.includes("/create") ? "Новый оператор" : "Редактировать"}
          {detailOperatorLoading && <Spinner animation="border" size="sm" />}
        </h1>
        <div className="create-user__title d-flex">
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
          <div className="mr16px"></div>
          <Form.Group className="operator-character__form-item">
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
        </div>

        <div className="create-user__title" style={{ marginTop: "8px" }}>
          <h5 className="create-user__subtitle">Контакты</h5>
          <div className="d-flex">
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
            <div className="mr16px"></div>
            <Form.Group className="operator-character__form-item">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Логин"
                name="login"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.login}
                isInvalid={!!formik.errors.login && !!formik.touched.login}
              />
              {formik.touched.login && formik.errors.login && (
                <Form.Control.Feedback type="invalid">{formik.errors.login}</Form.Control.Feedback>
              )}
            </Form.Group>
          </div>
        </div>

        <div className="create-user__title" style={{ marginTop: "8px" }}>
          <h5 className="create-user__subtitle">Права</h5>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Select
              className="create-user__select"
              value={rightsValue}
              onChange={handleChangeRightsValue}
              MenuProps={{
                disableScrollLock: false,
                anchorOrigin: {
                  vertical: 20,
                  horizontal: -13,
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value={"self"}>Своя настройка</MenuItem>
              {templatesList.map((item) => {
                return (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            {templatesLoading && <Spinner animation="border" />}
          </div>

          <div className="d-flex" style={{ marginTop: "22px" }}>
            <div className="bluetooth-connection-description__wrap">
              <h2 className="create-user__checkbox_title">Основные</h2>
              <Form.Group>
                {generalTags.map((tag, index) => {
                  return (
                    <Form.Check
                      key={index}
                      className="create-user__checkbox"
                      type="checkbox"
                      value={tag.name}
                      checked={privileges.some((priv: any) => priv.name === tag.name)}
                      label={tag.name}
                      onChange={() => onPrivilegesChange(tag)}
                    />
                  );
                })}
              </Form.Group>
            </div>

            <div className="bluetooth-connection-description__wrap">
              <h2 className="create-user__checkbox_title">Конфигурация</h2>
              <Form.Group>
                {configurationTags.map((tag, index) => {
                  return (
                    <Form.Check
                      key={index}
                      className="create-user__checkbox"
                      type="checkbox"
                      value={tag.name}
                      checked={privileges.some((priv: any) => priv.name === tag.name)}
                      label={tag.name}
                      onChange={() => onPrivilegesChange(tag)}
                    />
                  );
                })}
              </Form.Group>
            </div>

            <div className="bluetooth-connection-description__wrap">
              <h2 className="create-user__checkbox_title">Администрирование</h2>
              <Form.Group>
                {admissionTags.map((tag, index) => {
                  return (
                    <Form.Check
                      key={index}
                      className="create-user__checkbox"
                      type="checkbox"
                      value={tag.name}
                      checked={privileges.some((priv: any) => priv.name === tag.name)}
                      label={tag.name}
                      onChange={() => onPrivilegesChange(tag)}
                    />
                  );
                })}
              </Form.Group>
            </div>
          </div>
        </div>
      </div>

      <div className="create-user__btns d-flex">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push("/admin/users/operators?page=1");
          }}
        />
      </div>
    </Form>
  );
};
