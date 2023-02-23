import * as yup from "yup";


export const authSchema = yup.object({
  login: yup
    .string()
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле"),
});