import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { icons } from "../../../../utils/icons/icons";

type PropsType = {
  value: string;
  touched?: boolean | undefined;
  errorText?: string | undefined;
  handleChange: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
};

export const PasswordInput: FC<PropsType> = ({
  value,
  touched,
  errorText,
  handleChange,
  handleBlur,
  name = "password",
  placeholder = "Пароль",
}) => {
  const [passwordInputTypeValue, setPasswordInputTypeValue] = useState(
    "password"
  );
  return (
    <Form.Group className=" form-group--mb24">
      <div className="password-wrap">
        <Form.Control
          name={name}
          type={passwordInputTypeValue}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          isInvalid={!!errorText && !!touched}
        />

        <img
          className="password-wrap__img"
          alt="eye icon"
          src={
            passwordInputTypeValue === "password"
              ? icons.eyeIconClose
              : icons.eyeIcon
          }
          onClick={() => {
            passwordInputTypeValue === "password"
              ? setPasswordInputTypeValue("text")
              : setPasswordInputTypeValue("password");
          }}
        />
        {touched && errorText && (
          <Form.Control.Feedback type="invalid">
            {errorText}
          </Form.Control.Feedback>
        )}
      </div>
    </Form.Group>
  );
};
