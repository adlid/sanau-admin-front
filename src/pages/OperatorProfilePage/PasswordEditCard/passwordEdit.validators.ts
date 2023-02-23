import * as yup from "yup";
import { regex } from "../../../utils/regex/regex";

export let passwordValidators = {
  oneDigit: false,
  upperCase: false,
  minLength: false,
  latinLetters: false,
};

let initialPasswordValidators = {
  oneDigit: false,
  upperCase: false,
  minLength: false,
  latinLetters: false,
};

export const resetPasswordValidators = () => {
  passwordValidators = { ...initialPasswordValidators };
};

export const changePasswordScheme = yup.object({
  newPassword: yup
    .string()
    .matches(new RegExp("//"), (e) => {
      passwordValidators.minLength = e.originalValue.length > 7 ? true : false;
    }) //need for validate chips
    .min(8, "Не валидный пароль")
    .matches(new RegExp("//"), (e) => {
      passwordValidators.oneDigit = regex.oneDigit.test(e.originalValue);
    }) //need for validate chips
    .matches(regex.oneDigit, "Не валидный пароль")
    .matches(new RegExp("//"), (e) => {
      passwordValidators.upperCase = regex.uppercaseRegex.test(e.originalValue);
    }) //need for validate chips
    .matches(regex.uppercaseRegex, "Не валидный пароль")
    .matches(new RegExp("//"), (e) => {
      passwordValidators.latinLetters = regex.latinLetters.test(e.originalValue);
    }) //need for validate chips
    .matches(regex.latinLetters, "Не валидный пароль")
    .required("Обязательное поле"),
});
