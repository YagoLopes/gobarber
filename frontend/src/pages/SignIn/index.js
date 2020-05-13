import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import schema from "./schema";

import { signInRequest } from "~/store/modules/auth/actions";

import logo from "~/assets/logo.svg";

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />

        <button type="submit">{loading ?  "Carregando..." : "Acessar"  }</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
