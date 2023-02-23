import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

//form
import { authSchema } from "./auth.validation";

//ts
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { GlobalAdminAuthType } from "../../ts/types/auth.types";

//components
import { SubmitButton } from "../../components/uiKit/Buttons/SubmitButton";
import { PasswordInput } from "../../components/uiKit/Inputs/PasswordInput/PasswordInput";

//redux
import { authAdmin } from "../../store/slicesAndThunks/auth/auth.thunk";

const initialValues: GlobalAdminAuthType = {
  login: "",
  password: "",
};

const AuthPage: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="auth">
      <Container className="auth__container">
        <h2 className="auth__title">Войти в систему</h2>
        <Formik
          enableReinitialize
          validationSchema={authSchema}
          initialValues={initialValues}
          onSubmit={async (values: GlobalAdminAuthType) => {
            await dispatch(authAdmin(values));
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
          }) => {
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
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                    isInvalid={!!errors.login && touched.login}
                  />

                  {touched.login && errors.login && (
                    <Form.Control.Feedback type="invalid">
                      {errors.login}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <div className="mb20px">

                </div>
                <PasswordInput
                  value={values.password}
                  touched={touched.password}
                  errorText={errors.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <SubmitButton
                  disabled={isSubmitting}
                  fetching={isSubmitting}
                  title="Войти"
                />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
};

export { AuthPage };
