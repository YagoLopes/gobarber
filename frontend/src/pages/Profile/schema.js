import * as Yup from "yup";
const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string()
    .email()
    .required("E-mail obrigatório"),
  oldPassword: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string()
});

export default schema;
