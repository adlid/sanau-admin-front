import { Formik } from "formik";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
// components
import { MainButton } from "../../../components/uiKit/Buttons/MainButton";
import { PasswordInput } from "../../../components/uiKit/Inputs/PasswordInput/PasswordInput";
import { NewPasswordInput } from "../../../components/uiKit/Inputs/NewPasswordInput/index";
// validators
import { changePasswordScheme, passwordValidators, resetPasswordValidators } from "./passwordEdit.validators";
//redux ts
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { ChangePasswordType } from "../../../ts/types/profile.types";
import { operatorChangePasswordThunk } from "../../../store/slicesAndThunks/users/operators/operators.thunks";

type PropsType = {
  lastPasswordChange: string;
  setPasswordFormOpen: any;
};

export const PasswordEditCard: FC<PropsType> = ({ lastPasswordChange, setPasswordFormOpen }) => {
  // hooks
  const dispatch = useAppDispatch();

  const initialValues: ChangePasswordType = {
    currentPassword: "",
    newPassword: "",
  };

  return (
    <div className="profile-static-card">
      <Formik
        enableReinitialize
        validationSchema={changePasswordScheme}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await dispatch(
            operatorChangePasswordThunk({
              oldPassword: values.currentPassword,
              newPassword: values.newPassword,
            })
          );
          setPasswordFormOpen(false);
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
              <div className="profile-static-card__body">
                <div className="profile-static-card__wrap">
                  <span className="profile-static-card__title">Изменить пароль</span>
                  <span className="profile-static-card__descr">Последнее изменение: {lastPasswordChange}</span>
                </div>

                <div className="profile-static-card__form">
                  <div className="profile-static-card__password1">
                    <PasswordInput
                      name="currentPassword"
                      value={values.currentPassword}
                      handleChange={handleChange}
                      placeholder="Текущий пароль"
                    />
                  </div>
                  <div className="profile-static-card__password2">
                    <NewPasswordInput
                      value={values.newPassword}
                      touched={touched.newPassword}
                      errorText={errors.newPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      passwordValidators={passwordValidators}
                      resetPasswordValidators={resetPasswordValidators}
                      name="newPassword"
                    />
                  </div>
                </div>
              </div>

              <div className="profile-static-card__footer d-flex">
                <MainButton
                  fetching={isSubmitting}
                  title="Изменить пароль"
                  style={{ width: 170, fontSize: 14, height: 40 }}
                />
                <div className="mr16px"></div>
                <MainButton
                  isSecondary
                  title="Отмена"
                  style={{ width: 86, fontSize: 14, height: 40 }}
                  onClick={(e) => setPasswordFormOpen(false)}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
