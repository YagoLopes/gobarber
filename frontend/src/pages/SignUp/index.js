import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import { signUpRequest } from "~/store/modules/auth/actions";
import logo from "~/assets/logo.svg";
import schema from "./schema";

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirmar senha"
        />

        <button type="submit">{loading ? "Salvando..." : "Cria conta"}</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
