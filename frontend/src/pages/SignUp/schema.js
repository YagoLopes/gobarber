import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(10)
    .required("O nome precisa está completo."),
  email: Yup.string()
    .email("E-mail inválido.")
    .required("O e-mail é obrigatório."),
  password: Yup.string()
    .min(6, "No mínimo 6 caracteres")
    .required("A senha é obrigatória."),
  passwordConfirm: Yup.string()
    .required("Confirmar senha é obrigatória.")
    .when("password", (password, field) =>
      password
        ? field
            .required()
            .oneOf(
              [Yup.ref("password"), null],
              "Confirmar senha não é igual a Senha."
            )
        : field
    )
});

export default schema;
