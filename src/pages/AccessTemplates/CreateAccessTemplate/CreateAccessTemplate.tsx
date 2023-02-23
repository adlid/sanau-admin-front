import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as queryString from "querystring";
import { Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { MainButton } from "../../../components/uiKit/Buttons/MainButton";
import { useAppDispatch, useTypedSelector } from "../../../utils/hooks/reduxHooks";
import { admissionTags, configurationTags, generalTags } from "../../../ts/types/templates.types";
import {
  createAccessTemplatesThunk,
  detailAccessTemplatesThunk,
  editAccessTemplatesThunk,
} from "../../../store/slicesAndThunks/users/operators/operators.thunks";

export const CreateAccessTemplate = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { templateId }: any = queryString.parse(history.location.search.substring(1));
  const { detailTemplate } = useTypedSelector((state) => state.operators);

  // SELECTED PRIVELEGES HANDLERS
  const [privileges, setPrivileges] = useState<any>([]);
  const onPrivilegesChange = (tag: any) => {
    if (!privileges.some((priv: any) => priv.name === tag.name)) setPrivileges([...privileges, tag]);
    else setPrivileges(privileges.filter((priv: any) => priv.name !== tag.name));
  };

  const [detailTemplateLoading, setDetailTemplateLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: detailTemplate?.name },
    validationSchema: yup.object({
      name: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values: any) => {
      if (privileges.length !== 0) {
        await dispatch(
          pathname.includes("/create")
            ? createAccessTemplatesThunk({ ...values, privileges })
            : editAccessTemplatesThunk({ ...values, id: detailTemplate?.id, privileges })
        );
      } else enqueueSnackbar("Выберите права оператора", { variant: "error" });
    },
  });

  const getDetailTemplate = async () => {
    setDetailTemplateLoading(true);
    await dispatch(detailAccessTemplatesThunk(templateId));
    setDetailTemplateLoading(false);
  };

  useEffect(() => {
    templateId && getDetailTemplate();
  }, [templateId]);

  useEffect(() => {
    if (detailTemplate?.privileges) setPrivileges(detailTemplate?.privileges);
  }, [detailTemplate]);

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="create-user"
      style={{ background: "#FFFFFF", position: "relative" }}
    >
      <div className="create-user__tab tabs-type1">
        <h1
          className="create-user__title"
          style={{ borderBottom: "1px solid #D7E2F2", display: "flex", alignItems: "center", gap: "8px" }}
        >
          {pathname.includes("/create") ? "Новый шаблон" : "Редактировать"}
          {detailTemplateLoading && <Spinner animation="border" size="sm" />}
        </h1>
        <div className="create-user__title d-flex">
          <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Название шаблона</Form.Label>
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
        </div>
        <div style={{ height: "8px", width: "100%", background: "#EBEDEF" }}></div>

        <div className="create-user__title">
          <h5 className="create-user__subtitle">Права</h5>
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

      <div className="create-user__btns d-flex" style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => history.push("/admin/users/access-templates?page=1")}
        />
      </div>
    </Form>
  );
};
