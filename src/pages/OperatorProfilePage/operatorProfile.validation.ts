import * as yup from "yup";


export const passwordSchema = yup.object({
  login: yup
    .string()
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле"),
});