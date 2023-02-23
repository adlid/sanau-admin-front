import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { icons } from "../../../../utils/icons/icons";

import { PasswordValidatorsType } from "../../../../ts/types/registration.types";

type PropsType = {
  labelTitle?: string;
  value: string;
  touched: boolean | undefined;
  errorText: string | undefined;
  passwordValidators: PasswordValidatorsType;
  handleChange: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  resetPasswordValidators: () => void;
  name?: string;
};

export const NewPasswordInput: FC<PropsType> = ({
  labelTitle,
  value,
  touched,
  errorText,
  passwordValidators,
  handleChange,
  handleBlur,
  resetPasswordValidators,
  name = "password",
}) => {
  const [showPasswordValidators, setShowPasswordValidators] = useState(false);
  const [passwordInputTypeValue, setPasswordInputTypeValue] = useState("password");

  return (
    <Form.Group className=" form-group--mb24">
      {labelTitle && <Form.Label>{labelTitle}</Form.Label>}
      <div className="password-wrap">
        <Form.Control
          className=""
          name={name}
          type={passwordInputTypeValue}
          placeholder="Новый пароль"
          onClick={(event: React.MouseEvent) => {
            const element = event.currentTarget as HTMLInputElement;
            const value = element.value;

            if (value.length === 0) {
              resetPasswordValidators();
              setShowPasswordValidators(true);
            } else {
              setShowPasswordValidators(true);
            }
          }}
          onChange={handleChange}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            handleBlur(event);

            if (event.target.value.length === 0) {
              resetPasswordValidators();
            }
          }}
          value={value}
          isInvalid={!!errorText && !!touched}
        />

        <img
          className="password-wrap__img"
          alt="eye icon"
          src={passwordInputTypeValue === "password" ? icons.eyeIconClose : icons.eyeIcon}
          onClick={() => {
            passwordInputTypeValue === "password"
              ? setPasswordInputTypeValue("text")
              : setPasswordInputTypeValue("password");
          }}
        />

        {showPasswordValidators && (
          <div className="d-flex justify-content-between flex-wrap">
            <div className={passwordValidators.minLength ? "validator-item validator-item--success" : "validator-item"}>
              <img src={passwordValidators.minLength ? icons.checkmark : icons.dismiss} alt="check icon" />
              <span>8 символов</span>
            </div>
            <div className={passwordValidators.upperCase ? "validator-item validator-item--success" : "validator-item"}>
              <img src={passwordValidators.upperCase ? icons.checkmark : icons.dismiss} alt="check icon" />
              <span>1 заглавная буква</span>
            </div>
            <div className={passwordValidators.oneDigit ? "validator-item validator-item--success" : "validator-item"}>
              <img src={passwordValidators.oneDigit ? icons.checkmark : icons.dismiss} alt="check icon" />
              <span>1 цифра</span>
            </div>

            <div
              className={passwordValidators.latinLetters ? "validator-item validator-item--success" : "validator-item"}
            >
              <img src={passwordValidators.latinLetters ? icons.checkmark : icons.dismiss} alt="check icon" />
              <span>латинские буквы</span>
            </div>
          </div>
        )}

        {touched && errorText && <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>}
      </div>
    </Form.Group>
  );
};
