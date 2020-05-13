import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido.")
    .required("O e-mail é obrigatório."),
  password: Yup.string().required("A senha é obrigatória.")
});

export default schema;
