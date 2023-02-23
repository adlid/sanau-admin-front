import React, { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as queryString from "querystring";
//form
import { authSchema } from "./auth.validation";
//ts
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { GlobalAdminAuthType } from "../../../../ts/types/auth.types";
import { useHistory } from "react-router";
//components
import { SubmitButton } from "../../../../components/uiKit/Buttons/SubmitButton";
import { PasswordInput } from "../../../../components/uiKit/Inputs/PasswordInput/PasswordInput";
//redux
import { activateOperatorThunk } from "../../../../store/slicesAndThunks/users/operators/operators.thunks";

const initialValues: GlobalAdminAuthType = {
  login: "",
  password: "",
};

const ActivateOperatorPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { hash }: any = queryString.parse(history.location.search.substring(1));

  return (
    <div className="activate">
      <Container className="activate__container">
        <h2 className="activate__title">Активировать</h2>
        <Formik
          enableReinitialize
          validationSchema={authSchema}
          initialValues={initialValues}
          onSubmit={async (values: GlobalAdminAuthType) => {
            await dispatch(activateOperatorThunk({ ...values, hash }));
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => {
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="login"
                    placeholder="Логин"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                    isInvalid={!!errors.login && touched.login}
                  />

                  {touched.login && errors.login && (
                    <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <div className="mb20px"></div>
                <PasswordInput
                  placeholder="Новый пароль"
                  value={values.password}
                  touched={touched.password}
                  errorText={errors.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <SubmitButton disabled={isSubmitting} fetching={isSubmitting} title="Активировать" />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
};

export { ActivateOperatorPage };
